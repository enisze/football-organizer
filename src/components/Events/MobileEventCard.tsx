import { prisma } from '@/src/server/db/client'
import { Drawer, DrawerContent, DrawerTrigger } from '@/ui/drawer'
import type { Event } from '@prisma/client'
import { EventCardContent } from './EventCardContent'
import { EventDetailsCard } from './EventDetailsCard'

interface EventCardProps {
	event: Event
	location?: number[]
	userId: string
}

export async function MobileEventCard({
	event,
	location,
	userId,
}: EventCardProps) {
	const participants = await prisma.participantsOnEvents.findMany({
		where: {
			eventId: event.id,
			userEventStatus: 'JOINED',
		},
	})

	const joinedUsersAmount = participants.length

	const currentStatus = await prisma.participantsOnEvents.findFirst({
		where: {
			eventId: event.id,
			user: {
				id: userId,
			},
		},
		select: {
			userEventStatus: true,
		},
	})

	return (
		<div className="mb-3 animate-in fade-in duration-500">
			<Drawer>
				<DrawerTrigger asChild>
					<button className="w-full group" type="button">
						<div className="w-[320px] transition-all group-hover:opacity-90 group-hover:scale-[0.98] group-active:scale-[0.96]">
							<EventCardContent
								event={event}
								joinedUsersAmount={joinedUsersAmount}
								currentStatus={currentStatus?.userEventStatus}
							/>
						</div>
					</button>
				</DrawerTrigger>
				<DrawerContent>
					<EventDetailsCard event={event} location={location} />
				</DrawerContent>
			</Drawer>
		</div>
	)
}
