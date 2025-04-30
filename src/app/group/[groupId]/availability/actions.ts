'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidatePath, revalidateTag } from 'next/cache'
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
			type: z.enum(['GENERAL', 'WEEKEND', 'DAY_SPECIFIC', 'DATE_SPECIFIC']),
			date: z.date().optional(),
			day: z.number().min(0).max(6).optional(),
			groupId: z.string(),
			isException: z.boolean().optional(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { startTime, endTime, type, date, day, groupId, isException } =
			parsedInput

		if (type === 'DATE_SPECIFIC' && !date) {
			throw new Error('Date is required for date-specific time slots')
		}

		if (type === 'DAY_SPECIFIC' && day === undefined) {
			throw new Error('Day is required for day-of-week time slots')
		}

		const timeSlot = await prisma.timeSlot.create({
			data: {
				startTime,
				endTime,
				type,
				date: type === 'DATE_SPECIFIC' ? date : null,
				day: type === 'DAY_SPECIFIC' ? day : null,
				userId,
				groupId,
				isException: isException ?? false,
			},
		})

		revalidateTag('myAvailability')

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

		revalidateTag('myAvailability')
	})
