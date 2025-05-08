export const getUTCDate = (date: Date) => {
	// Get the local date parts
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	// Create a new date with the time set to noon to avoid DST issues
	const localDate = new Date(year, month, day, 12, 0, 0)

	// Create UTC date with the same calendar date
	const utcDate = new Date(
		Date.UTC(
			localDate.getFullYear(),
			localDate.getMonth(),
			localDate.getDate(),
			0,
			0,
			0,
		),
	)

	return utcDate
}
