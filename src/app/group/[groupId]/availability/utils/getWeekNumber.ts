import { getISOWeek } from 'date-fns'

/**
 * Calculate which week (1 or 2) a given date belongs to in a bi-weekly rotation.
 * The calculation is based on the ISO week number to ensure consistency.
 *
 * @param date - The date to calculate the week number for
 * @param biWeeklyStartWeek - Optional ISO week number when the bi-weekly rotation started
 * @returns 1 or 2 representing the week in the bi-weekly cycle
 */
export function getWeekNumber(
	date: Date,
	biWeeklyStartWeek?: number | null,
): 1 | 2 {
	// Get the ISO week number using date-fns
	const isoWeek = getISOWeek(date)

	// If a custom start week is provided, calculate relative to that
	if (biWeeklyStartWeek) {
		const weeksSinceStart = isoWeek - biWeeklyStartWeek
		// For bi-weekly rotation:
		// - Week 1 slots are active on biWeeklyStartWeek and every 2nd week after (0, 2, 4, ...)
		// - Week 2 slots are active on biWeeklyStartWeek + 1 and every 2nd week after (1, 3, 5, ...)
		// We need to handle negative differences correctly (past dates)
		const normalizedDifference = ((weeksSinceStart % 2) + 2) % 2
		return normalizedDifference === 0 ? 1 : 2
	}

	// Default behavior: Return 1 for odd weeks, 2 for even weeks
	return isoWeek % 2 === 1 ? 1 : 2
}

/**
 * Get a readable label for the week number
 */
export function getWeekLabel(weekNumber: 1 | 2): string {
	return `Woche ${weekNumber}`
}
