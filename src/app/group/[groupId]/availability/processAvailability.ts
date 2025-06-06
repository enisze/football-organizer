import type { TimeSlot, User } from '@prisma/client'
import { formatInTimeZone } from 'date-fns-tz'
import { isWeekActive } from './utils/isWeekActive'

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

	for (let hour = startHour; hour <= endHour; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			if (hour === endHour && minute > 0) continue

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
	relevantSlots: (TimeSlot & { user: User })[],
): boolean => {
	const userSlots = relevantSlots.filter((slot) => slot.user.id === user.id)
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	// First check for date-specific slots
	const dateSpecificSlots = userSlots.filter((slot) => {
		if (slot.type !== 'DATE_SPECIFIC' || !slot.date) return false

		// Get local date strings for both dates to compare them in user's timezone
		const slotLocalDate = formatInTimeZone(
			new Date(slot.date),
			timeZone,
			'yyyy-MM-dd',
		)
		const requestLocalDate = formatInTimeZone(date, timeZone, 'yyyy-MM-dd')

		return slotLocalDate === requestLocalDate
	})

	// If any date-specific slot is an exception, user is unavailable for this date
	if (dateSpecificSlots.some((slot) => slot.isException)) {
		return false
	}

	if (dateSpecificSlots.length > 0) {
		return dateSpecificSlots.some(
			(slot) =>
				timeToMinutes(slot.startTime) <= timeToMinutes(timeSlot.startTime) &&
				timeToMinutes(slot.endTime) >= timeToMinutes(timeSlot.endTime),
		)
	}

	// Then check for day-of-week slots using local day of week
	const localDayOfWeek = new Date(
		formatInTimeZone(date, timeZone, 'yyyy-MM-dd'),
	).getDay()

	// Check if there are any bi-weekly slots in the ENTIRE system (not just for this user)
	// This determines whether we're in a bi-weekly mode or pure weekly mode
	const hasBiWeeklySlots = relevantSlots.some(
		(slot) => slot.biWeeklyStartWeek !== null,
	)

	const dayOfWeekSlots = userSlots.filter((slot) => {
		if (slot.type !== 'DAY_SPECIFIC' || slot.day !== localDayOfWeek)
			return false

		// Case 1: Pure weekly mode - no bi-weekly slots exist in the system
		if (!hasBiWeeklySlots) {
			// All slots are treated as weekly slots (active every week)
			return slot.weekNumber === null || slot.weekNumber === 1
		}

		// Case 2: Bi-weekly mode - some slots in the system have biWeeklyStartWeek set
		if (hasBiWeeklySlots) {
			// Case 2a: Weekly slots (weekNumber=null) - active every week even in bi-weekly mode
			if (slot.weekNumber === null) {
				return true // Weekly slots are always active
			}

			// Case 2b: Slots with biWeeklyStartWeek set - check if current week is active
			if (slot.biWeeklyStartWeek !== null) {
				// For both weekNumber=1 and weekNumber=2, we need to check if the current week is active
				// The isWeekActive function returns true if current week matches the biWeeklyStartWeek pattern
				return isWeekActive(date, slot.biWeeklyStartWeek)
			}

			// Case 2c: Slots without biWeeklyStartWeek in bi-weekly mode
			// These are legacy weekly slots that should be active every week
			return slot.weekNumber === 1 || slot.weekNumber === null
		}

		// Fallback - should not reach here
		return false
	})

	if (dayOfWeekSlots.length > 0) {
		return dayOfWeekSlots.some(
			(slot) =>
				timeToMinutes(slot.startTime) <= timeToMinutes(timeSlot.startTime) &&
				timeToMinutes(slot.endTime) >= timeToMinutes(timeSlot.endTime),
		)
	}

	return false
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
	timeslots,
	duration = '90min',
	startHour = 0,
	endHour = 23,
}: {
	date: Date
	users: User[]
	timeslots: (TimeSlot & { user: User })[]
	duration: TimeSlotDuration | undefined
	startHour?: number
	endHour?: number
}): ProcessedTimeSlot[] {
	if (timeslots.length === 0) return []

	const baseSlots = generateBaseTimeSlots(startHour, endHour)

	// Check availability for each base slot
	const availabilitySlots = baseSlots
		.map((slot) => {
			const availableUsers = users.filter((user) =>
				isUserAvailable(user, slot, date, timeslots),
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
