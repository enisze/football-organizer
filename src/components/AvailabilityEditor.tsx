"use client"

import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from "@/src/app/group/[groupId]/availability/actions"
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import type { TimeSlot, TimeSlotType } from "@prisma/client"
import { Clock, Plus, X } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useMemo, useState } from "react"

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
			const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
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

	const isWeekend = type === "WEEKEND"
	const timeOptions = useMemo(
		() => generateTimeOptions(isWeekend || type === "DAY_SPECIFIC"),
		[isWeekend, type],
	)

	const handleAddSlot = () => {
		if (!newSlot.startTime || !newSlot.endTime) return

		updateTimeSlot({
			startTime: newSlot.startTime,
			endTime: newSlot.endTime,
			type,
			date: type === "DAY_SPECIFIC" ? date : undefined,
			groupId,
		})

		setNewSlot({})
		setIsAdding(false)
	}

	const renderTimeSlots = () => {
		const slots = []
		for (const slot of timeSlots) {
			slots.push(
				<div
					key={slot.id}
					className="flex items-center justify-between rounded-md border p-3"
				>
					<span>
						{slot.startTime} - {slot.endTime}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => deleteTimeSlot({ id: slot.id })}
						aria-label="Delete time slot"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>,
			)
		}
		return slots
	}

	const renderTimeOptions = () => {
		const options = []
		for (const time of timeOptions) {
			options.push(
				<option key={time} value={time}>
					{time}
				</option>,
			)
		}
		return options
	}

	const renderEndTimeOptions = () => {
		const options = []
		for (const time of timeOptions) {
			if (time > (newSlot.startTime || "")) {
				options.push(
					<option key={time} value={time}>
						{time}
					</option>,
				)
			}
		}
		return options
	}

	const getTimeRangeLabel = () => {
		if (type === "GENERAL") return "Werktags-Verfügbarkeit (18:00-23:00)"
		if (type === "WEEKEND") return "Wochenend-Verfügbarkeit (10:00-23:00)"
		return "Spezifische Verfügbarkeit (10:00-23:00)"
	}

	return (
		<div className="select-none">
			<div className="mb-6 flex flex-col gap-4">
				<div className="flex items-center">
					<Clock className="mr-2 h-5 w-5 text-primary" />
					<h3 className="font-medium">{getTimeRangeLabel()}</h3>
				</div>

				<div className="flex flex-col gap-4">
					{renderTimeSlots()}

					{isAdding ? (
						<div className="flex flex-col gap-4 rounded-md border p-3">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="start-time">Start</Label>
									<select
										id="start-time"
										className="w-full rounded-md border p-2"
										value={newSlot.startTime || ""}
										onChange={(e) =>
											setNewSlot((prev) => ({
												...prev,
												startTime: e.target.value,
											}))
										}
									>
										<option value="">Zeit auswählen</option>
										{renderTimeOptions()}
									</select>
								</div>
								<div>
									<Label htmlFor="end-time">Ende</Label>
									<select
										id="end-time"
										className="w-full rounded-md border p-2"
										value={newSlot.endTime || ""}
										onChange={(e) =>
											setNewSlot((prev) => ({
												...prev,
												endTime: e.target.value,
											}))
										}
										aria-label="Endzeit"
									>
										<option value="">Zeit auswählen</option>
										{renderEndTimeOptions()}
									</select>
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button
									type="button"
									variant="ghost"
									onClick={() => {
										setNewSlot({})
										setIsAdding(false)
									}}
									aria-label="Zeitfenster hinzufügen abbrechen"
								>
									Abbrechen
								</Button>
								<Button
									type="button"
									onClick={handleAddSlot}
									disabled={!newSlot.startTime || !newSlot.endTime}
									aria-label="Zeitfenster speichern"
								>
									Speichern
								</Button>
							</div>
						</div>
					) : (
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsAdding(true)}
							className="flex items-center"
							aria-label="Neues Zeitfenster hinzufügen"
						>
							<Plus className="mr-2 h-4 w-4" />
							Neues Zeitfenster
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
