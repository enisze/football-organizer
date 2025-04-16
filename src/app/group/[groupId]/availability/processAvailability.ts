import type { TimeSlot, User } from '@prisma/client'

export type TimeSlotDuration = '60min' | '90min' | '120min'
export type ProcessedTimeSlot = {
	startTime: string
	endTime: string
	availableUsers: User[]
}

type TimeRange = {
	startTime: string
	endTime: string
}

// Helper function to parse time string to minutes
const timeToMinutes = (time: string): number => {
	const [hours, minutes] = time.split(':').map(Number)
	return (hours || 0) * 60 + (minutes || 0)
}

// Helper function to format minutes back to time string
const minutesToTime = (minutes: number): string => {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

// Generate base 30-minute time slots for the day
const generateBaseTimeSlots = (
	startHour: number,
	endHour: number,
): TimeRange[] => {
	const slots: TimeRange[] = []

	for (let hour = startHour; hour < endHour; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const startMinutes = hour * 60 + minute
			const endMinutes = startMinutes + 30

			slots.push({
				startTime: minutesToTime(startMinutes),
				endTime: minutesToTime(endMinutes),
			})
		}
	}

	return slots
}

// Check if a user is available for a specific time slot
const isUserAvailable = (
	user: User,
	timeSlot: TimeRange,
	date: Date,
	{
		daySpecificSlots,
		regularSlots,
		weekendSlots,
	}: {
		daySpecificSlots: (TimeSlot & { user: User })[]
		regularSlots: (TimeSlot & { user: User })[]
		weekendSlots: (TimeSlot & { user: User })[]
	},
): boolean => {
	const isWeekend = date.getDay() === 0 || date.getDay() === 6
	const dateString = date.toISOString().split('T')[0]

	// Check day-specific slots first
	const userDaySpecificSlots = daySpecificSlots.filter(
		(slot) =>
			slot.user.id === user.id &&
			slot.date &&
			new Date(slot.date).toISOString().split('T')[0] === dateString,
	)

	if (userDaySpecificSlots.length > 0) {
		return userDaySpecificSlots.some(
			(slot) =>
				timeToMinutes(slot.startTime) <= timeToMinutes(timeSlot.startTime) &&
				timeToMinutes(slot.endTime) >= timeToMinutes(timeSlot.endTime),
		)
	}

	// Fall back to regular/weekend slots
	const slots = isWeekend ? weekendSlots : regularSlots
	return slots.some(
		(slot) =>
			slot.user.id === user.id &&
			timeToMinutes(slot.startTime) <= timeToMinutes(timeSlot.startTime) &&
			timeToMinutes(slot.endTime) >= timeToMinutes(timeSlot.endTime),
	)
}

// Combine consecutive slots based on duration
const combineConsecutiveSlots = (
	slots: ProcessedTimeSlot[],
	duration: TimeSlotDuration,
): ProcessedTimeSlot[] => {
	const slotsNeeded = duration === '60min' ? 2 : duration === '90min' ? 3 : 4
	const result: ProcessedTimeSlot[] = []

	for (let i = 0; i <= slots.length - slotsNeeded; i++) {
		const consecutive = slots.slice(i, i + slotsNeeded)

		// Ensure we have enough consecutive slots
		if (consecutive.length !== slotsNeeded) continue

		const firstSlot = consecutive[0]
		const lastSlot = consecutive[consecutive.length - 1]

		if (!firstSlot || !lastSlot) continue

		// Check if slots are consecutive
		const areConsecutive = consecutive.every((slot, index) => {
			if (index === 0) return true
			const prevSlot = consecutive[index - 1]
			return (
				prevSlot &&
				slot &&
				timeToMinutes(prevSlot.endTime) === timeToMinutes(slot.startTime)
			)
		})

		if (!areConsecutive) continue

		// Find users available for all consecutive slots
		const availableForAll = firstSlot.availableUsers.filter((user) =>
			consecutive.every((slot) =>
				slot.availableUsers.some((availUser) => availUser.id === user.id),
			),
		)

		if (availableForAll.length > 0) {
			result.push({
				startTime: firstSlot.startTime,
				endTime: lastSlot.endTime,
				availableUsers: availableForAll,
			})
		}
	}

	return result
}

export function processGroupAvailability({
	date,
	users,
	daySpecificSlots,
	regularSlots,
	weekendSlots,
	duration = '90min',
}: {
	date: Date
	users: User[]
	daySpecificSlots: (TimeSlot & { user: User })[]
	regularSlots: (TimeSlot & { user: User })[]
	weekendSlots: (TimeSlot & { user: User })[]
	duration: TimeSlotDuration | undefined
}): ProcessedTimeSlot[] {
	// Generate base 30-minute slots
	const baseSlots = generateBaseTimeSlots(10, 23)

	// Check availability for each base slot
	const availabilitySlots = baseSlots
		.map((slot) => {
			const availableUsers = users.filter((user) =>
				isUserAvailable(user, slot, date, {
					daySpecificSlots,
					regularSlots,
					weekendSlots,
				}),
			)

			return {
				...slot,
				availableUsers,
			}
		})
		.filter((slot) => slot.availableUsers.length > 0)

	// Combine slots based on duration and sort
	const combinedSlots = duration
		? combineConsecutiveSlots(availabilitySlots, duration)
		: availabilitySlots

	return combinedSlots.sort((a, b) => {
		// Sort by number of available users (descending), then by start time
		const usersDiff = b.availableUsers.length - a.availableUsers.length
		return usersDiff !== 0
			? usersDiff
			: timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
	})
}
