"use client"

import { cn } from "@/lib/utils/cn"
import { createOrUpdateAvailabilityAction } from "@/src/app/group/[groupId]/availability/actions"
import { Button } from "@/ui/button"
import type { UserAvailability } from "@prisma/client"
import { Clock } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useCallback, useMemo, useState } from "react"
import { reduce } from "remeda"

interface AvailabilityEditorProps {
	date: Date
	isWeekend: boolean
	groupId: string
	availability: UserAvailability | null
}

interface TimeSlot {
	time: string
	displayTime: string
	available: boolean
}

type TimeSlots = TimeSlot[]

interface TimeRange {
	startTime: string
	endTime: string | null
}

const generateTimeSlots = (isWeekend: boolean) => {
	const slots = []
	const startHour = isWeekend ? 10 : 18
	const endHour = 23

	for (let hour = startHour; hour <= endHour; hour++) {
		for (const minute of [0, 30]) {
			const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
			const endHour = minute === 30 ? hour + 1 : hour
			const endMinute = minute === 30 ? "00" : "30"
			const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute}`
			slots.push({
				time: startTime,
				displayTime: `${startTime}-${endTime}`,
				available: false,
			})
		}
	}

	return slots
}

const timeToMinutes = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number)
	return (hours ?? 0) * 60 + (minutes ?? 0)
}

const convertAvailabilityToTimeSlots = (
	availability: UserAvailability | null,
	defaultSlots: TimeSlots,
): TimeSlots => {
	if (!availability) return defaultSlots

	const availableTimeSlots = availability.timeSlots as {
		startTime: string
		endTime: string
	}[]
	return defaultSlots.map((slot) => {
		const slotTime = timeToMinutes(slot.time)
		const isAvailable = availableTimeSlots.some(
			({ startTime, endTime }) =>
				slotTime >= timeToMinutes(startTime) &&
				slotTime < timeToMinutes(endTime),
		)
		return { ...slot, available: isAvailable }
	})
}

export function AvailabilityEditor({
	date,
	isWeekend,
	groupId,
	availability,
}: AvailabilityEditorProps) {
	const timeSlots = useMemo(
		() =>
			convertAvailabilityToTimeSlots(
				availability,
				generateTimeSlots(isWeekend),
			),
		[availability, isWeekend],
	)

	const [isDragging, setIsDragging] = useState(false)
	const { execute: createAvailability } = useAction(
		createOrUpdateAvailabilityAction,
	)

	const saveAvailability = useCallback(
		(newSlots: TimeSlots) => {
			const availableRanges = reduce(
				newSlots,
				(ranges: TimeRange[], slot: TimeSlot, index: number) => {
					if (slot.available) {
						const lastRange = ranges[ranges.length - 1]
						if (ranges.length === 0 || lastRange?.endTime !== null) {
							ranges.push({ startTime: slot.time, endTime: null })
						}
					} else if (ranges.length > 0) {
						const lastRange = ranges[ranges.length - 1]
						if (lastRange && lastRange.endTime === null) {
							lastRange.endTime =
								newSlots[index - 1]?.displayTime.split("-")[1] ?? null
						}
					}
					return ranges
				},
				[],
			)

			const lastRange = availableRanges[availableRanges.length - 1]
			if (lastRange && lastRange.endTime === null) {
				lastRange.endTime =
					newSlots[newSlots.length - 1]?.displayTime.split("-")[1] ?? ""
			}

			createAvailability({
				groupId,
				date,
				timeSlots: availableRanges as { startTime: string; endTime: string }[],
				status: "AVAILABLE",
				type: "one-time",
			})
		},
		[createAvailability, date, groupId],
	)

	const toggleSlotAvailability = useCallback(
		(index: number) => {
			const newSlots = [...timeSlots]
			newSlots[index].available = !newSlots[index].available
			saveAvailability(newSlots)
		},
		[timeSlots, saveAvailability],
	)

	const handleMouseDown = useCallback(
		(index: number) => {
			toggleSlotAvailability(index)
			setIsDragging(true)
		},
		[toggleSlotAvailability],
	)

	const handleMouseEnter = useCallback(
		(index: number) => {
			if (isDragging) toggleSlotAvailability(index)
		},
		[isDragging, toggleSlotAvailability],
	)

	const handleSelectAll = useCallback(() => {
		const allSelected = timeSlots.every((slot) => slot.available)
		const newSlots = timeSlots.map((slot) => ({
			...slot,
			available: !allSelected,
		}))
		saveAvailability(newSlots)
	}, [timeSlots, saveAvailability])

	return (
		<div className="select-none">
			<div className="mb-6 flex flex-col gap-4">
				<div className="flex items-center">
					<Clock className="mr-2 h-5 w-5 text-primary" />
					<h3 className="font-medium">
						{isWeekend
							? "Wochenend-Verfügbarkeit (10:00-23:00)"
							: "Werktags-Verfügbarkeit (18:00-23:00)"}
					</h3>
				</div>

				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<Button
						variant="outline"
						onClick={handleSelectAll}
						className="w-full sm:w-auto"
					>
						{timeSlots.every((slot) => slot.available)
							? "Alle Zeiten abwählen"
							: "Alle Zeiten auswählen"}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
				{timeSlots.map((slot, index) => (
					<div
						key={index}
						className={cn(
							"flex h-12 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors text-center px-1",
							slot.available
								? "border-primary bg-primary text-primary-foreground"
								: "border-input bg-background hover:bg-accent hover:text-accent-foreground",
						)}
						onMouseDown={() => handleMouseDown(index)}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseUp={() => setIsDragging(false)}
					>
						{slot.displayTime}
					</div>
				))}
			</div>

			<div className="mt-4 text-sm text-muted-foreground">
				<p>
					Klicken und ziehen Sie, um mehrere Zeitfenster auf einmal aus- oder
					abzuwählen.
				</p>
			</div>
		</div>
	)
}
