import { formatInTimeZone } from 'date-fns-tz'

export const getUTCDate = (date: Date) => {
	// Get the user's local timezone
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	// Convert local date to UTC while preserving the date in the user's timezone
	const localDateString = formatInTimeZone(date, timeZone, 'yyyy-MM-dd')
	return new Date(localDateString)
}
