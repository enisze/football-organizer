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
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Di: [
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Mi: [
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'15:00',
		'16:00',
		'18:00',
	],
	Do: [
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'15:00',
		'16:00',
		'18:00',
	],
	Fr: [
		'08:00',
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'17:00',
		'18:00',
		'20:00',
	],
	Sa: ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '18:00'],
	So: ['12:00', '13:00', '15:00', '16:00', '18:00'],
}

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as Weekday[]

// Convert time string to hour and minute
const parseTime = (timeStr: string): { hour: number; minute: number } => {
	const [hourStr = '0', minuteStr = '0'] = timeStr.split(':')
	return {
		hour: Number.parseInt(hourStr, 10),
		minute: Number.parseInt(minuteStr, 10),
	}
}

// Get time slots for a specific day
const getTimeSlotsForDay = (
	day: Weekday,
): Array<{ hour: number; minute: number; timeStr: string }> => {
	const timeSlots = schedule[day] || []
	return timeSlots.map((timeStr) => ({
		...parseTime(timeStr),
		timeStr,
	}))
}

const getSoccerDate = (day: Weekday, hour: number, minute: number) => {
	const dayIndex = days.indexOf(day)

	// Map German day abbreviations to setDay() format (0=Sunday, 1=Monday, etc.)
	// days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] (indexes 0-6)
	// setDay expects: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday
	const offset = (dayIndex + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6

	const dateToUse = new Date()

	const weeks = addWeeks(dateToUse, 1)

	const dateForSoccer = setDay(weeks, offset)

	dateForSoccer.setHours(hour)
	dateForSoccer.setMinutes(minute)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}

// Pre-calculate all date combinations for better performance, organized by day
const dateTimeSlotsByDay = days.reduce(
	(acc, day) => {
		const timeSlots = getTimeSlotsForDay(day)
		acc[day] = timeSlots.map(({ hour, minute, timeStr }) => ({
			day,
			hour,
			minute,
			timeStr,
			date: getSoccerDate(day, hour, minute),
		}))
		return acc
	},
	{} as Record<
		Weekday,
		Array<{
			day: Weekday
			hour: number
			minute: number
			timeStr: string
			date: Date
		}>
	>,
)

type PadelResult = {
	type: 'bookable' | 'error'
	error?: string
	hrefValue?: string | null
	day: Weekday
	hour: number
	minute: number
	timeStr: string
	soccerdate?: string
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

// Reusable function to process a single time slot
const processPadelSlot = async (
	page: Page,
	day: Weekday,
	hour: number,
	minute: number,
	timeStr: string,
	soccerDate: Date,
): Promise<PadelResult | null> => {
	try {
		const cssSelector = `td[class="${day}"][datetime="${soccerDate.toISOString()}"]`

		const tdElement = await page.waitForSelector(cssSelector, {
			timeout: 3000,
		})

		if (!tdElement) {
			return {
				type: 'error',
				error: 'Element not found',
				day,
				hour,
				minute,
				timeStr,
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
			}
		})

		if (!elementData.hasLink) {
			return {
				type: 'error',
				error: 'Not bookable yet',
				day,
				hour,
				minute,
				timeStr,
			}
		}

		if (!elementData.hasColor) {
			return {
				type: 'error',
				error: 'No color found',
				day,
				hour,
				minute,
				timeStr,
			}
		}

		if (elementData.colorValue === redColor) {
			return {
				type: 'error',
				error: 'Already booked',
				day,
				hour,
				minute,
				timeStr,
			}
		}

		if (elementData.colorValue === greenColor) {
			console.log(`🟢 AVAILABLE: ${day} ${timeStr}`)
			return {
				type: 'bookable',
				hrefValue: elementData.hrefValue,
				day,
				hour,
				minute,
				timeStr,
				soccerdate: new Date(soccerDate).toLocaleDateString('de-DE'),
			}
		}

		return null
	} catch (error) {
		return {
			type: 'error',
			error: `Error: ${error}`,
			day,
			hour,
			minute,
			timeStr,
		}
	}
}

// Reusable function to process a single day with error isolation
const processPadelDay = async (
	day: Weekday,
	slots: Array<{
		day: Weekday
		hour: number
		minute: number
		timeStr: string
		date: Date
	}>,
	baseUrl: string,
): Promise<PadelResult[]> => {
	let page: Page | null = null

	try {
		page = await browser.newPage()

		await page.setViewport({
			height: 1080,
			width: 1920,
		})

		await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 15000 })
		await waitForCalendarReady(page)

		const batchSize = 5
		const results: (PadelResult | null)[] = []

		for (let i = 0; i < slots.length; i += batchSize) {
			const batch = slots.slice(i, i + batchSize)

			const batchPromises = batch.map(
				async ({ day, hour, minute, timeStr, date: soccerDate }) => {
					return processPadelSlot(
						page as Page,
						day,
						hour,
						minute,
						timeStr,
						soccerDate,
					)
				},
			)

			const batchResults = await Promise.allSettled(batchPromises)

			batchResults.forEach((result, index) => {
				if (result.status === 'fulfilled') {
					results.push(result.value)
				} else {
					const slotInfo = batch[index]
					results.push({
						type: 'error',
						error: 'Batch error',
						day: slotInfo?.day || day,
						hour: slotInfo?.hour || -1,
						minute: slotInfo?.minute || 0,
						timeStr: slotInfo?.timeStr || '',
					})
				}
			})

			if (i + batchSize < slots.length) {
				await new Promise((resolve) => setTimeout(resolve, 100))
			}
		}

		return results.filter((result): result is PadelResult => result !== null)
	} catch (error) {
		console.error(`❌ Fatal error ${day}:`, error)
		return [
			{
				type: 'error',
				error: 'Fatal error',
				day,
				hour: -1,
				minute: 0,
				timeStr: '',
			},
		]
	} finally {
		if (page) {
			try {
				await page.close()
			} catch (closeError) {
				console.error(`❌ Error closing page ${day}`)
			}
		}
	}
}

