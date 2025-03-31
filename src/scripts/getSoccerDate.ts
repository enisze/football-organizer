import { addWeeks, startOfWeek } from "date-fns"
import { de } from "date-fns/locale"

export const getSoccerDate = () => {
	const date = new Date()

	const dateForSoccer = startOfWeek(addWeeks(date, 1), {
		weekStartsOn: 1,
		locale: de,
	})

	dateForSoccer.setHours(20)
	dateForSoccer.setMinutes(0)
	dateForSoccer.setSeconds(0)
	dateForSoccer.setMilliseconds(0)

	return dateForSoccer
}
