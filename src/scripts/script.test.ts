import type { Page } from 'puppeteer'
import * as R from 'remeda'
import {
	COLORS,
	type Day,
	type SoccerError,
	type SoccerSlot,
	getCurrentBookingTime,
	getElementData,
	getSoccerDate,
	sendBookingNotificationEmail,
} from './booking-utils'

const { red: redColor, green: greenColor } = COLORS
const { week, year: currentYear } = getCurrentBookingTime()

type Weekday = Day

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
// For weekdays (Mo-Fr): only check slots 17:00, 18:00, 20:00
// For weekends (Sa-So): check all available slots
const getTimeRangeForDay = (day: Weekday): string[] => {
	const timeSlots = schedule[day] || []
	const isWeekend = ['Sa', 'So'].includes(day)

	const filteredSlots = isWeekend
		? timeSlots
		: R.filter(timeSlots, (timeStr) =>
				['17:00', '18:00', '20:00'].includes(timeStr),
			)

	return R.map(filteredSlots, (timeStr) => `${timeStr}h`)
}

// Pre-calculate dates outside the loop for better performance
const soccerDates = R.flatMap(days, (day) => {
	const timeSlots = getTimeRangeForDay(day)
	return R.map(timeSlots, (timeSlot) => {
		const cleanTimeSlot = timeSlot.replace('h', '') // Remove 'h' suffix for date calculation
		const soccerDate = getSoccerDate(day, cleanTimeSlot)

		return {
			day,
			timeSlot: cleanTimeSlot,
			date: soccerDate,
		}
	})
})

type SoccerResult = {
	type: 'bookable' | 'error'
	soccerbox: number
	error?: string
	hrefValue?: string | null
	day: Weekday
	date: Date
	timeSlot: string
}

// Function to wait for the calendar to finish loading (optimized)
const waitForCalendarReady = async (page: Page): Promise<void> => {
	try {
		await page.waitForSelector('#calendar_slider', { timeout: 8000 })
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
			{ timeout: 20000, polling: 300 },
		)
		await new Promise((resolve) => setTimeout(resolve, 500))
	} catch (error) {
		console.warn('⚠️ Calendar wait failed, continuing')
	}
}

// Optimize page for faster loading
const optimizePage = async (page: Page): Promise<void> => {
	// Set smaller viewport for faster rendering
	await page.setViewport({ width: 1024, height: 600 })

	// Set faster navigation timeout
	await page.setDefaultNavigationTimeout(8000)
	await page.setDefaultTimeout(5000)
}

// Optimized function to process a single soccerbox for a specific day
const processSoccerboxDay = async (
	page: Page,
	soccerbox: number,
	day: Weekday,
	soccerDate: Date,
	timeSlot: string,
	currentYear: number,
	week: number,
): Promise<SoccerResult | null> => {
	const url = `https://unisport.koeln/sportspiele/fussball/soccerbox/einzeltermin_buchung/soccerbox${soccerbox}/index_ger.html?y=${currentYear}&w=${week}`

	const cssSelector = `td[class="${day}"][datetime="${soccerDate.toISOString()}"]`

	try {
		await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 })

		await waitForCalendarReady(page)

		const tdElement = await page.waitForSelector(cssSelector, {
			timeout: 4000,
		})

		if (!tdElement) {
			return {
				type: 'error',
				soccerbox,
				error: 'Element not found',
				day,
				date: soccerDate,
				timeSlot,
			}
		}

		const elementData = await getElementData(tdElement)

		if (!elementData.hasLink) {
			return {
				type: 'error',
				soccerbox,
				error: 'Not bookable yet',
				day,
				date: soccerDate,
				timeSlot,
			}
		}

		if (!elementData.hasColor) {
			return {
				type: 'error',
				soccerbox,
				error: 'No color found',
				day,
				date: soccerDate,
				timeSlot,
			}
		}

		if (elementData.colorValue === redColor) {
			return {
				type: 'error',
				soccerbox,
				error: 'Already booked',
				day,
				date: soccerDate,
				timeSlot,
			}
		}

		if (elementData.colorValue === greenColor) {
			return {
				type: 'bookable',
				soccerbox,
				hrefValue: elementData.hrefValue,
				day,
				date: soccerDate,
				timeSlot,
			}
		}

		return null
	} catch (error) {
		return {
			type: 'error',
			soccerbox,
			error: `Error: ${error}`,
			day,
			date: soccerDate,
			timeSlot,
		}
	}
}

