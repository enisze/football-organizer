import { sendEmail } from '@/inngest/createSendEmail'
import { addWeeks, getWeek, setDay } from 'date-fns'
import type { Page } from 'puppeteer'

const redColor = 'rgb(175, 18, 29)'
const greenColor = 'rgb(131, 176, 34)'

const date = new Date()
const week = getWeek(date)

type Weekday = 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr' | 'Sa' | 'So'

type Schedule = {
	[day in Weekday]?: string[]
}

const schedule: Schedule = {
	Mo: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'16:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Di: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Mi: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Do: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Fr: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Sa: ['10:00', '12:00', '13:00', '15:00', '16:00', '18:00'],
	So: ['12:00', '13:00', '15:00', '16:00', '18:00'],
}

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as Weekday[]

// Get time slots for a specific day with 'h' suffix for compatibility
// For weekdays (Mo-Fr): only check slots 16:00, 17:00, 18:00
// For weekends (Sa-So): check all available slots
const getTimeRangeForDay = (day: Weekday): string[] => {
	const timeSlots = schedule[day] || []

	// Check if it's a weekend day
	const isWeekend = day === 'Sa' || day === 'So'

	let filteredSlots: string[]

	if (isWeekend) {
		// For weekends, use all available slots
		filteredSlots = timeSlots
	} else {
		// For weekdays, only include 16:00, 17:00, 18:00
		const allowedWeekdayTimes = ['17:00', '18:00', '19:00', '20:00']
		filteredSlots = timeSlots.filter((timeStr) =>
			allowedWeekdayTimes.includes(timeStr),
		)
	}

	return filteredSlots.map((timeStr) => `${timeStr}h`)
}

