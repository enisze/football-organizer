export const mapCoordinatesToArray = (coordinates: string | null) => {
	const split = coordinates?.split(',')
	if (!split) return null
	return [Number(split[0]), Number(split[1])]
}
