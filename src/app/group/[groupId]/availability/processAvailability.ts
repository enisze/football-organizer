import type { TimeSlot, User } from "@prisma/client"

export type TimeSlotDuration = "60min" | "90min" | "120min"
export type ProcessedTimeSlot = {
	startTime: string
	endTime: string
	availableUsers: User[]
}

export function processGroupAvailability({
	date,
	users,
	daySpecificSlots,
	regularSlots,
	weekendSlots,
	duration = "60min",
}: {
	date: Date
	users: User[]
	daySpecificSlots: (TimeSlot & { user: User })[]
	regularSlots: (TimeSlot & { user: User })[]
	weekendSlots: (TimeSlot & { user: User })[]
	duration: TimeSlotDuration | null
}): ProcessedTimeSlot[] {
	const isWeekend = date.getDay() === 0 || date.getDay() === 6
	const startHour = 10
	const endHour = 23
	const timeSlots: ProcessedTimeSlot[] = []

	// Helper function to parse time string to minutes
	const timeToMinutes = (time: string): number => {
		const [hours, minutes] = time.split(":").map(Number)
		return (hours || 0) * 60 + (minutes || 0)
	}

	// Create 30-minute base slots
	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const currentSlotStart = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
			const endMinute = minute + 30
			const endHour = endMinute === 60 ? hour + 1 : hour
			const currentSlotEnd = `${endHour.toString().padStart(2, "0")}:${(endMinute % 60).toString().padStart(2, "0")}`

			const availableUsers: User[] = []

			// Check availability for each user
			for (const user of users) {
				// Get all day-specific slots for this user
				const userDaySpecificSlots = daySpecificSlots.filter(
					(slot) =>
						slot.user.id === user.id &&
						slot.date &&
						new Date(slot.date).toISOString().split("T")[0] ===
							date.toISOString().split("T")[0],
				)

				if (userDaySpecificSlots.length > 0) {
					// User has day-specific slots, ONLY check these
					const isAvailable = userDaySpecificSlots.some(
						(slot) =>
							timeToMinutes(slot.startTime) <=
								timeToMinutes(currentSlotStart) &&
							timeToMinutes(slot.endTime) >= timeToMinutes(currentSlotEnd),
					)

					console.log(userDaySpecificSlots, currentSlotStart, currentSlotEnd)
					if (isAvailable) {
						availableUsers.push(user)
					}
				} else {
					// No day-specific slots, fall back to regular/weekend slots
					const slots = isWeekend ? weekendSlots : regularSlots
					const hasRegularSlot = slots.some(
						(slot) =>
							slot.user.id === user.id &&
							timeToMinutes(slot.startTime) <=
								timeToMinutes(currentSlotStart) &&
							timeToMinutes(slot.endTime) >= timeToMinutes(currentSlotEnd),
					)

					if (hasRegularSlot) {
						availableUsers.push(user)
					}
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

	// Combine consecutive slots based on duration
	const slotsNeeded = duration === "60min" ? 2 : duration === "90min" ? 3 : 4
	const result: ProcessedTimeSlot[] = []

	for (let i = 0; i <= timeSlots.length - slotsNeeded; i++) {
		const consecutive = timeSlots.slice(i, i + slotsNeeded)
		if (consecutive.length < slotsNeeded) continue

		// Check if slots are consecutive and users are available for all slots
		const areConsecutive = consecutive.every((slot, index) => {
			if (index === 0) return true
			const prevSlot = consecutive[index - 1]
			if (!prevSlot) return false
			return timeToMinutes(prevSlot.endTime) === timeToMinutes(slot.startTime)
		})

		if (!areConsecutive) continue

		const availableForAll = users.filter((user) =>
			consecutive.every((slot) =>
				slot.availableUsers.some((availUser) => availUser.id === user.id),
			),
		)

		if (availableForAll.length > 0) {
			const firstSlot = consecutive[0]
			const lastSlot = consecutive[consecutive.length - 1]
			if (firstSlot && lastSlot) {
				result.push({
					startTime: firstSlot.startTime,
					endTime: lastSlot.endTime,
					availableUsers: availableForAll,
				})
			}
		}
	}

	return result.sort(
		(a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
	)
}
