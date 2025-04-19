import { formatter } from '@/src/helpers/formatter'
import type { Event } from '@prisma/client'
import { differenceInCalendarDays } from 'date-fns'
import { CalendarDays } from 'lucide-react'
import { MapAccordion } from '../Map/MapAccordion'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { DateInfo } from './DateInfo'
import { EnvironmentInfo } from './EnvironmentInfo'
import { EventCardAdminArea } from './EventCardAdminArea'
import { ParticipantsAreaServer } from './ParticipantsAreaServer'

type EventCardProps = {
	event: Event
	location: number[] | undefined
}

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

export const EventCard = async ({ event, location }: EventCardProps) => {
	const {
		address,
		startTime,
		cost,
		endTime,
		date,
		id,
		status,
		maxParticipants,
		bookingDate,
		environment,
	} = event

	const currentDate = new Date()
	const days = differenceInCalendarDays(date, currentDate)

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-700/30">
				<div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600" />

				<div className="p-6">
					<div className="flex justify-between items-start">
						<div className="flex items-center gap-4">
							<div className="bg-slate-800 rounded-xl p-3 shadow-inner border border-slate-700/50">
								<DateInfo date={date} />
							</div>
							<div className="flex flex-col">
								<div className="flex items-center gap-1.5 text-slate-300 font-medium">
									<CalendarDays className="w-4 h-4 text-blue-400" />
									<span>{`${startTime}-${endTime}`}</span>
								</div>
								<div className="mt-1 text-emerald-400 font-medium">{`€${formatter.format(cost / maxParticipants)}`}</div>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/50">
								<EnvironmentInfo environment={environment} />
							</div>
							<AddToCalendarButton
								address={address}
								date={date}
								startTime={startTime}
								endTime={endTime}
							/>
						</div>
					</div>
				</div>

				<div className="px-6 pb-4 space-y-2">
					{location && (
						<div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
							<MapAccordion address={address} coordinates={location} />
						</div>
					)}

					<div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
						<ParticipantsAreaServer
							eventId={id}
							maxParticipants={maxParticipants}
						/>
					</div>
				</div>

				<div className="px-6 pb-4">
					<div className="text-center text-xs font-mono text-slate-500 bg-slate-800/50 py-2 px-3 rounded-lg overflow-x-auto">
						Id: {id}
					</div>
				</div>

				<div className="px-6 pb-4">
					<EventStatusArea id={id} />
				</div>

				<div className="p-6 pt-2 space-y-3 bg-slate-900/50">
					<EventCardAdminArea eventId={id} />
					<PaymentArea eventId={id} bookingDate={bookingDate} />
				</div>
			</div>
		</div>
	)
}
