export const getUTCDate = (date: Date) => {
	const utcDate = new Date(
		Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			0,
			0,
			0,
			0,
		),
	)
	return utcDate
}
