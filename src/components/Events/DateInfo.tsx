import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import type { FunctionComponent } from 'react'

type DateInfoProps = { date: Date }

export const DateInfo: FunctionComponent<DateInfoProps> = ({ date }) => {
	const day = format(date, 'EEEE', { locale: de }).toUpperCase().slice(0, 2)
	const dateDay = format(date, 'dd', { locale: de })

	return (
		<div className="flex flex-col items-center">
			<div className="font-bold">{day}</div>
			<div className="font-bold border rounded-full p-1 text-xs">{dateDay}</div>
		</div>
	)
}
