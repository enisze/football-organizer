'use client'

import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import type { TimeSlot, TimeSlotType } from '@prisma/client'
import { Plus, X } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useMemo, useState } from 'react'

interface AvailabilityEditorProps {
	date?: Date
	day?: number
	timeSlots: TimeSlot[]
	groupId: string
	type: TimeSlotType
}

interface TimeRange {
	startTime: string
	endTime: string
}

const generateTimeOptions = (isWeekend: boolean) => {
	const slots = []
	const startHour = isWeekend ? 10 : 18
	const endHour = 23

	for (let hour = startHour; hour <= endHour; hour++) {
		for (const minute of [0, 30]) {
			const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
			slots.push(time)
		}
	}

	return slots
}

export function AvailabilityEditor({
	date,
	day,
	type,
	timeSlots,
	groupId,
}: AvailabilityEditorProps) {
	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)
	const [isAdding, setIsAdding] = useState(false)
	const [newSlot, setNewSlot] = useState<Partial<TimeRange>>({})

	const isWeekend =
		type === 'WEEKEND' || (type === 'DAY_SPECIFIC' && (day === 6 || day === 0))
	const timeOptions = useMemo(
		() =>
			generateTimeOptions(
				isWeekend || type === 'DAY_SPECIFIC' || type === 'DATE_SPECIFIC',
			),
		[isWeekend, type],
	)

	const handleAddSlot = () => {
		if (!newSlot.startTime || !newSlot.endTime) return

		updateTimeSlot({
			startTime: newSlot.startTime,
			endTime: newSlot.endTime,
			type,
			date: type === 'DATE_SPECIFIC' ? date : undefined,
			day: type === 'DAY_SPECIFIC' ? day : undefined,
			groupId,
		})

		setNewSlot({})
		setIsAdding(false)
	}

	return (
		<div className='select-none space-y-3'>
			<div className='space-y-2'>
				{timeSlots.map((slot) => (
					<div
						key={slot.id}
						className='flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl'
					>
						<span className='text-sm sm:text-base'>
							{slot.startTime} - {slot.endTime}
						</span>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => deleteTimeSlot({ id: slot.id })}
							className='p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors'
							aria-label='Delete time slot'
						>
							<X className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/70' />
						</Button>
					</div>
				))}

				{isAdding ? (
					<div className='space-y-3 sm:space-y-4 bg-white/5 rounded-xl p-3 sm:p-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
							<div className='space-y-1.5 sm:space-y-2'>
								<Label className='text-sm text-white/70'>Start</Label>
								<Select
									value={newSlot.startTime || ''}
									onValueChange={(value) =>
										setNewSlot((prev) => ({
											...prev,
											startTime: value,
										}))
									}
								>
									<SelectTrigger className='bg-white/5 border-white/10 text-sm h-9 sm:h-10'>
										<SelectValue placeholder='Zeit auswählen' />
									</SelectTrigger>
									<SelectContent className='overflow-y-auto max-h-[40vh]'>
										{timeOptions.map((time) => (
											<SelectItem key={time} value={time} className='text-sm'>
												{time}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-1.5 sm:space-y-2'>
								<Label className='text-sm text-white/70'>Ende</Label>
								<Select
									value={newSlot.endTime || ''}
									onValueChange={(value) =>
										setNewSlot((prev) => ({
											...prev,
											endTime: value,
										}))
									}
									disabled={!newSlot.startTime}
								>
									<SelectTrigger className='bg-white/5 border-white/10 text-sm h-9 sm:h-10'>
										<SelectValue placeholder='Zeit auswählen' />
									</SelectTrigger>
									<SelectContent className='overflow-y-auto max-h-[40vh]'>
										{timeOptions
											.filter((time) => time > (newSlot.startTime || ''))
											.map((time) => (
												<SelectItem key={time} value={time} className='text-sm'>
													{time}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className='flex justify-end gap-2'>
							<Button
								variant='ghost'
								onClick={() => {
									setNewSlot({})
									setIsAdding(false)
								}}
								className='text-sm text-white/70 hover:bg-white/10 px-3 h-9'
							>
								Abbrechen
							</Button>
							<Button
								onClick={handleAddSlot}
								disabled={!newSlot.startTime || !newSlot.endTime}
								variant='purple'
								className='text-sm px-3 h-9'
							>
								Speichern
							</Button>
						</div>
					</div>
				) : (
					<Button
						variant='purple'
						onClick={() => setIsAdding(true)}
						className='w-full sm:w-auto text-sm h-9 sm:h-10'
					>
						<Plus className='h-4 w-4 mr-1.5' />
						<span>Neues Zeitfenster</span>
					</Button>
				)}
			</div>
		</div>
	)
}
