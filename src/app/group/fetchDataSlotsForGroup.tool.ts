import { prisma } from '@/src/server/db/client'
import { tool } from 'ai'
import { uniqueBy } from 'remeda'
import { z } from 'zod'
import {
	type TimeSlotDuration,
	processGroupAvailability,
} from './[groupId]/availability/processAvailability'
import { getUTCDate } from './[groupId]/availability/utils/getUTCDate'

export const fetchDateSlotsForGroup = tool({
	description:
		'Fetches available time slots for a group based on natural language request',
	parameters: z.object({
		month: z.number().optional(),
		day: z.number().optional(),
		year: z.number().optional(),
		desiredDuration: z.enum(['60min', '90min', '120min']).optional(),
		preferredStartTime: z.string().optional(),
		preferredEndTime: z.string().optional(),
		groupId: z.string(),
	}),

	execute: async ({
		month,
		day,
		year,
		desiredDuration,
		preferredEndTime,
		preferredStartTime,
		groupId,
	}) => {
		const targetDate = new Date(`${year}-${month}-${day}`)
		const localDayOfWeek = new Date(targetDate).getDay()
		const utcDate = getUTCDate(targetDate)

		const timeslots = await prisma.timeSlot.findMany({
			where: {
				OR: [
					{ type: 'DATE_SPECIFIC', date: utcDate },
					{ type: 'DAY_SPECIFIC', day: localDayOfWeek },
				],
				groups: {
					some: {
						id: groupId,
					},
				},
			},
			include: {
				user: true,
			},
		})

		const uniqueUsers = uniqueBy(
			timeslots.map((slot) => slot.user),
			(user) => user.id,
		)

		const slots = processGroupAvailability({
			date: targetDate,
			users: uniqueUsers,
			timeslots,
			duration: (desiredDuration as TimeSlotDuration) ?? '60min',
			startHour: preferredStartTime
				? Number.parseInt(preferredStartTime.split(':')[0] ?? '', 10)
				: 8,
			endHour: preferredEndTime
				? Number.parseInt(preferredEndTime.split(':')[0] ?? '', 10)
				: 23,
		})

		return slots
	},
})
