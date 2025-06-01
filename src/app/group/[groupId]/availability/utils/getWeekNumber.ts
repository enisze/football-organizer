import { getISOWeek } from 'date-fns'

/**
 * Calculate which week (1 or 2) a given date belongs to in a bi-weekly rotation.
 * The calculation is based on the ISO week number parity (even/odd).
 *
 * @param date - The date to calculate the week number for
 * @param biWeeklyStartWeek - Optional pattern: 0 for even weeks = week 1, 1 for odd weeks = week 1
 * @returns 1 or 2 representing the week in the bi-weekly cycle
 */
export function getWeekNumber(
	date: Date,
	biWeeklyStartWeek?: number | null,
): 1 | 2 {
	// Get the ISO week number using date-fns
	const isoWeek = getISOWeek(date)
	const currentWeekParity = isoWeek % 2 // 0 for even, 1 for odd

	// If a custom pattern is provided, calculate based on that
	if (biWeeklyStartWeek !== null && biWeeklyStartWeek !== undefined) {
		// biWeeklyStartWeek is 0 or 1
		// If biWeeklyStartWeek === 0: even weeks are week 1, odd weeks are week 2
		// If biWeeklyStartWeek === 1: odd weeks are week 1, even weeks are week 2
		return currentWeekParity === biWeeklyStartWeek ? 1 : 2
	}

	// Default behavior: Return 1 for odd weeks, 2 for even weeks
	return currentWeekParity === 1 ? 1 : 2
}

/**
 * Get a readable label for the week number
 */
export function getWeekLabel(weekNumber: 1 | 2): string {
	return `Woche ${weekNumber}`
}
