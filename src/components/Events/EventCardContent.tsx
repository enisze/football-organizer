import { cn } from '@/lib/utils/cn'
import { formatter } from '@/src/helpers/formatter'
import type { Event, UserEventStatus } from '@prisma/client'
import { Clock, MapPin, Users } from 'lucide-react'
import { DateInfo } from './DateInfo'
import { StatusChip } from './StatusChip'

interface EventCardContentProps {
	event: Event
	joinedUsersAmount?: number
	currentStatus?: UserEventStatus | null
	hideParticipants?: boolean
	className?: string
}

export function EventCardContent({
	event,
	hideParticipants,
	joinedUsersAmount,
	currentStatus,
	className,
}: EventCardContentProps) {
	return (
		<div
			className={cn(
				'flex w-full bg-slate-800 text-xs rounded-lg overflow-hidden shadow-lg border border-slate-700/30',
				className,
			)}
		>
			<div className='w-[72px] bg-slate-700 flex flex-col items-center justify-center py-4 relative'>
				<DateInfo date={event.date} />
				<div
					className={cn(
						'h-1 w-8 mt-2 rounded-full',
						currentStatus === 'JOINED' && 'bg-green-500',
						currentStatus === 'CANCELED' && 'bg-red-500',
						currentStatus === 'MAYBE' && 'bg-yellow-500',
						(currentStatus === 'AVAILABLE' || !currentStatus) && 'bg-slate-800',
					)}
				/>
			</div>

			<div className='flex-1 p-4 flex flex-col gap-1 justify-between bg-slate-800'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center'>
						<Clock className='w-4 h-4 text-slate-400' />
						<span className='ml-2 text-white font-semibold'>
							{`${event.startTime}-${event.endTime}`}
						</span>
					</div>
					<StatusChip status={event.status} />
				</div>

				<div className='flex items-center'>
					<MapPin className='w-4 h-4 text-slate-400' />
					<span className='ml-2 text-white truncate'>{event.address}</span>
				</div>

				<div className='flex justify-between items-center'>
					<div className='flex items-center'>
						{!hideParticipants && (
							<>
								<Users className='w-4 h-4 text-slate-400' />
								<span className='ml-2 text-white'>
									{joinedUsersAmount !== undefined
										? `${joinedUsersAmount}/${event.maxParticipants}`
										: event.maxParticipants}
								</span>
							</>
						)}
					</div>
					<span className='text-emerald-400 font-semibold'>
						{formatter.format(event.cost / event.maxParticipants)}€
					</span>
				</div>
			</div>
		</div>
	)
}
