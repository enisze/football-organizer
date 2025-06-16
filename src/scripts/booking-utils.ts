import type { Page } from 'puppeteer'

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
export const getElementData = async (tdElement: any) => {
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
export const handlePageError = (error: any, context: string): string => {
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
