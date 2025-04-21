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
	type: TimeSlotType
	timeSlots: TimeSlot[]
	groupId: string
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
	type,
	timeSlots,
	groupId,
}: AvailabilityEditorProps) {
	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)
	const [isAdding, setIsAdding] = useState(false)
	const [newSlot, setNewSlot] = useState<Partial<TimeRange>>({})

	const isWeekend = type === 'WEEKEND'
	const timeOptions = useMemo(
		() => generateTimeOptions(isWeekend || type === 'DAY_SPECIFIC'),
		[isWeekend, type],
	)

	const handleAddSlot = () => {
		if (!newSlot.startTime || !newSlot.endTime) return

		updateTimeSlot({
			startTime: newSlot.startTime,
			endTime: newSlot.endTime,
			type,
			date: type === 'DAY_SPECIFIC' ? date : undefined,
			groupId,
		})

		setNewSlot({})
		setIsAdding(false)
	}

	return (
		<div className="select-none space-y-4">
			<div className="space-y-3">
				{timeSlots.map((slot) => (
					<div
						key={slot.id}
						className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
					>
						<span>
							{slot.startTime} - {slot.endTime}
						</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => deleteTimeSlot({ id: slot.id })}
							className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
							aria-label="Delete time slot"
						>
							<X className="h-4 w-4 text-white/70" />
						</Button>
					</div>
				))}

				{isAdding ? (
					<div className="space-y-4 bg-white/5 rounded-xl p-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-white/70">Start</Label>
								<Select
									value={newSlot.startTime || ''}
									onValueChange={(value) =>
										setNewSlot((prev) => ({
											...prev,
											startTime: value,
										}))
									}
								>
									<SelectTrigger className="bg-white/5 border-white/10">
										<SelectValue placeholder="Zeit auswählen" />
									</SelectTrigger>
									<SelectContent>
										{timeOptions.map((time) => (
											<SelectItem key={time} value={time}>
												{time}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label className="text-white/70">Ende</Label>
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
									<SelectTrigger className="bg-white/5 border-white/10">
										<SelectValue placeholder="Zeit auswählen" />
									</SelectTrigger>
									<SelectContent>
										{timeOptions
											.filter((time) => time > (newSlot.startTime || ''))
											.map((time) => (
												<SelectItem key={time} value={time}>
													{time}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="flex justify-end gap-2">
							<Button
								variant="ghost"
								onClick={() => {
									setNewSlot({})
									setIsAdding(false)
								}}
								className="text-white/70 hover:bg-white/10"
							>
								Abbrechen
							</Button>
							<Button
								onClick={handleAddSlot}
								disabled={!newSlot.startTime || !newSlot.endTime}
								className="bg-white/10 hover:bg-white/20"
							>
								Speichern
							</Button>
						</div>
					</div>
				) : (
					<Button
						variant="outline"
						onClick={() => setIsAdding(true)}
						className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center gap-2 border-white/10"
					>
						<Plus className="h-5 w-5" />
						<span>Neues Zeitfenster</span>
					</Button>
				)}
			</div>
		</div>
	)
}
