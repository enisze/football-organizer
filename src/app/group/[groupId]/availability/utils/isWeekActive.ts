import { getISOWeek } from 'date-fns'

/**
 * Check if the current week is active in a bi-weekly rotation.
 * The calculation is based on the ISO week number parity (even/odd).
 *
 * @param date - The date to check
 * @param biWeeklyStartWeek - Optional pattern: 0 for even weeks = active, 1 for odd weeks = active
 * @returns true if the current week is active in the bi-weekly cycle
 */
export function isWeekActive(date: Date, biWeeklyStartWeek: number | null): boolean {
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
