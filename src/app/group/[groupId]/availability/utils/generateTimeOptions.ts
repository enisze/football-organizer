export const generateTimeOptions = (intervalMinutes: number) => {
	const options: string[] = []
	const totalMinutesInDay = 24 * 60

	for (
		let minutes = 0;
		minutes < totalMinutesInDay;
		minutes += intervalMinutes
	) {
		const hours = Math.floor(minutes / 60)
		const mins = minutes % 60
		options.push(
			`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`,
		)
	}

	return options
}
