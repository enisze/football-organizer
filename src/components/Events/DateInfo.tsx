import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import type { FunctionComponent } from 'react'

type DateInfoProps = { date: Date }

export const DateInfo: FunctionComponent<DateInfoProps> = ({ date }) => {
	const day = format(date, 'EEEE', { locale: de }).toUpperCase().slice(0, 2)
	const dateDay = format(date, 'dd', { locale: de })

	return (
		<div className="flex flex-col items-center">
			<div className="text-sm font-medium text-slate-400">{day}</div>
			<div className="text-2xl font-bold text-white">{dateDay}</div>
		</div>
	)
}
