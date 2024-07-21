//prettier-ignore
export const getEuroAmount = (snippet: string): number => {
	let amount = 0
	const convertCommaToDot = snippet.replaceAll(',', '.')

	const allMatches = convertCommaToDot.match(/\d+(?:\.\d{1,3})|\d+/)

	if (!allMatches) return amount
	amount = Number(allMatches[0])

	return amount
}
