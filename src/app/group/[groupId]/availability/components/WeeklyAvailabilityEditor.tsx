'use client'

import { cn } from '@/lib/utils/cn'
import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { TimeSlotCreator } from '@/src/app/group/[groupId]/availability/components/TimeSlotCreator'
import { Button } from '@/ui/button'
import { CardDescription, CardTitle } from '@/ui/card'
import type { TimeSlot } from '@prisma/client'
import { useTour } from '@reactour/tour'
import { Clock, Plus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface WeeklyAvailabilityEditorProps {
	timeSlots: Record<number, TimeSlot[]>
	groupId: string
}

const days = [
	{ id: '1', name: 'Mo', fullName: 'Montag' },
	{ id: '2', name: 'Di', fullName: 'Dienstag' },
	{ id: '3', name: 'Mi', fullName: 'Mittwoch' },
	{ id: '4', name: 'Do', fullName: 'Donnerstag' },
	{ id: '5', name: 'Fr', fullName: 'Freitag' },
	{ id: '6', name: 'Sa', fullName: 'Samstag' },
	{ id: '0', name: 'So', fullName: 'Sonntag' },
]

const timeLabels = ['08', '10', '12', '14', '16', '18', '20', '22', '24']

export function WeeklyAvailabilityEditor({
	timeSlots,
	groupId,
}: WeeklyAvailabilityEditorProps) {
	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)
	const [isCreatingSlot, setIsCreatingSlot] = useState(false)
	const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null)
	const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined)

	const { setCurrentStep } = useTour()

	const timeToPosition = (time: string): number => {
		const [hoursStr, minutesStr] = time.split(':') || ['0', '0']
		const hours = Number.parseInt(hoursStr || '0', 10)
		const minutes = Number.parseInt(minutesStr || '0', 10)
		const totalMinutes = hours * 60 + minutes
		const minutesSince8 = totalMinutes - 8 * 60
		const totalRangeMinutes = 16 * 60
		return (minutesSince8 / totalRangeMinutes) * 100
	}

	const calculateSlotStyle = (start: string, end: string) => {
		const startPos = timeToPosition(start)
		const endPos = timeToPosition(end)
		const width = endPos - startPos
		return {
			left: `${startPos}%`,
			width: `${width}%`,
		}
	}

	const handleSlotSave = async (slot: {
		id?: string
		start: string
		end: string
		days: string[]
		isGlobalSlot: boolean
	}) => {
		for (const dayId of slot.days) {
			updateTimeSlot({
				id: slot.id ?? '',
				startTime: slot.start,
				endTime: slot.end,
				type: 'DAY_SPECIFIC',
				day: Number.parseInt(dayId, 10),
				groupId,
				isException: false,
				isGlobalSlot: slot.isGlobalSlot,
			})
		}
		setIsCreatingSlot(false)
		setEditingSlot(null)
	}

	return (
		<div data-tour='timelsots' className='px-4 flex flex-col gap-2'>
			<CardTitle className='flex text-lg items-center gap-2'>
				<Clock className='h-6 w-6' />
				<span className=''>Wöchentliche Verfügbarkeit</span>
			</CardTitle>
			<CardDescription className='text-slate-400'>
				Verwalte deine regelmäßigen Verfügbarkeitszeiten für jede Woche.
			</CardDescription>
			<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden'>
				<div className='relative'>
					<div className='flex border-b border-white/20 px-4 py-2'>
						<div className='w-10 flex-shrink-0' />
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

					{days.map((day) => {
						const daySlots = timeSlots[Number.parseInt(day.id, 10)] || []
						return (
							<div
								key={day.id}
								className={cn(
									'flex border-b border-white/20 px-4 py-1 relative group cursor-pointer hover:bg-white/5 transition-colors',
									day.id === '0' && 'border-none',
								)}
								onClick={() => {
									setSelectedDay(Number.parseInt(day.id, 10))

									setIsCreatingSlot(true)
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										setSelectedDay(Number.parseInt(day.id, 10))

										setIsCreatingSlot(true)
									}
								}}
							>
								<div className='w-10 flex-shrink-0 font-medium flex items-center'>
									<span className='text-slate-300'>{day.name}</span>
								</div>

								<div className='flex-1 relative h-8'>
									<div className='absolute inset-0 flex pointer-events-none'>
										{timeLabels.map((time, index) => (
											<div
												key={time}
												className={cn(
													'flex-1 h-full',
													index > 0 && 'border-l border-white/20',
												)}
											/>
										))}
									</div>

									{daySlots.map((slot) => {
										const style = calculateSlotStyle(
											slot.startTime,
											slot.endTime,
										)
										return (
											<div
												key={slot.id}
												className={cn(
													'absolute cursor-pointer top-1 h-6 gap-2 bg-green-300 rounded-md',
												)}
												style={style}
												onClick={() => {
													setEditingSlot(slot)
													setIsCreatingSlot(true)
												}}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														setEditingSlot(slot)
														setIsCreatingSlot(true)
													}
												}}
											/>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{isCreatingSlot && (
				<TimeSlotCreator
					days={days}
					selectedDay={selectedDay}
					initialData={
						editingSlot
							? {
									id: editingSlot.id,
									start: editingSlot.startTime,
									end: editingSlot.endTime,
									days: [editingSlot.day?.toString() ?? ''],
									isGlobalSlot: true,
								}
							: undefined
					}
					onSaveAction={handleSlotSave}
					onCancelAction={() => {
						setIsCreatingSlot(false)
						setEditingSlot(null)
					}}
					onDeleteAction={() => {
						setIsCreatingSlot(false)
						setEditingSlot(null)
						deleteTimeSlot({ id: editingSlot?.id ?? '' })
					}}
				/>
			)}

			<Button
				variant='purple'
				onClick={() => {
					setIsCreatingSlot(true)
					setCurrentStep((prev) => prev + 1)
				}}
				data-tour='create-time-slot'
			>
				<Plus className='w-4 h-4 mr-2' />
				Neues Zeitfenster erstellen
			</Button>
		</div>
	)
}
