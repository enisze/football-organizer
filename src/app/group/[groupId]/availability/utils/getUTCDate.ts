export const getUTCDate = (date: Date) => {
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	// Create date in local timezone first, then convert to UTC
	const localDate = new Date(year, month, day)
	const utcDate = new Date(Date.UTC(year, month, day))

	// Adjust for timezone offset if needed
	if (localDate.getDate() !== date.getDate()) {
		// If date changed due to timezone, adjust back
		utcDate.setUTCDate(date.getDate())
	}

	console.log(localDate, utcDate)

	return utcDate
}
