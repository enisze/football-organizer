import { cn } from '@/lib/utils/cn'
import type { ProcessedTimeSlot } from '../app/group/[groupId]/availability/processAvailability'

interface TimelineProps {
	slots: ProcessedTimeSlot[]
	maxUsers: number
	onSlotClick: (slot: ProcessedTimeSlot) => void
}

export function TimelineView({ slots, maxUsers, onSlotClick }: TimelineProps) {
	// Early return with no slots message
	if (slots.length === 0) {
		return (
			<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-4 mt-4'>
				<p className='text-white/50 text-xs md:text-sm'>
					Keine Zeitfenster verfügbar
				</p>
			</div>
		)
	}

	// Find the earliest and latest times from the slots
	const timeRange = slots.reduce(
		(acc, slot) => {
			const [startHr = '0'] = slot.startTime.split(':')
			const [endHr = '0'] = slot.endTime.split(':')
			const startHour = Number.parseInt(startHr, 10)
			const endHour = Number.parseInt(endHr, 10)
			return {
				earliest: Math.min(acc.earliest, startHour),
				latest: Math.max(acc.latest, endHour),
			}
		},
		{ earliest: 24, latest: 0 },
	)

	// Since we know we have slots, we can use the actual range
	const start = timeRange.earliest
	const end = timeRange.latest

	const timeLabels = Array.from({ length: end - start + 1 }, (_, i) =>
		String(start + i).padStart(2, '0'),
	)

	const timeToPosition = (time: string): number => {
		const [hoursStr, minutesStr] = time.split(':')
		const hours = Number.parseInt(hoursStr || '0', 10)
		const minutes = Number.parseInt(minutesStr || '0', 10)
		const totalMinutes = hours * 60 + minutes
		const minutesSince = totalMinutes - start * 60
		const totalRangeMinutes = (end - start) * 60
		return (minutesSince / totalRangeMinutes) * 100
	}

	return (
		<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden mt-4'>
			<div className='relative'>
				<div className='flex border-b border-white/20 px-4 py-2'>
					<div className='w-5 flex-shrink-0' />
					<div className='flex-1 flex'>
						{timeLabels.map((time) => (
							<div
								key={time}
								className='flex-1 text-xs text-white/80 text-center'
							>
								{time}
							</div>
						))}
					</div>
				</div>

				{slots.map((slot, index) => {
					const startPos = timeToPosition(slot.startTime)
					const endPos = timeToPosition(slot.endTime)
					const width = endPos - startPos
					const availableCount = slot.availableUsers.length
					const percentage = (availableCount / maxUsers) * 100

					return (
						<div
							key={index}
							className='flex border-b border-white/20 px-2 py-1 relative'
						>
							<div className='w-6 flex-shrink-0 font-medium flex items-center border-r border-white/20'>
								<span className='text-slate-300 text-xs'>
									{availableCount}/{maxUsers}
								</span>
							</div>

							<div className='flex-1 relative h-8'>
								<div className='absolute inset-0 flex pointer-events-none'>
									{timeLabels.map((_, i) => (
										<div
											key={i}
											className={cn(
												'flex-1 h-full',
												i > 0 && 'border-l border-white/20',
											)}
										/>
									))}
								</div>

								<button
									className={cn(
										'absolute cursor-pointer top-1 h-6 flex items-center justify-center px-2 rounded-md transition-colors',
										percentage < 50
											? 'bg-red-500/30'
											: percentage < 75
												? 'bg-orange-500/30'
												: 'bg-emerald-500/30',
									)}
									style={{
										left: `${startPos}%`,
										width: `${width}%`,
									}}
									onClick={() => onSlotClick(slot)}
									type='button'
								/>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
