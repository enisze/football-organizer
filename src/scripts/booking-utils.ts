import { sendEmail } from '@/inngest/createSendEmail'
import { addWeeks, format, getWeek, setDay } from 'date-fns'
import { de } from 'date-fns/locale'
import type { ElementHandle, Page } from 'puppeteer'

export const COLORS = {
	red: 'rgb(175, 18, 29)',
	green: 'rgb(131, 176, 34)',
} as const

export const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const

export type Day = (typeof DAYS)[number]

/**
 * Define time ranges for different day types
 * Monday to Friday: only check times after 17:00
 * Saturday and Sunday: check each hour
 */
export const getTimeRangeForDay = (day: Day): string[] => {
	const weekdays: Day[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
	const weekends: Day[] = ['Sa', 'So']

	if (weekdays.includes(day)) {
		// Monday to Friday: only check times after 17:00
		return ['17:00h', '18:00h', '19:00h', '20:00h', '21:00h', '22:00h']
	}

	if (weekends.includes(day)) {
		// Saturday and Sunday: check each hour
		return [
			'8:00h',
			'9:00h',
			'10:00h',
			'11:00h',
			'12:00h',
			'13:00h',
			'14:00h',
			'15:00h',
			'16:00h',
			'17:00h',
			'18:00h',
			'19:00h',
			'20:00h',
			'21:00h',
			'22:00h',
		]
	}

	return ['20:00h'] // fallback
}

/**
 * Define hour ranges for different day types (for padel)
 * Monday to Friday: only check times after 17:00
 * Saturday and Sunday: check each hour
 */
export const getHourRangeForDay = (day: Day): number[] => {
	const weekdays: Day[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
	const weekends: Day[] = ['Sa', 'So']

	if (weekdays.includes(day)) {
		// Monday to Friday: only check times after 17:00
		return [17, 18, 19, 20, 21, 22]
	}

	if (weekends.includes(day)) {
		// Saturday and Sunday: check each hour
		return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
	}

	return [20] // fallback
}

/**
 * Batch DOM queries for better performance
 * Returns all needed data from a table cell in a single evaluate call
 */
export const getElementData = async (tdElement: ElementHandle<Element>) => {
	return tdElement.evaluate((el: Element) => {
		const linkElement = el.querySelector('.uzk15__eventunit')
		const colorElement = el.querySelector('.uzk15__kreis')

		return {
			hasLink: !!linkElement,
			hrefValue: linkElement?.getAttribute('href') || null,
			hasColor: !!colorElement,
			colorValue: colorElement
				? getComputedStyle(colorElement).backgroundColor
				: '',
			textContent: el.textContent || '',
		}
	})
}

/**
 * Setup page with optimal settings for booking checks
 */
export const setupPage = async (page: Page): Promise<void> => {
	await page.setViewport({ width: 1280, height: 720 })

	// Optionally disable images and CSS for faster loading
	// await page.setRequestInterception(true)
	// page.on('request', (req) => {
	//   if(req.resourceType() == 'stylesheet' || req.resourceType() == 'image'){
	//     req.abort()
	//   }
	//   else {
	//     req.continue()
	//   }
	// })
}

/**
 * Safe delay function for rate limiting
 */
export const delay = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generic error handler for page operations
 */
export const handlePageError = (error: unknown, context: string): string => {
	console.error(`Error in ${context}:`, error)
	return `${context} error: ${error}`
}

/**
 * Safe page cleanup with error handling
 */
export const safePageClose = async (
	page: Page | null,
	context: string,
): Promise<void> => {
	if (page) {
		try {
			await page.close()
		} catch (closeError) {
			console.error(`Error closing page for ${context}:`, closeError)
		}
	}
}

/**
 * Process results from Promise.allSettled with error logging
 */
export const processSettledResults = <T>(
	results: PromiseSettledResult<T>[],
	context: string,
	errorFallback: T,
): T[] => {
	return results.map((result, index) => {
		if (result.status === 'fulfilled') {
			return result.value
		}

		console.error(`Error in ${context} at index ${index}:`, result.reason)
		return errorFallback
	})
}

export type BookingResult = {
	type: 'bookable' | 'error'
	error?: string
	day: string
}

/**
 * Get current date and week for booking operations
 */
export const getCurrentBookingTime = () => {
	const currentDate = new Date()
	const currentWeek = getWeek(currentDate)
	const currentYear = currentDate.getFullYear()

	return {
		date: currentDate,
		week: currentWeek,
		year: currentYear,
	}
}

/**
 * Calculate soccer date for a specific day and time slot
 * Books for the next week (week + 1)
 */
export const getSoccerDate = (day: Day, timeSlot: string) => {
	const dayIndex = DAYS.indexOf(day)

	// Map German day abbreviations to setDay() format (0=Sunday, 1=Monday, etc.)
	// DAYS: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] (indexes 0-6)
	// setDay expects: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
	const offset = (dayIndex + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6

	const dateToUse = new Date()

	if (dayIndex < 0 || dayIndex > 6) return dateToUse

	// Use next week for booking
	const weeks = addWeeks(dateToUse, 1)
	const dateForSoccer = setDay(weeks, offset)

	// Parse the time slot (e.g., "16:00h" -> hours: 16, minutes: 0)
	// Remove the 'h' suffix if present
	const cleanTimeSlot = timeSlot.replace('h', '')
	const [hours, minutes] = cleanTimeSlot.split(':').map(Number)

	dateForSoccer.setHours(hours || 20)
	dateForSoccer.setMinutes(minutes || 0)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}

export type SoccerSlot = {
	soccerbox: number
	hrefValue: string | null
	day: Day
	date: Date
	timeSlot: string
}

export type SoccerError = {
	soccerbox: number
	error?: string
	day: Day
	date?: Date
	timeSlot?: string
}

/**
 * Format date for display in German locale
 */
export const formatBookingDate = (date: Date): string => {
	return format(date, 'EEEE, dd.MM.yyyy', { locale: de })
}

/**
 * Create a pretty booking link with date, day and time information
 */
export const createBookingLink = (slot: SoccerSlot): string => {
	const formattedDate = formatBookingDate(slot.date)
	const timeDisplay = slot.timeSlot || 'Unbekannte Zeit'

	return `
		<div style="margin: 10px 0; padding: 15px; border: 2px solid #22c55e; border-radius: 8px; background-color: #f0fdf4;">
			<h3 style="margin: 0 0 10px 0; color: #15803d;">⚽ Soccerbox ${slot.soccerbox}</h3>
			<p style="margin: 5px 0; color: #166534;"><strong>📅 Datum:</strong> ${formattedDate}</p>
			<p style="margin: 5px 0; color: #166534;"><strong>🕐 Zeit:</strong> ${timeDisplay}</p>
			<a href="${slot.hrefValue}" 
			   style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
				🎯 Jetzt buchen
			</a>
		</div>
	`
}

/**
 * Create error summary for display
 */
export const createErrorSummary = (errors: SoccerError[]): string => {
	if (errors.length === 0) return ''

	const errorGroups = errors.reduce(
		(acc, error) => {
			const errorKey = error.error || 'Unbekannter Fehler'
			if (!acc[errorKey]) {
				acc[errorKey] = []
			}
			acc[errorKey].push(error)
			return acc
		},
		{} as Record<string, SoccerError[]>,
	)

	let html =
		'<div style="margin-top: 20px; padding: 15px; border: 2px solid #fbbf24; border-radius: 8px; background-color: #fefce8;">'
	html +=
		'<h3 style="margin: 0 0 15px 0; color: #d97706;">⚠️ Fehler-Zusammenfassung</h3>'

	for (const [errorMessage, errorInstances] of Object.entries(errorGroups)) {
		html += `<div style="margin-bottom: 10px;">`
		html += `<strong style="color: #92400e;">${errorMessage}</strong> (${errorInstances.length}x)`
		html += `<ul style="margin: 5px 0 0 20px; color: #451a03;">`

		for (const instance of errorInstances) {
			const timeInfo = instance.timeSlot ? ` um ${instance.timeSlot}` : ''
			const dateInfo = instance.date
				? ` (${formatBookingDate(instance.date)})`
				: ''
			html += `<li>Soccerbox ${instance.soccerbox} am ${instance.day}${timeInfo}${dateInfo}</li>`
		}

		html += '</ul></div>'
	}

	html += '</div>'
	return html
}

/**
 * Send booking notification email with pretty formatting
 */
export const sendBookingNotificationEmail = async (
	recipientEmail: string,
	bookableSlots: SoccerSlot[],
	errorSlots: SoccerError[],
): Promise<void> => {
	const currentTime = format(new Date(), 'dd.MM.yyyy HH:mm', { locale: de })

	let htmlContent = `
		<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h1 style="color: #15803d; text-align: center; border-bottom: 3px solid #22c55e; padding-bottom: 10px;">
				⚽ Soccerbox Buchungsbenachrichtigung
			</h1>
			<p style="color: #374151; margin: 20px 0;">
				<strong>Zeitpunkt der Prüfung:</strong> ${currentTime}
			</p>
	`

	if (bookableSlots.length > 0) {
		htmlContent += `
			<h2 style="color: #15803d; margin-top: 30px;">🎉 Verfügbare Soccerboxen (${bookableSlots.length})</h2>
		`

		for (const slot of bookableSlots) {
			htmlContent += createBookingLink(slot)
		}
	} else {
		htmlContent += `
			<div style="margin: 20px 0; padding: 15px; border: 2px solid #6b7280; border-radius: 8px; background-color: #f9fafb;">
				<h2 style="margin: 0; color: #374151;">😔 Keine verfügbaren Soccerboxen</h2>
				<p style="margin: 10px 0 0 0; color: #6b7280;">Zur Zeit sind leider keine Soccerboxen verfügbar.</p>
			</div>
		`
	}

	// Add error summary if there are errors
	if (errorSlots.length > 0) {
		htmlContent += createErrorSummary(errorSlots)
	}

	htmlContent += `
			<div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; text-align: center;">
				<p style="margin: 0; color: #6b7280; font-size: 14px;">
					Diese E-Mail wurde automatisch generiert. 
					<br>Bei Fragen wende dich an den Administrator.
				</p>
			</div>
		</div>
	`

	const subject =
		bookableSlots.length > 0
			? `🎯 ${bookableSlots.length} Soccerbox${bookableSlots.length === 1 ? '' : 'en'} verfügbar!`
			: '😔 Keine Soccerboxen verfügbar'

	await sendEmail(recipientEmail, htmlContent, subject)
}
