import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { tool } from 'ai'
import { z } from 'zod'

export const getSlotTool = tool({
	description:
		'Fetches timeslots, the slot can be day-specific or date-specific. It is enough to specifiy a day or a certain date.',
	parameters: z.object({
		startTime: z.string().optional(),
		endTime: z.string().optional(),
		type: z.enum(['DAY_SPECIFIC', 'DATE_SPECIFIC']),
		date: z.string().optional(),
		day: z.number().min(0).max(6).optional(),
		groupId: z.string(),
		isException: z.boolean().optional(),
		isGlobalSlot: z.boolean().optional(),
	}),
	execute: async ({
		startTime,
		endTime,
		type,
		date,
		day,
		groupId,
		isException,
		isGlobalSlot,
	}) => {
		const session = await serverAuth()

		const userId = session?.user?.id

		if (!userId) {
			throw new Error('Unauthorized')
		}

		const slots = await prisma.timeSlot.findMany({
			where: {
				userId,
				startTime: startTime ?? undefined,
				endTime: endTime ?? undefined,
				type,
				date: date ? new Date(date) : undefined,
				day: day ?? undefined,
				isException: isException ?? undefined,
				groups: {
					some: {
						id: isGlobalSlot ? undefined : groupId,
					},
				},
			},
			orderBy: [{ date: 'asc' }, { day: 'asc' }, { startTime: 'asc' }],
		})

		return slots
	},
})
