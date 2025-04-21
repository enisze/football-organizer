import type { Event } from '@prisma/client'
import { MapAccordion } from '../Map/MapAccordion'
import { PaymentArea } from '../PaymentArea'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { EventCardContent } from './EventCardContent'
import { ParticipantsAreaServer } from './ParticipantsAreaServer'

interface EventDetailsProps {
	event: Event
	location?: number[]
}

export function EventDetailsCard({ event, location }: EventDetailsProps) {
	return (
		<div className="p-4">
			<EventCardContent event={event} className="mb-6" hideParticipants />

			<div className="pb-4">
				<EventStatusArea id={event.id} />
			</div>

			{location && (
				<div className="mb-4 bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
					<MapAccordion address={event.address} coordinates={location} />
				</div>
			)}

			<div className="space-y-2">
				<div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
					<ParticipantsAreaServer
						eventId={event.id}
						maxParticipants={event.maxParticipants}
					/>
				</div>

				{event.bookingDate && (
					<PaymentArea eventId={event.id} bookingDate={event.bookingDate} />
				)}
			</div>
		</div>
	)
}
