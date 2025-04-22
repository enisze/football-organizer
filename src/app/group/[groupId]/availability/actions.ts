'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const timeSlotSchema = z.array(
	z.object({
		startTime: z.string(),
		endTime: z.string(),
	}),
)

export const updateGeneralAvailabilityAction = authedActionClient
	.schema(
		z.object({
			timeSlots: timeSlotSchema,
			isWeekend: z.boolean(),
			groupId: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { timeSlots, isWeekend, groupId } = parsedInput

		// Delete existing slots of this type for this user
		await prisma.timeSlot.deleteMany({
			where: {
				userId,
				groupId,
				type: isWeekend ? 'WEEKEND' : 'GENERAL',
			},
		})

		// Create new slots
		const newSlots = await Promise.all(
			timeSlots.map((slot) =>
				prisma.timeSlot.create({
					data: {
						...slot,
						type: isWeekend ? 'WEEKEND' : 'GENERAL',
						userId,
						groupId,
					},
				}),
			),
		)

		revalidatePath(`/group/${groupId}`)
		return newSlots
	})

export const updateTimeSlotAction = authedActionClient
	.schema(
		z.object({
			startTime: z.string(),
			endTime: z.string(),
			type: z.enum(['GENERAL', 'WEEKEND', 'DAY_SPECIFIC']),
			date: z.date().optional(),
			groupId: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { startTime, endTime, type, date, groupId } = parsedInput

		if (type === 'DAY_SPECIFIC' && !date) {
			throw new Error('Date is required for day-specific time slots')
		}

		const timeSlot = await prisma.timeSlot.create({
			data: {
				startTime,
				endTime,
				type,
				date: type === 'DAY_SPECIFIC' ? date : null,
				userId,
				groupId,
			},
		})

		revalidatePath(`/group/${groupId}`)
		return timeSlot
	})

export const deleteTimeSlotAction = authedActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id }, ctx: { userId } }) => {
		await prisma.timeSlot.delete({
			where: {
				id,
				userId,
			},
		})

		revalidatePath('/group')
	})