const getSoccerDate = (day: Weekday, timeSlot: string) => {
	const offset = (days.indexOf(day) + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6

	const dateToUse = new Date()

	if (offset < 0 || offset > 6) return dateToUse

	const weeks = addWeeks(dateToUse, 0)

	const dateForSoccer = setDay(weeks, offset)

	// Parse the time slot (e.g., "16:00" -> hours: 16, minutes: 0)
	const [hours, minutes] = timeSlot.split(':').map(Number)

	dateForSoccer.setHours(hours || 0)
	dateForSoccer.setMinutes(minutes || 0)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}

// Pre-calculate dates outside the loop for better performance
const soccerDates = days.flatMap((day) => {
	const timeSlots = getTimeRangeForDay(day)
	return timeSlots.map((timeSlot) => ({
		day,
		timeSlot: timeSlot.replace('h', ''), // Remove 'h' suffix for date calculation
		date: getSoccerDate(day, timeSlot.replace('h', '')),
	}))
})

type SoccerResult = {
	type: 'bookable' | 'error'
	soccerbox: number
	error?: string
	hrefValue?: string | null
	day: Weekday
}

// Function to wait for the calendar to finish loading
const waitForCalendarReady = async (page: Page): Promise<void> => {
	try {
		await page.waitForSelector('#calendar_slider', { timeout: 10000 })
		await page.waitForFunction(
			() => {
				const spinnerElement = document.querySelector('.uzk15__spinner')
				const calendarSlider = document.querySelector('#calendar_slider')

				if (!spinnerElement) return true

				const spinnerStyle = window.getComputedStyle(spinnerElement)
				const isSpinnerHidden =
					spinnerStyle.display === 'none' ||
					spinnerStyle.visibility === 'hidden' ||
					spinnerStyle.opacity === '0'

				const calendarText = calendarSlider?.textContent || ''
				const isLoadingTextGone = !calendarText.includes('Bitte warten')

				return isSpinnerHidden && isLoadingTextGone
			},
			{ timeout: 30000, polling: 500 },
		)
		await new Promise((resolve) => setTimeout(resolve, 1000))
	} catch (error) {
		console.warn('⚠️ Calendar wait failed, continuing')
	}
}

// Reusable function to process a single soccerbox for a specific day
const processSoccerboxDay = async (
	page: Page,
	soccerbox: number,
	day: Weekday,
	soccerDate: Date,
	currentYear: number,
	week: number,
): Promise<SoccerResult | null> => {
	const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox${soccerbox}/index_ger.html?y=${currentYear}&w=${week}`
	const allowedTimes = getTimeRangeForDay(day)
	const cssSelector = `td[class="${day}"][datetime="${soccerDate.toISOString()}"]`

	try {
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 })
		await waitForCalendarReady(page)

		const tdElement = await page.waitForSelector(cssSelector, {
			timeout: 5000,
		})

		if (!tdElement) {
			return {
				type: 'error',
				soccerbox,
				error: 'Element not found',
				day,
			}
		}

		const elementData = await tdElement.evaluate((el) => {
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

		if (!elementData.hasLink) {
			return {
				type: 'error',
				soccerbox,
				error: 'Not bookable yet',
				day,
			}
		}

		if (!elementData.hasColor) {
			return {
				type: 'error',
				soccerbox,
				error: 'No color found',
				day,
			}
		}

		const hasValidTime = allowedTimes.some((time) =>
			elementData.textContent.includes(time),
		)

		if (elementData.colorValue === redColor) {
			console.log(
				`🔴 UNAVAILABLE: Soccerbox ${soccerbox} on ${day} at ${soccerDate.getHours()}:${soccerDate.getMinutes().toString().padStart(2, '0')}
				${
					!hasValidTime
						? `real time ${elementData.textContent.slice(0, 6)}`
						: ''
				}
				`,
			)
			return {
				type: 'error',
				soccerbox,
				error: 'Already booked',
				day,
			}
		}

		if (elementData.colorValue === greenColor) {
			console.log(
				`🟢 AVAILABLE: Soccerbox ${soccerbox} on ${day} at ${soccerDate.getHours()}:${soccerDate.getMinutes().toString().padStart(2, '0')} 
				${
					!hasValidTime
						? `real time ${elementData.textContent.slice(0, 6)}`
						: ''
				}
				`,
			)
			return {
				type: 'bookable',
				soccerbox,
				hrefValue: elementData.hrefValue,
				day,
			}
		}

		return null
	} catch (error) {
		return {
			type: 'error',
			soccerbox,
			error: `Error: ${error}`,
			day,
		}
	}
}

// Reusable function to process a single soccerbox with error isolation
const processSoccerbox = async (
	soccerbox: number,
	currentYear: number,
	week: number,
): Promise<SoccerResult[]> => {
	let page: Page | null = null

	console.log(`🎯 Starting processing for Soccerbox ${soccerbox}`)

	try {
		page = await browser.newPage()
		await page.setViewport({ width: 1280, height: 720 })

		const results: SoccerResult[] = []

		// Process each day and time slot sequentially to avoid multiple page navigations
		for (const { day, timeSlot, date: soccerDate } of soccerDates) {
			try {
				const result = await processSoccerboxDay(
					page,
					soccerbox,
					day,
					soccerDate,
					currentYear,
					week,
				)

				if (result) {
					results.push(result)
				}
			} catch (error) {
				console.error(`❌ Error processing ${soccerbox} on ${day}:`, error)
				results.push({
					type: 'error',
					soccerbox,
					error: `Processing error: ${error}`,
					day,
				})
			}
		}

		console.log(
			`✅ Finished processing Soccerbox ${soccerbox} (${results.length} results)`,
		)

		return results
	} catch (error) {
		console.error(`❌ Fatal error soccerbox ${soccerbox}:`, error)
		console.log(
			`❌ Finished processing Soccerbox ${soccerbox} with fatal error`,
		)
		return [
			{
				type: 'error',
				soccerbox,
				error: 'Fatal error',
				day: 'Mo' as Weekday,
			},
		]
	} finally {
		if (page) {
			try {
				console.log(`🔄 Closing page for Soccerbox ${soccerbox}...`)
				// Wait for any pending operations to complete
				await new Promise((resolve) => setTimeout(resolve, 1000))
				await page.close()
				// Additional wait after closing to ensure cleanup
				await new Promise((resolve) => setTimeout(resolve, 500))
				console.log(`✅ Page closed for Soccerbox ${soccerbox}`)
			} catch (closeError) {
				console.error(
					`❌ Error closing page soccerbox ${soccerbox}:`,
					closeError,
				)
			}
		}
	}
}

describe('Booking reminder', () => {
	const soccerboxesBookable: {
		soccerbox: number
		hrefValue: string | null
		day: Weekday
	}[] = []
	const soccerboxesError: {
		soccerbox: number
		error?: string
		day: Weekday
	}[] = []
	it('Should remind booking"', async () => {
		const currentYear = date.getFullYear()

		// Process soccerboxes sequentially instead of in parallel
		const allResults: SoccerResult[][] = []

		try {
			for (let soccerbox = 1; soccerbox <= 3; soccerbox++) {
				try {
					const result = await processSoccerbox(soccerbox, currentYear, week)
					console.log(`✅ Completed processing Soccerbox ${soccerbox}`)
					allResults.push(result)
				} catch (error) {
					console.error(`❌ Fatal error soccerbox ${soccerbox}:`, error)
					allResults.push([
						{
							type: 'error' as const,
							soccerbox,
							error: 'Fatal error',
							day: 'Mo' as Weekday,
						},
					])
				}
			}

			console.log('🔄 All soccerboxes processed, now analyzing results...')

			// Process all results synchronously to avoid async logging issues
			for (const soccerboxResult of allResults) {
				for (const result of soccerboxResult) {
					if (result?.type === 'bookable') {
						soccerboxesBookable.push({
							soccerbox: result.soccerbox,
							hrefValue: result.hrefValue || null,
							day: result.day,
						})
					} else if (result?.type === 'error') {
						soccerboxesError.push({
							soccerbox: result.soccerbox,
							error: result.error,
							day: result.day,
						})
					}
				}
			}

			// Log everything immediately and synchronously
			console.log(`✅ Found ${soccerboxesBookable.length} bookable soccerboxes`)

			const alreadyBookedCount = soccerboxesError.filter(
				(error) => error.error === 'Already booked',
			).length
			const otherErrorsCount = soccerboxesError.length - alreadyBookedCount

			console.log(
				`⚠️ ${soccerboxesError.length} total errors (${alreadyBookedCount} already booked, ${otherErrorsCount} other issues)`,
			)

			// Analyze distinct errors (excluding "Already booked" since those are expected)
			const nonBookedErrors = soccerboxesError.filter(
				(error) => error.error !== 'Already booked',
			)

			if (nonBookedErrors.length > 0) {
				console.log('📊 DISTINCT ERRORS ANALYSIS (excluding "Already booked"):')

				// Group errors by error message
				const errorGroups = nonBookedErrors.reduce(
					(acc, errorItem) => {
						const errorKey = errorItem.error || 'Unknown error'
						if (!acc[errorKey]) {
							acc[errorKey] = {
								count: 0,
								instances: [],
							}
						}
						acc[errorKey].count++
						acc[errorKey].instances.push({
							soccerbox: errorItem.soccerbox,
							day: errorItem.day,
						})
						return acc
					},
					{} as Record<
						string,
						{
							count: number
							instances: Array<{ soccerbox: number; day: string }>
						}
					>,
				)

				// Display each distinct error with details - do this synchronously
				for (const [errorMessage, details] of Object.entries(errorGroups)) {
					console.log(
						`\n❌ Error: "${errorMessage}" (${details.count} occurrences)`,
					)
					for (const instance of details.instances) {
						console.log(
							`   - Soccerbox ${instance.soccerbox} on ${instance.day}`,
						)
					}
				}
				console.log('') // Empty line for spacing
			}

			if (soccerboxesBookable.length > 0) {
				for (const slot of soccerboxesBookable) {
					console.log(`  ⚽ Soccerbox ${slot.soccerbox} on ${slot.day}`)
				}

				// Handle email sending
				try {
					await sendEmail(
						'eniszej@gmail.com',
						`
        <h1>Es gibt buchbare Soccerboxen für </h1>
        <ul>
        ${soccerboxesBookable.map(
					(soccerbox) =>
						`<li> <a href="${soccerbox.hrefValue}">
            Soccerbox ${soccerbox.soccerbox} hier buchen
            hier buchen</a></li>`,
				)}
        ${soccerboxesError.map(
					(soccerbox) =>
						`<li> Soccerbox ${soccerbox.soccerbox}, Fehler: ${soccerbox.error}</li>`,
				)}
        </ul>
        `,
						'Es gibt buchbare Soccerboxen',
					)
					console.log('📧 Email sent')
				} catch (error) {
					console.log('❌ Email failed:', error)
				}
			}

			console.log('✅ All processing and logging completed')
		} catch (error) {
			console.error('❌ Test execution failed:', error)
		} finally {
			console.log('🧹 Starting final cleanup...')
			// Ensure all async operations are completed before test ends
			// Wait for browser cleanup and any remaining async operations
			await new Promise((resolve) => setTimeout(resolve, 3000))
			console.log('🏁 Test cleanup completed')
		}
	}, 360000) // Increased timeout to 2 minutes
})
