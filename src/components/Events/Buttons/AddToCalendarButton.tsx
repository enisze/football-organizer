'use client'
import { Button } from '@/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog'
import type { CalendarOptions } from 'datebook'
import { GoogleCalendar, ICalendar, OutlookCalendar } from 'datebook'
import { CalendarPlus } from 'lucide-react'
import type { FunctionComponent } from 'react'

import { saveAs } from 'file-saver'

export type AddToCalendarButtonProps = {
	startTime: string
	endTime: string
	date: Date
	address: string
}

export const AddToCalendarButton: FunctionComponent<
	AddToCalendarButtonProps
> = ({ startTime, endTime, date, address }) => {
	const [startHours, startMinutes] = startTime.split(':')
	const [endHours, endMinutes] = endTime.split(':')

	const start = new Date(date)
	const end = new Date(date)

	start.setHours(Number(startHours), Number(startMinutes))
	end.setHours(Number(endHours), Number(endMinutes))

	const options: CalendarOptions = {
		title: 'Fußball',
		location: address,
		description:
			'Das (hoffentlich) wöchentliche Cl-Finale! Spiel und Spass vorprogrammiert. Lets go.',
		start: start,
		end: end,
	}
	const icalendar = new ICalendar(options)
	const googleCalendar = new GoogleCalendar(options)
	const outlookCalendar = new OutlookCalendar(options)

	const googleLink = googleCalendar.render()
	const outlookLink = outlookCalendar.render()

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
					className='w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700/50'
					type='button'
				>
					<CalendarPlus className='w-4 h-4 text-slate-300' />
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Zum Kalender hinzufügen</DialogTitle>
					<DialogDescription>
						Füge das Event einem Kalender deiner Wahl hinzu
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-y-2'>
					<Button
						variant='dark'
						onClick={() => {
							const blob = new Blob([icalendar.render()], {
								type: 'text/calendar',
							})
							saveAs(blob, 'my-calendar-event.ics')
						}}
						aria-label='icalendar'
					>
						ICal Kalendar
					</Button>
					<Button
						variant='dark'
						aria-label='google-calendar'
						onClick={() => {
							window.open(googleLink)
						}}
					>
						Google Kalendar
					</Button>
					<Button
						variant='dark'
						aria-label='outlook-calendar'
						onClick={() => {
							window.open(outlookLink)
						}}
					>
						Outlook Kalendar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
