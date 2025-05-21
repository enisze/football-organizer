import { tool } from 'ai'
import { z } from 'zod'
import { updateTimeSlotAction } from './[groupId]/availability/actions'

export const createSlotTool = tool({
	description: 'Creates or updates a time slot for a group',
	parameters: z.object({
		startTime: z.string(),
		endTime: z.string(),
		id: z.string().optional(),
		type: z.enum(['DAY_SPECIFIC', 'DATE_SPECIFIC']),
		date: z.string().optional(),
		day: z.number().min(0).max(6).optional(),
		groupId: z.string(),
		isException: z.boolean().optional(),
		isGlobalSlot: z.boolean(),
	}),
	execute: async ({
		startTime,
		endTime,
		type,
		id,
		date,
		day,
		groupId,
		isException,
		isGlobalSlot,
	}) => {
		const result = await updateTimeSlotAction({
			id: id ?? '',
			startTime,
			endTime,
			type,
			date: date ? new Date(date) : undefined,
			day,
			groupId,
			isException,
			isGlobalSlot,
		})

		return result?.data
	},
})
