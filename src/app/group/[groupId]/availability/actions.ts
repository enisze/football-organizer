'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { processGroupAvailability } from './processAvailability'

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

export const getTimeSlotsAction = authedActionClient
	.schema(
		z.object({
			date: z.date().optional(),
			type: z.enum(['GENERAL', 'WEEKEND', 'DAY_SPECIFIC']).optional(),
			groupId: z.string(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { date, type, groupId } = parsedInput

		const timeSlots = await prisma.timeSlot.findMany({
			where: {
				userId,
				groupId,
				...(type ? { type } : {}),
				...(date ? { date } : {}),
			},
			orderBy: [{ type: 'asc' }, { date: 'asc' }, { startTime: 'asc' }],
		})

		return timeSlots
	})

export const getGroupAvailabilityAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			date: z.date(),
			duration: z.enum(['60min', '90min', '120min']),
		}),
	)
	.action(async ({ parsedInput: { groupId, date, duration } }) => {
		const group = await prisma.group.findUnique({
			where: { id: groupId },
			include: {
				users: {
					include: {
						user: true,
					},
				},
			},
		})

		if (!group) return null

		const users = group.users.map((u) => u.user)
		const [daySpecificSlots, generalSlots, weekendSlots] = await Promise.all([
			// Get day-specific slots for this date
			prisma.timeSlot.findMany({
				where: {
					type: 'DAY_SPECIFIC',
					date,
					groupId,
					user: {
						groups: {
							some: {
								groupId,
							},
						},
					},
				},
				include: {
					user: true,
				},
			}),
			// Get general slots
			prisma.timeSlot.findMany({
				where: {
					type: 'GENERAL',
					groupId,
					user: {
						groups: {
							some: {
								groupId,
							},
						},
					},
				},
				include: {
					user: true,
				},
			}),
			// Get weekend slots
			prisma.timeSlot.findMany({
				where: {
					type: 'WEEKEND',
					groupId,
					user: {
						groups: {
							some: {
								groupId,
							},
						},
					},
				},
				include: {
					user: true,
				},
			}),
		])

		return processGroupAvailability({
			date,
			users,
			daySpecificSlots: daySpecificSlots ?? [],
			regularSlots: generalSlots ?? [],
			weekendSlots: weekendSlots ?? [],
			duration,
		})
	})
