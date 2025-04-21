import { Button } from '@/ui/button'
import { Card, CardContent } from '@/ui/card'
import type { Event } from '@prisma/client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { MapAccordion } from '../Map/MapAccordion'
import { PaymentArea } from '../PaymentArea'
import { AddToCalendarButton } from './Buttons/AddToCalendarButton'
import { EventStatusArea } from './Buttons/EventStatusArea'
import { DateInfo } from './DateInfo'
import { ParticipantsAreaServer } from './ParticipantsAreaServer'
import { StatusChip } from './StatusChip'

interface EventDetailsProps {
	event: Event
	location?: number[]
}

export function EventDetailsCard({ event, location }: EventDetailsProps) {
	return (
		<Card className="bg-white/5 backdrop-blur-sm border-white/10">
			<CardContent className="p-6">
				<div className="flex items-center gap-4 mb-6">
					<Link href="/events">
						<Button variant="ghost" size="icon">
							<ChevronLeft className="h-6 w-6" />
						</Button>
					</Link>
					<h1 className="text-xl font-semibold">{event.address}</h1>
				</div>

				<div className="flex gap-6 mb-6">
					<div className="bg-slate-800 rounded-xl p-3 shadow-inner border border-slate-700/50">
						<DateInfo date={event.date} />
					</div>

					<div className="flex-1">
						<div className="flex items-center justify-between">
							<StatusChip status={event.status} />
							<AddToCalendarButton
								address={event.address}
								date={event.date}
								startTime={event.startTime}
								endTime={event.endTime}
							/>
						</div>
						<span className="text-green-500 font-medium mt-2 block">
							€{event.cost}
						</span>
					</div>
				</div>

				{location && (
					<div className="mb-6 bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
						<MapAccordion address={event.address} coordinates={location} />
					</div>
				)}

				<div className="space-y-4">
					<div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/30">
						<ParticipantsAreaServer
							eventId={event.id}
							maxParticipants={event.maxParticipants}
						/>
					</div>

					<EventStatusArea id={event.id} />

					{event.bookingDate && (
						<PaymentArea eventId={event.id} bookingDate={event.bookingDate} />
					)}
				</div>
			</CardContent>
		</Card>
	)
}
