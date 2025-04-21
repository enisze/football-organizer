import { formatter } from '@/src/helpers/formatter'
import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
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
import { StatusChip } from './StatusChip'

type EventCardProps = {
	event: Event
	location: number[] | undefined
}

//TODO: Adjust schema event thingy -> Warteliste status?
//TODO: Show Warteliste, if we have participants which are on the waiting list too?

export const EventCard = async ({ event, location }: EventCardProps) => {
	const isOwner = await isOwnerOfGroup(event.groupId)
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

				<div className="flex relative justify-between items-start p-6">
					<div className="flex items-center">
						<div className="bg-slate-800 rounded-xl p-3 shadow-inner border border-slate-700/50">
							<DateInfo date={date} />
						</div>

						<div className="flex flex-col px-2">
							<StatusChip status={status} />
							<div className="flex items-center gap-1.5 text-slate-300 font-medium">
								<CalendarDays className="w-4 h-4 text-blue-400" />
								<span className="font-bold">{`${startTime}-${endTime}`}</span>
							</div>
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

					<div className="text-emerald-400 absolute bottom-4 right-6 font-bold">{`€${formatter.format(cost / maxParticipants)}`}</div>
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
					<EventStatusArea id={id} />
				</div>

				<PaymentArea eventId={id} bookingDate={bookingDate} />

				{isOwner && (
					<div className="p-6 pt-4 bg-slate-900/50">
						<EventCardAdminArea eventId={id} />
					</div>
				)}
			</div>
		</div>
	)
}