// Optimized function to process a single soccerbox with parallel day processing
const processSoccerbox = async (
	soccerbox: number,
	currentYear: number,
	week: number,
): Promise<SoccerResult[]> => {
	let page: Page | null = null

	console.log(`🎯 Starting processing for Soccerbox ${soccerbox}`)

	try {
		page = await browser.newPage()
		await optimizePage(page)

		const results: SoccerResult[] = []

		// Group dates by unique days to minimize page navigations using Remeda
		const datesByDay = R.groupBy(soccerDates, (entry) => entry.day)

		// Process days sequentially for better reliability
		for (const [day, dayEntries] of Object.entries(datesByDay)) {
			// Process time slots sequentially within each day
			for (const { timeSlot, date: soccerDate } of dayEntries) {
				try {
					if (!page) {
						throw new Error('Page is null')
					}
					const result = await processSoccerboxDay(
						page,
						soccerbox,
						day as Weekday,
						soccerDate,
						timeSlot,
						currentYear,
						week,
					)

					if (result) {
						results.push(result)
					}
				} catch (error) {
					console.error(
						`❌ Error processing ${soccerbox} on ${day} at ${timeSlot}:`,
						error,
					)
					results.push({
						type: 'error' as const,
						soccerbox,
						error: `Processing error: ${error}`,
						day: day as Weekday,
						date: soccerDate,
						timeSlot,
					})
				}
			}

			// Small delay between days to avoid overwhelming the server
			await new Promise((resolve) => setTimeout(resolve, 200))
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
				day: 'Mo' as Weekday, // Use fallback since we don't know which specific slot failed
				date: new Date(),
				timeSlot: '20:00', // Use fallback since we don't know which specific slot failed
			},
		]
	} finally {
		if (page) {
			try {
				await page.close()
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
	const soccerboxesBookable: SoccerSlot[] = []
	const soccerboxesError: SoccerError[] = []
	it('Should remind booking"', async () => {
		// Process soccerboxes sequentially for better reliability
		const allResults: SoccerResult[][] = []

		try {
			for (let soccerbox = 1; soccerbox <= 2; soccerbox++) {
				// Reduced from 3 to 2 for faster testing
				try {
					console.log(`🎯 Processing Soccerbox ${soccerbox}...`)
					const result = await processSoccerbox(
						soccerbox,
						currentYear,
						week + 1,
					) // Use next week
					console.log(`✅ Completed processing Soccerbox ${soccerbox}`)
					allResults.push(result)
				} catch (error) {
					console.error(`❌ Fatal error soccerbox ${soccerbox}:`, error)
					allResults.push([
						{
							type: 'error' as const,
							soccerbox,
							error: `Fatal error: ${error}`,
							day: 'Mo' as Weekday,
							date: new Date(),
							timeSlot: '20:00',
						},
					])
				}
			}

			console.log('🔄 All soccerboxes processed, now analyzing results...')

			// Process all results using Remeda for better performance
			const allFlatResults = R.flatMap(allResults, (results) => results)
			const nonNullResults = R.filter(
				allFlatResults,
				(result): result is SoccerResult => result !== null,
			)

			const { bookable: bookableResults = [], error: errorResults = [] } =
				R.groupBy(nonNullResults, (result) => result.type)

			// Process bookable results using Remeda
			for (const result of bookableResults) {
				soccerboxesBookable.push({
					soccerbox: result.soccerbox,
					hrefValue: result.hrefValue || null,
					day: result.day,
					date: result.date,
					timeSlot: result.timeSlot,
				})
			}

			// Process error results using Remeda
			for (const result of errorResults) {
				soccerboxesError.push({
					soccerbox: result.soccerbox,
					error: result.error,
					day: result.day,
					date: result.date,
					timeSlot: result.timeSlot,
				})
			}

			// Log everything immediately and synchronously
			console.log(`✅ Found ${soccerboxesBookable.length} bookable soccerboxes`)

			const alreadyBookedCount = R.filter(
				soccerboxesError,
				(error) => error.error === 'Already booked',
			).length
			const otherErrorsCount = soccerboxesError.length - alreadyBookedCount

			console.log(
				`⚠️ ${soccerboxesError.length} total errors (${alreadyBookedCount} already booked, ${otherErrorsCount} other issues)`,
			)

			// Analyze distinct errors (excluding "Already booked" since those are expected)
			const nonBookedErrors = R.filter(
				soccerboxesError,
				(error) => error.error !== 'Already booked',
			)

			if (nonBookedErrors.length > 0) {
				console.log('📊 DISTINCT ERRORS ANALYSIS (excluding "Already booked"):')

				// Group errors by error message using Remeda
				const errorGroups = R.groupBy(
					nonBookedErrors,
					(errorItem) => errorItem.error || 'Unknown error',
				)

				// Display each distinct error with details - do this synchronously
				for (const [errorMessage, instances] of Object.entries(errorGroups)) {
					console.log(
						`\n❌ Error: "${errorMessage}" (${instances.length} occurrences)`,
					)
					for (const instance of instances) {
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
			}

			// Send email notification using the beautiful email function
			try {
				await sendBookingNotificationEmail(
					'eniszej@gmail.com',
					soccerboxesBookable,
					soccerboxesError,
				)
				console.log('📧 Beautiful email sent successfully')
			} catch (error) {
				console.log('❌ Email failed:', error)
			}

			console.log('✅ All processing and logging completed')
		} catch (error) {
			console.error('❌ Test execution failed:', error)
		} finally {
			console.log('🧹 Starting final cleanup...')
			// Reduced cleanup time for better performance
			await new Promise((resolve) => setTimeout(resolve, 1000))
			console.log('🏁 Test cleanup completed')
		}
	}, 500000) // Reduced timeout to 4 minutes
})
