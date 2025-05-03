'use client'

import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { TimeSlotCreator } from '@/src/components/TimeSlotCreator'
import { Button } from '@/ui/button'
import type { TimeSlot } from '@prisma/client'
import { Clock, Plus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface WeeklyAvailabilityEditorProps {
	timeSlots: Record<number, TimeSlot[]>
	groupId: string
}

const days = [
	{ id: '0', name: 'So', fullName: 'Sonntag' },
	{ id: '1', name: 'Mo', fullName: 'Montag' },
	{ id: '2', name: 'Di', fullName: 'Dienstag' },
	{ id: '3', name: 'Mi', fullName: 'Mittwoch' },
	{ id: '4', name: 'Do', fullName: 'Donnerstag' },
	{ id: '5', name: 'Fr', fullName: 'Freitag' },
	{ id: '6', name: 'Sa', fullName: 'Samstag' },
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
		start: string
		end: string
		days: string[]
	}) => {
		for (const dayId of slot.days) {
			updateTimeSlot({
				startTime: slot.start,
				endTime: slot.end,
				type: 'DAY_SPECIFIC',
				day: Number.parseInt(dayId, 10),
				groupId,
			})
		}
		setIsCreatingSlot(false)
		setEditingSlot(null)
	}

	return (
		<div className='flex flex-col gap-4'>
			<Button
				variant='outline'
				className='bg-indigo-600 hover:bg-indigo-700 text-white border-none'
				onClick={() => setIsCreatingSlot(true)}
			>
				<Plus className='w-4 h-4 mr-2' />
				Neues Zeitfenster erstellen
			</Button>

			<div className='bg-white/5 backdrop-blur-sm border-white/10 rounded-lg overflow-hidden '>
				<div className='p-4 border-b flex items-center justify-between'>
					<Clock className='w-5 h-5 text-slate-400' />
					<h2 className='font-medium text-slate-200'>
						Wochenübersicht (8:00 - 24:00)
					</h2>
				</div>

				<div className='relative'>
					<div className='flex border-b border-slate-800 px-4 py-2'>
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
								className='flex border-b border-white/20 px-4 py-1 relative'
							>
								<div className='w-10 flex-shrink-0 font-medium flex items-center'>
									<span className='text-slate-300'>{day.name}</span>
								</div>

								<div className='flex-1 relative h-12'>
									<div className='absolute inset-0 flex pointer-events-none'>
										{timeLabels.map((time, index) => (
											<div
												key={time}
												className={`flex-1 ${index > 0 ? 'border-l border-white/20' : ''} h-full`}
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
												className='absolute cursor-pointer top-1 h-10 gap-2 bg-green-300 rounded-md'
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
					initialData={
						editingSlot
							? {
									start: editingSlot.startTime,
									end: editingSlot.endTime,
									days: [editingSlot.day?.toString() ?? ''],
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
		</div>
	)
}