describe('Booking reminder', () => {
	const padelBookable: {
		hrefValue: string | null
		day: Weekday
		timeStr: string
		soccerdate: string
		hour: number
		minute: number
	}[] = []
	const padelError: {
		error?: string
		day: Weekday
		hour: number
		minute: number
		timeStr: string
	}[] = []

	it('Should remind booking"', async () => {
		const currentYear = date.getFullYear()
		const baseUrl = `https://unisport.koeln/sportspiele/padel/padel_platzreservierung/index_ger.html?y=${currentYear}&w=${week + 1}`

		const dayPromises = Object.entries(dateTimeSlotsByDay).map(
			async ([day, slots]) => {
				try {
					return await processPadelDay(day as Weekday, slots, baseUrl)
				} catch (error) {
					console.error(`❌ Fatal error ${day}:`, error)
					return [
						{
							type: 'error' as const,
							error: 'Fatal error',
							day: day as Weekday,
							hour: -1,
							minute: 0,
							timeStr: '',
						},
					]
				}
			},
		)

		const allResults = await Promise.allSettled(dayPromises)

		for (const dayResult of allResults) {
			if (dayResult.status === 'fulfilled') {
				for (const result of dayResult.value) {
					if (result?.type === 'bookable') {
						console.log(`📅 BOOKABLE: ${result.day} ${result.timeStr}`)
						padelBookable.push({
							hrefValue: result.hrefValue || null,
							day: result.day,
							timeStr: result.timeStr,
							soccerdate: result.soccerdate || 'unknown',
							hour: result.hour,
							minute: result.minute,
						})
					} else if (result?.type === 'error') {
						padelError.push({
							error: result.error,
							day: result.day,
							hour: result.hour,
							minute: result.minute,
							timeStr: result.timeStr,
						})
					}
				}
			} else {
				console.error('❌ Day processing failed')
				padelError.push({
					error: 'Day processing failed',
					day: 'Mo' as Weekday,
					hour: -1,
					minute: 0,
					timeStr: '',
				})
			}
		}

		console.log(`✅ Found ${padelBookable.length} bookable slots`)

		const alreadyBookedCount = padelError.filter(
			(error) => error.error === 'Already booked',
		).length
		const otherErrorsCount = padelError.length - alreadyBookedCount

		console.log(
			`⚠️ ${padelError.length} total errors (${alreadyBookedCount} already booked, ${otherErrorsCount} other issues)`,
		)

		// Analyze distinct errors (excluding "Already booked" since those are expected)
		const nonBookedErrors = padelError.filter(
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
						day: errorItem.day,
						timeStr: errorItem.timeStr,
						hour: errorItem.hour,
						minute: errorItem.minute,
					})
					return acc
				},
				{} as Record<
					string,
					{
						count: number
						instances: Array<{
							day: string
							timeStr: string
							hour: number
							minute: number
						}>
					}
				>,
			)

			// Display each distinct error with details
			for (const [errorMessage, details] of Object.entries(errorGroups)) {
				console.log(
					`\n❌ Error: "${errorMessage}" (${details.count} occurrences)`,
				)
				for (const instance of details.instances) {
					console.log(
						`   - ${instance.day} ${instance.timeStr} (${instance.hour}:${instance.minute.toString().padStart(2, '0')})`,
					)
				}
			}
			console.log('') // Empty line for spacing
		}

		if (padelBookable.length > 0) {
			for (const slot of padelBookable) {
				console.log(`  📅 ${slot.day} ${slot.timeStr}`)
			}

			try {
				const emailContent = `
        <h1>Es gibt buchbare Padelboxen: </h1>
        <ul>
        ${padelBookable.map(
					(padelbox) =>
						`<li> <a href="${padelbox.hrefValue}">
            Padel hier buchen für Tag: ${padelbox.day}. Genaues Datum: ${padelbox.soccerdate}, ${padelbox.day} ${padelbox.timeStr}.
            </a></li>`,
				)}
        ${padelError.map(
					(padelbox) =>
						`<li> Padel Fehler: ${padelbox.error} für ${padelbox.day} ${padelbox.timeStr}</li>`,
				)}
        </ul>
        `

				await sendEmail(
					'eniszej@gmail.com',
					emailContent,

					'Es gibt buchbare Padelboxen',
				)
				console.log('📧 Email sent')
			} catch (error) {
				console.log('❌ Email failed:', error)
			}
		}
	}, 500000)
})
