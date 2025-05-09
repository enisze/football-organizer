import { cn } from '@/lib/utils/cn'
import type { TimeSlot } from '@prisma/client'
import type { ProcessedTimeSlot } from '../app/group/[groupId]/availability/processAvailability'

interface TimelineProps {
	slots: (ProcessedTimeSlot | TimeSlot)[]
	maxUsers?: number
	onSlotClick: (slot: ProcessedTimeSlot | TimeSlot) => void
	singleLine?: boolean
}

export function TimelineView({
	slots,
	maxUsers = 1,
	onSlotClick,
	singleLine = false,
}: TimelineProps) {
	if (slots.length === 0) {
		return (
			<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-4'>
				<p className='text-white/50 text-xs md:text-sm'>
					Keine Zeitfenster verfügbar
				</p>
			</div>
		)
	}

	// Find the earliest and latest times from the slots
	const timeRange = slots.reduce(
		(acc, slot) => {
			const [startHr = '0', startMin = '0'] = slot.startTime.split(':')
			const [endHr = '0', endMin = '0'] = slot.endTime.split(':')
			const startHour =
				Number.parseInt(startHr, 10) + Number.parseInt(startMin, 10) / 60
			const endHour =
				Number.parseInt(endHr, 10) + Number.parseInt(endMin, 10) / 60
			return {
				earliest: Math.min(acc.earliest, startHour),
				latest: Math.max(acc.latest, endHour),
			}
		},
		{ earliest: 24, latest: 0 },
	)

	const slotLength = slots.length
	const start = Math.floor(timeRange.earliest)
	const end = Math.ceil(timeRange.latest)

	const timeLabels: string[] = []
	for (let i = start; i <= end; i++) {
		timeLabels.push(String(i).padStart(2, '0'))
	}

	const timeToPosition = (time: string): number => {
		const [hoursStr, minutesStr = '0'] = time.split(':')
		if (!hoursStr) return 0
		const totalMinutes =
			Number.parseInt(hoursStr, 10) * 60 + Number.parseInt(minutesStr, 10)
		const startMinutes = start * 60
		const totalRangeMinutes = (end - start) * 60
		// Add small adjustment for better 30-minute positioning
		return ((totalMinutes - startMinutes) / totalRangeMinutes) * 100
	}

	const renderSlot = (slot: ProcessedTimeSlot | TimeSlot, index: number) => {
		const startPos = timeToPosition(slot.startTime)
		const endPos = timeToPosition(slot.endTime)
		const width = endPos - startPos

		let color = 'bg-green-300 hover:bg-green-300'
		if ('availableUsers' in slot) {
			const availableCount = slot.availableUsers.length
			const percentage = (availableCount / maxUsers) * 100
			color =
				percentage < 50
					? 'bg-red-400 hover:bg-red-400'
					: percentage < 75
						? 'bg-orange-400 hover:bg-orange-400'
						: 'bg-green-300 hover:bg-green-300'
		}

		return (
			<button
				key={index}
				className={cn(
					'absolute cursor-pointer top-1 h-6 flex items-center justify-center px-2 rounded-md transition-colors',
					color,
				)}
				style={{
					left: `${startPos}%`,
					width: `${width}%`,
				}}
				onClick={() => onSlotClick(slot)}
				type='button'
			/>
		)
	}

	return (
		<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden'>
			<div className='relative'>
				<div className='flex border-b border-white/20 px-4 py-2'>
					{!singleLine && <div className='w-5 flex-shrink-0' />}
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

				{singleLine ? (
					<div className='flex px-2 py-1 relative'>
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
							{slots.map((slot, index) => renderSlot(slot, index))}
						</div>
					</div>
				) : (
					slots.map((slot, index) => {
						const availableCount =
							'availableUsers' in slot ? slot.availableUsers.length : 1
						return (
							<div
								key={index}
								className={cn(
									'flex border-b border-white/20 px-2 py-1 relative',
									index === slotLength - 1 && 'border-b-0',
								)}
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
									{renderSlot(slot, index)}
								</div>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
