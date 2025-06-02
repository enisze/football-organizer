import { getISOWeek } from 'date-fns'

/**
 * Calculate which week (1 or 2) a given date belongs to in a bi-weekly rotation.
 * The calculation is based on the ISO week number parity (even/odd).
 *
 * @param date - The date to calculate the week number for
 * @param biWeeklyStartWeek - Optional pattern: 0 for even weeks = week 1, 1 for odd weeks = week 1
 * @returns 1 or 2 representing the week in the bi-weekly cycle
 */
export function getWeekNumber(date: Date, biWeeklyStartWeek: number | null) {
	const isoWeek = getISOWeek(date)
	const currentWeekParity = isoWeek % 2

	return currentWeekParity === biWeeklyStartWeek
}

/**
 * Get a readable label for the week number
 */
export function getWeekLabel(weekNumber: 1 | 2): string {
	return `Woche ${weekNumber}`
}
