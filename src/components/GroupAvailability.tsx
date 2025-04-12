"use client"

import { cn } from "@/lib/utils/cn"
import { Card, CardContent } from "@/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import type { TimeSlot, User } from "@prisma/client"
import { Clock } from "lucide-react"
import { useMemo, useState } from "react"

interface GroupAvailabilityViewProps {
	date: Date
	users: User[]
	daySpecificSlots: (TimeSlot & { user: User })[]
	regularSlots: (TimeSlot & { user: User })[]
}

type TimeSlotDuration = "60min" | "90min" | "120min"

type ProcessedTimeSlot = {
	startTime: string
	endTime: string
	availableUsers: User[]
}

export function GroupAvailabilityView({
	date,
	users,
	daySpecificSlots,
	regularSlots,
}: GroupAvailabilityViewProps) {
	const [duration, setDuration] = useState<TimeSlotDuration>("60min")
	const isWeekend = date.getDay() === 0 || date.getDay() === 6

	const processAvailabilities = useMemo(() => {
		// First merge day-specific slots with regular slots
		const allSlots = [...daySpecificSlots]

		// Only add regular slots if there are no day-specific slots for this user
		for (const slot of regularSlots) {
			const userHasDaySpecific = daySpecificSlots.some(
				(daySlot) => daySlot.user.id === slot.user.id,
			)
			if (
				!userHasDaySpecific &&
				((isWeekend && slot.type === "WEEKEND") ||
					(!isWeekend && slot.type === "GENERAL"))
			) {
				allSlots.push(slot)
			}
		}

		// Create time slots at 30-minute intervals
		const startHour = isWeekend ? 10 : 18
		const endHour = 23
		const timeSlots: ProcessedTimeSlot[] = []

		for (let hour = startHour; hour < endHour; hour++) {
			for (let minute = 0; minute < 60; minute += 30) {
				const currentSlotStart = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
				const endMinute = minute + 30
				const endHour = endMinute === 60 ? hour + 1 : hour
				const currentSlotEnd = `${endHour.toString().padStart(2, "0")}:${(endMinute % 60).toString().padStart(2, "0")}`

				const availableUsers = []
				for (const slot of allSlots) {
					if (
						slot.startTime <= currentSlotStart &&
						slot.endTime > currentSlotEnd
					) {
						availableUsers.push(slot.user)
					}
				}

				if (availableUsers.length > 0) {
					timeSlots.push({
						startTime: currentSlotStart,
						endTime: currentSlotEnd,
						availableUsers,
					})
				}
			}
		}

		// Aggregate slots based on selected duration
		const slotsNeeded = duration === "60min" ? 2 : duration === "90min" ? 3 : 4
		const aggregatedSlots: ProcessedTimeSlot[] = []

		for (let i = 0; i <= timeSlots.length - slotsNeeded; i++) {
			const slotGroup = timeSlots.slice(i, i + slotsNeeded)
			const startTime = slotGroup[0]?.startTime
			const endTime = slotGroup[slotGroup.length - 1]?.endTime

			if (!startTime || !endTime) continue

			// Find users available for the entire duration
			const availableUsers = []
			for (const user of users) {
				let isAvailableForAll = true
				for (const slot of slotGroup) {
					if (
						!slot.availableUsers.some((availUser) => availUser.id === user.id)
					) {
						isAvailableForAll = false
						break
					}
				}
				if (isAvailableForAll) {
					availableUsers.push(user)
				}
			}

			if (availableUsers.length > 0) {
				aggregatedSlots.push({
					startTime,
					endTime,
					availableUsers,
				})
			}
		}

		return aggregatedSlots
	}, [daySpecificSlots, regularSlots, duration, users, isWeekend])

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4">
				<div className="flex items-center">
					<Clock className="mr-2 h-5 w-5 text-primary" />
					<h3 className="font-medium">Gruppenverfügbarkeit</h3>
				</div>

				<Tabs
					value={duration}
					onValueChange={(value) => setDuration(value as TimeSlotDuration)}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="60min">1 Stunde</TabsTrigger>
						<TabsTrigger value="90min">90 Min</TabsTrigger>
						<TabsTrigger value="120min">2 Stunden</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{processAvailabilities.map((slot, index) => {
					const availableCount = slot.availableUsers.length
					const percentage =
						users.length > 0 ? (availableCount / users.length) * 100 : 0

					return (
						<Card
							key={index}
							className={cn(
								"relative overflow-hidden",
								percentage === 100 ? "border-green-500" : undefined,
							)}
						>
							<CardContent className="p-4">
								<div className="relative z-10">
									<div className="text-sm font-medium">
										{slot.startTime} - {slot.endTime}
									</div>

									<div className="mt-2 flex flex-wrap gap-2">
										{slot.availableUsers.map((user) => (
											<div
												key={user.id}
												className="flex items-center gap-2 rounded-full border px-2 py-1 text-xs"
											>
												<div className="h-2 w-2 rounded-full bg-primary" />
												{user.name}
											</div>
										))}
									</div>

									<div className="mt-2 text-right text-xs text-muted-foreground">
										{availableCount}/{users.length} verfügbar
									</div>
								</div>

								<div
									className="absolute bottom-0 left-0 right-0 bg-green-500/20"
									style={{
										height: `${percentage}%`,
										opacity: percentage / 100,
									}}
								/>
							</CardContent>
						</Card>
					)
				})}

				{processAvailabilities.length === 0 && (
					<div className="col-span-full text-center text-muted-foreground">
						Keine verfügbaren Zeitfenster für die gewählte Dauer gefunden
					</div>
				)}
			</div>
		</div>
	)
}
