import type { TimeSlot, User } from '@prisma/client'
import { processGroupAvailability } from './processAvailability'

// Mock users
const mockUsers: User[] = [
	{
		id: 'user1',
		name: 'John Doe',
		email: 'john@example.com',
		emailVerified: null,
		image: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 'user2',
		name: 'Jane Smith',
		email: 'jane@example.com',
		emailVerified: null,
		image: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

// Helper to create time slots
const createTimeSlot = (
	id: string,
	userId: string,
	day: number,
	startTime: string,
	endTime: string,
	weekNumber: number | null = null,
	biWeeklyStartWeek: number | null = null,
): TimeSlot & { user: User } => ({
	id,
	startTime,
	endTime,
	userId,
	type: 'DAY_SPECIFIC',
	day,
	date: null,
	isException: false,
	weekNumber,
	biWeeklyStartWeek,
	user: mockUsers.find((u) => u.id === userId)!,
})

describe('processGroupAvailability - Bi-weekly slots', () => {
	test('should handle legacy week1 bi-weekly slots (weekNumber=1, biWeeklyStartWeek=null)', () => {
		// Create a scenario with mixed slots:
		// - User1: week1 slot (legacy: weekNumber=1, biWeeklyStartWeek=null)
		// - User2: week2 slot (proper: weekNumber=2, biWeeklyStartWeek=1 for odd weeks = week 1)
		const timeSlots: (TimeSlot & { user: User })[] = [
			// User1: Legacy week1 slot - this should be treated as a bi-weekly slot for week1
			createTimeSlot('slot1', 'user1', 1, '10:00', '12:00', 1, null),

			// User2: Proper week2 slot with pattern 1 (odd weeks = week 1, so even weeks = week 2)
			createTimeSlot('slot2', 'user2', 1, '10:00', '12:00', 2, 1),
		]

		// Test for week 1 (odd ISO week number, e.g., week 23 = 2025-06-02 Monday)
		const week1Date = new Date('2025-06-02') // Monday, ISO week 23 (odd = week1)
		const week1Result = processGroupAvailability({
			date: week1Date,
			users: mockUsers,
			timeslots: timeSlots,
			duration: undefined,
			startHour: 9,
			endHour: 13,
		})

		// In week 1, only user1 should be available (legacy week1 slot should be active)
		// Note: The system generates 30-minute slots, so we check for any slot that user1 is available
		const week1SlotWithUser1 = week1Result.find((slot) =>
			slot.availableUsers.some((user) => user.name === 'John Doe'),
		)
		expect(week1SlotWithUser1).toBeDefined()
		expect(week1SlotWithUser1?.availableUsers).toHaveLength(1)
		expect(week1SlotWithUser1?.availableUsers[0]?.name).toBe('John Doe')

		// Test for week 2 (even ISO week number, e.g., week 24 = 2025-06-09 Monday)
		const week2Date = new Date('2025-06-09') // Monday, ISO week 24 (even = week2)
		const week2Result = processGroupAvailability({
			date: week2Date,
			users: mockUsers,
			timeslots: timeSlots,
			duration: undefined,
			startHour: 9,
			endHour: 13,
		})

		// In week 2, only user2 should be available (week2 slot should be active)
		const week2SlotWithUser2 = week2Result.find((slot) =>
			slot.availableUsers.some((user) => user.name === 'Jane Smith'),
		)
		expect(week2SlotWithUser2).toBeDefined()
		expect(week2SlotWithUser2?.availableUsers).toHaveLength(1)
		expect(week2SlotWithUser2?.availableUsers[0]?.name).toBe('Jane Smith')
	})

	test('should handle pure weekly slots when no bi-weekly slots exist', () => {
		// Create scenario with only weekly slots (no biWeeklyStartWeek set anywhere)
		const timeSlots: (TimeSlot & { user: User })[] = [
			createTimeSlot('slot1', 'user1', 1, '10:00', '12:00', 1, null),
			createTimeSlot('slot2', 'user2', 1, '10:00', '12:00', null, null),
		]

		const testDate = new Date('2025-06-02') // Any date should work for pure weekly slots
		const result = processGroupAvailability({
			date: testDate,
			users: mockUsers,
			timeslots: timeSlots,
			duration: undefined,
			startHour: 9,
			endHour: 13,
		})

		// Both users should be available (treated as weekly slots)
		const slotWithBothUsers = result.find(
			(slot) => slot.availableUsers.length >= 2,
		)
		expect(slotWithBothUsers).toBeDefined()
		expect(slotWithBothUsers?.availableUsers).toHaveLength(2)
	})

	test('should handle proper bi-weekly slots with biWeeklyStartWeek set', () => {
		// Both users have proper bi-weekly slots with biWeeklyStartWeek set
		const timeSlots: (TimeSlot & { user: User })[] = [
			createTimeSlot('slot1', 'user1', 1, '10:00', '12:00', 1, 1), // Week 1, pattern 1 (odd weeks = week 1)
			createTimeSlot('slot2', 'user2', 1, '10:00', '12:00', 2, 1), // Week 2, pattern 1 (even weeks = week 2)
		]

		// Test for week 23 (should be week 1 of the bi-weekly cycle)
		const week23Date = new Date('2025-06-02') // ISO week 23
		const week23Result = processGroupAvailability({
			date: week23Date,
			users: mockUsers,
			timeslots: timeSlots,
			duration: undefined,
			startHour: 9,
			endHour: 13,
		})

		// Only user1 should be available (week 1 of the cycle)
		const week23_slot = week23Result.find((slot) =>
			slot.availableUsers.some((user) => user.name === 'John Doe'),
		)
		expect(week23_slot).toBeDefined()
		expect(week23_slot?.availableUsers).toHaveLength(1)
		expect(week23_slot?.availableUsers[0]?.name).toBe('John Doe')

		// Test for week 24 (should be week 2 of the bi-weekly cycle)
		const week24Date = new Date('2025-06-09') // ISO week 24
		const week24Result = processGroupAvailability({
			date: week24Date,
			users: mockUsers,
			timeslots: timeSlots,
			duration: undefined,
			startHour: 9,
			endHour: 13,
		})

		// Only user2 should be available (week 2 of the cycle)
		const week24_slot = week24Result.find((slot) =>
			slot.availableUsers.some((user) => user.name === 'Jane Smith'),
		)
		expect(week24_slot).toBeDefined()
		expect(week24_slot?.availableUsers).toHaveLength(1)
		expect(week24_slot?.availableUsers[0]?.name).toBe('Jane Smith')
	})
})
