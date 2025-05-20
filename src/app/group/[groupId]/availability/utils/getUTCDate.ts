import { formatInTimeZone } from 'date-fns-tz'

export const getUTCDate = (date: Date) => {
	// Get the user's local timezone

	const timeZone =
		Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/Berlin'

	// Convert local date to UTC while preserving the date in German timezone
	const localDateString = formatInTimeZone(date, timeZone, 'yyyy-MM-dd')
	return new Date(localDateString)
}
