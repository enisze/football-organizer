"use client"

import { cn } from "@/lib/utils/cn"
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs"
import type { User, UserAvailability } from "@prisma/client"
import { Clock } from "lucide-react"
import { useMemo, useState } from "react"

interface GroupAvailabilityViewProps {
	date: Date
	users: User[]
	allUserAvailabilities: UserAvailability[]
}

type TimeSlotDuration = "30min" | "1hour" | "90min" | "2hours"

type TimeSlot = {
	time: string
	availableUsers: User[]
}

const processAvailabilities = (
	date: Date,
	users: User[],
	availabilities: UserAvailability[],
): TimeSlot[] => {
	const isWeekend = date.getDay() === 0 || date.getDay() === 6
	const startHour = isWeekend ? 10 : 18
	const endHour = 23

	const slots: TimeSlot[] = []

	for (let hour = startHour; hour <= endHour; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

			const availableUsers = users.filter((user) => {
				const userAvail = availabilities.find((a) => a.userId === user.id)
				if (!userAvail) return false

				// Check if the current timeSlot is within any of the user's available slots
				const timeSlots = userAvail.timeSlots as {
					startTime: string
					endTime: string
				}[]
				return timeSlots.some(
					(slot) => slot.startTime <= timeString && timeString <= slot.endTime,
				)
			})

			slots.push({
				time: timeString,
				availableUsers,
			})
		}
	}

	return slots
}

// Aggregate time slots based on duration
const aggregateTimeSlots = (
	slots: {
		time: string
		availableUsers: User[]
	}[],
	duration: TimeSlotDuration,
	users: User[],
) => {
	if (duration === "30min") return slots

	const aggregatedSlots = []
	const slotsPerGroup = duration === "1hour" ? 2 : duration === "90min" ? 3 : 4 // 2hours = 4 slots

	// Create overlapping groups
	for (let i = 0; i < slots.length - (slotsPerGroup - 1); i++) {
		const groupSlots = slots.slice(i, i + slotsPerGroup)
		const startTime = groupSlots[0]?.time
		const endTime = groupSlots[groupSlots.length - 1]?.time

		// Calculate which users are available for the entire duration
		const allUsers = new Set<string>()
		const userAvailabilityCounts: Record<string, number> = {}

		for (const slot of groupSlots) {
			for (const user of slot.availableUsers) {
				allUsers.add(user.id)
				userAvailabilityCounts[user.id] =
					(userAvailabilityCounts[user.id] || 0) + 1
			}
		}

		// A user is considered available if they're available for at least half the slots
		const minRequiredSlots = Math.ceil(slotsPerGroup / 2)
		const availableUsers = Array.from(allUsers)
			.filter(
				(userId) => (userAvailabilityCounts[userId] || 0) >= minRequiredSlots,
			)
			.map((userId) => users.find((user) => user.id === userId))
			.filter(Boolean) as User[]

		// Only add slots that have at least one available user
		if (availableUsers.length > 0) {
			aggregatedSlots.push({
				timeRange: `${startTime} - ${endTime}`,
				startTime,
				endTime,
				availableUsers,
			})
		}
	}

	return aggregatedSlots
}

export function GroupAvailabilityView({
	date,
	users,
	allUserAvailabilities,
}: GroupAvailabilityViewProps) {
	const [duration, setDuration] = useState<TimeSlotDuration>("30min")

	const rawAvailabilityData = useMemo(
		() => processAvailabilities(date, users, allUserAvailabilities),
		[date, users, allUserAvailabilities],
	)

	const availabilityData = useMemo(
		() => aggregateTimeSlots(rawAvailabilityData, duration, users),
		[rawAvailabilityData, duration, users],
	)

	return (
		<div>
			<div className="mb-6 flex flex-col gap-4">
				<div className="flex items-center">
					<Clock className="mr-2 h-5 w-5 text-primary" />
					<h3 className="font-medium">Gruppen-Verfügbarkeit</h3>
				</div>

				<Tabs
					value={duration}
					onValueChange={(value) => setDuration(value as TimeSlotDuration)}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="30min">Detailliert</TabsTrigger>
						<TabsTrigger value="1hour">1 Stunde</TabsTrigger>
						<TabsTrigger value="90min">90 Min</TabsTrigger>
						<TabsTrigger value="2hours">2 Stunden</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<div className="mb-4 flex flex-wrap gap-2">
				{availabilityData.map(({ availableUsers }) => (
					<div
						key={availableUsers?.id}
						className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
					>
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: availableUsers.color }}
						/>
						{availableUsers?.name}
					</div>
				))}
			</div>

			<div
				className={cn(
					"grid gap-2",
					duration === "30min"
						? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
						: duration === "1hour"
							? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
							: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
				)}
			>
				{availabilityData.map((slot, index) => {
					const availableCount = slot.availableUsers.length
					const percentage =
						users.length > 0 ? (availableCount / users.length) * 100 : 0

					return (
						<div
							key={index}
							className={cn(
								"relative flex flex-col justify-between rounded-md border p-2",
								percentage === 100 ? "border-green-500" : "border-input",
								duration !== "30min" ? "h-24" : "h-14",
							)}
						>
							<div className="z-10 text-xs font-medium">
								{duration === "30min" ? slot.time : slot.timeRange}
							</div>

							{/* Availability indicator */}
							<div
								className="absolute bottom-0 left-0 right-0 rounded-b-md bg-green-500/20"
								style={{
									height: `${percentage}%`,
									backgroundColor:
										percentage === 0
											? "transparent"
											: `rgba(34, 197, 94, ${percentage / 100})`,
								}}
							/>

							{/* User dots */}
							<div className="relative z-10 flex flex-wrap gap-1">
								{slot.availableUsers.map((user: User) => (
									<div
										key={user.id}
										className="h-2 w-2 rounded-full"
										style={{ backgroundColor: user.color }}
										title={user.name}
									/>
								))}
							</div>

							{/* Count */}
							<div className="relative z-10 text-right text-xs">
								{availableCount}/{users.length}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
