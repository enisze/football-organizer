import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { tool } from 'ai'
import { z } from 'zod'

export const getSlotTool = tool({
	description:
		'Ruft Zeitslots ab, der Slot kann tagesspezifisch oder datumsspezifisch sein. Es reicht aus, einen Tag oder ein bestimmtes Datum anzugeben.',
	parameters: z.object({
		startTime: z.string().optional(),
		endTime: z.string().optional(),
		type: z.enum(['DAY_SPECIFIC', 'DATE_SPECIFIC']),
		date: z.string().optional(),
		day: z.number().min(0).max(6).optional(),
		groupId: z.string(),
		isException: z.boolean().optional(),
		isGlobalSlot: z.boolean().optional(),
		weeekNumber: z.number().optional(),
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
		weeekNumber,
	}) => {
		const session = await serverAuth()

		const userId = session?.user?.id

		if (!userId) {
			throw new Error('Nicht autorisiert')
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
				weekNumber: weeekNumber ?? undefined,
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
