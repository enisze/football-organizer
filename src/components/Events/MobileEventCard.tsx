import { cn } from '@/lib/utils/cn'
import { formatter } from '@/src/helpers/formatter'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { Drawer, DrawerContent, DrawerTrigger } from '@/ui/drawer'
import type { Event } from '@prisma/client'
import { Clock, MapPin, Users } from 'lucide-react'
import { DateInfo } from './DateInfo'
import { EventDetailsCard } from './EventDetailsCard'
import { StatusChip } from './StatusChip'

interface EventCardProps {
	event: Event
	location?: number[]
}

export async function MobileEventCard({ event, location }: EventCardProps) {
	const participants = await prisma.participantsOnEvents.findMany({
		where: {
			eventId: event.id,
			userEventStatus: 'JOINED',
		},
	})

	const joinedUsersAmount = participants.length

	const session = await serverAuth()

	const userId = session?.user.id

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
						<div className="flex w-[320px] bg-slate-800 text-xs rounded-lg overflow-hidden shadow-lg border border-slate-700/30 transition-all group-hover:opacity-90 group-hover:scale-[0.98] group-active:scale-[0.96]">
							<div className="w-[72px] bg-slate-700 flex flex-col items-center justify-center py-4 relative">
								<DateInfo date={event.date} />
								<div
									className={cn(
										'h-1 w-8 mt-2 rounded-full',
										currentStatus?.userEventStatus === 'JOINED' &&
											'bg-green-500',
										currentStatus?.userEventStatus === 'CANCELED' &&
											'bg-red-500',
										currentStatus?.userEventStatus === 'MAYBE' &&
											'bg-yellow-500',
										(currentStatus?.userEventStatus === 'AVAILABLE' ||
											!currentStatus?.userEventStatus) &&
											'bg-slate-800',
									)}
								/>
							</div>

							<div className="flex-1 p-4 flex flex-col gap-1 justify-between bg-slate-800">
								<div className="flex justify-between items-center">
									<div className="flex items-center">
										<Clock className="w-4 h-4 text-slate-400" />
										<span className="ml-2 text-white font-semibold">
											{`${event.startTime}-${event.endTime}`}
										</span>
									</div>
									<StatusChip status={event.status} />
								</div>

								<div className="flex items-center">
									<MapPin className="w-4 h-4 text-slate-400" />
									<span className="ml-2 text-white truncate">
										{event.address}
									</span>
								</div>

								<div className="flex justify-between items-center">
									<div className="flex items-center">
										<Users className="w-4 h-4 text-slate-400" />
										<span className="ml-2 text-white">
											{joinedUsersAmount}/{event.maxParticipants}
										</span>
									</div>
									<span className="text-emerald-400 font-semibold">
										{formatter.format(event.cost / event.maxParticipants)}€
									</span>
								</div>
							</div>
						</div>
					</button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="p-4">
						<EventDetailsCard event={event} location={location} />
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	)
}
