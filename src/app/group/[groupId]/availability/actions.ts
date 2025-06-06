'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const updateTimeSlotAction = authedActionClient
	.schema(
		z.object({
			id: z.string().optional(),
			startTime: z.string(),
			endTime: z.string(),
			type: z.enum(['DAY_SPECIFIC', 'DATE_SPECIFIC']),
			date: z.date().optional(),
			day: z.number().min(0).max(6).optional(),
			groupId: z.string(),
			isException: z.boolean().optional(),
			isGlobalSlot: z.boolean(),
			weekNumber: z.number().min(1).max(2).optional(),
			biWeeklyStartWeek: z.number().min(0).max(1).optional(), // 0 for even weeks, 1 for odd weeks
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const {
			startTime,
			endTime,
			type,
			date,
			day,
			groupId,
			isException,
			isGlobalSlot,
			weekNumber,
			biWeeklyStartWeek,
		} = parsedInput

		if (type === 'DATE_SPECIFIC' && !date) {
			throw new Error('Date is required for date-specific time slots')
		}

		if (type === 'DAY_SPECIFIC' && day === undefined) {
			throw new Error('Day is required for day-of-week time slots')
		}

		const groups = isGlobalSlot
			? await prisma.group.findMany({
					where: {
						users: {
							some: {
								id: userId,
							},
						},
					},
				})
			: [
					{
						id: groupId,
					},
				]

		const groupIds = groups.map((g) => {
			return { id: g.id }
		})

		const otherWeekSlot = await prisma.timeSlot.findFirst({
			where: {
				userId,
				type: 'DAY_SPECIFIC',
				day,
				weekNumber: weekNumber ?? 1,
				biWeeklyStartWeek: {
					not: {
						equals: null,
					},
				},
				groups: {
					some: {
						id: groupId,
					},
				},
			},
		})

		const timeSlot = await prisma.timeSlot.upsert({
			create: {
				startTime,
				endTime,
				type,
				date: type === 'DATE_SPECIFIC' ? date : null,
				day: type === 'DAY_SPECIFIC' ? day : null,
				weekNumber: type === 'DAY_SPECIFIC' ? (weekNumber ?? 1) : null,
				biWeeklyStartWeek:
					type === 'DAY_SPECIFIC'
						? (biWeeklyStartWeek ?? otherWeekSlot?.biWeeklyStartWeek)
						: null,
				userId,
				groups: {
					connect: groupIds,
				},
				isException: isException ?? false,
			},
			update: {
				startTime,
				endTime,
				type,
				date: type === 'DATE_SPECIFIC' ? date : null,
				day: type === 'DAY_SPECIFIC' ? day : null,
				weekNumber: type === 'DAY_SPECIFIC' ? (weekNumber ?? 1) : null,
				biWeeklyStartWeek:
					type === 'DAY_SPECIFIC'
						? (biWeeklyStartWeek ?? otherWeekSlot?.biWeeklyStartWeek)
						: null,
				userId,
				groups: {
					connect: groupIds,
				},
				isException: isException ?? false,
			},
			where: {
				id: parsedInput.id,
			},
		})

		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')

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
		revalidateTag('groupAvailability')
	})

export const updateExceptionSlotsAction = authedActionClient
	.schema(
		z.object({
			dates: z.array(
				z.object({
					date: z.date(),
					operation: z.enum(['add', 'remove']),
				}),
			),
			groupId: z.string(),
			areGlobalExceptions: z.boolean(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { dates, groupId } = parsedInput

		const datesToAdd = dates
			.filter((d) => d.operation === 'add')
			.map((d) => d.date)
		const datesToRemove = dates
			.filter((d) => d.operation === 'remove')
			.map((d) => d.date)

		const groups = parsedInput.areGlobalExceptions
			? await prisma.group.findMany({
					where: {
						users: {
							some: {
								id: userId,
							},
						},
					},
				})
			: [
					{
						id: groupId,
					},
				]

		const groupIds = groups.map((g) => {
			return g.id
		})

		await prisma.$transaction(async (tx) => {
			// Remove exceptions
			if (datesToRemove.length > 0) {
				await tx.timeSlot.deleteMany({
					where: {
						userId,
						groups: {
							some: {
								id: {
									in: groupIds,
								},
							},
						},
						isException: true,
						type: 'DATE_SPECIFIC',
						date: {
							in: datesToRemove,
						},
					},
				})
			}

			if (datesToAdd.length > 0) {
				// Get existing exception slots for these dates
				const existingExceptions = await tx.timeSlot.findMany({
					where: {
						userId,
						groups: {
							some: {
								id: {
									in: groupIds,
								},
							},
						},
						isException: true,
						type: 'DATE_SPECIFIC',
						date: {
							in: datesToAdd,
						},
					},
					select: {
						date: true,
					},
				})

				// Filter out dates that already have exceptions
				const existingDates = new Set(
					existingExceptions.map((ex) => ex.date?.toISOString()),
				)
				const newDatesToAdd = datesToAdd.filter(
					(date) => !existingDates.has(date.toISOString()),
				)

				// Add new exceptions only for dates that don't have one
				if (newDatesToAdd.length > 0) {
					const createdSlots = await tx.timeSlot.createManyAndReturn({
						data: newDatesToAdd.map((date) => ({
							startTime: '00:00',
							endTime: '23:59',
							type: 'DATE_SPECIFIC',
							date,
							userId,
							isException: true,
						})),
					})

					for (const slot of createdSlots) {
						await tx.timeSlot.update({
							where: { id: slot.id },
							data: {
								groups: {
									connect: groupIds.map((id) => ({ id })),
								},
							},
						})
					}
				}
			}
		})

		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')
	})

export const deleteWeek2TimeSlotsAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			deleteGlobally: z.boolean().optional().default(false),
		}),
	)
	.action(
		async ({ parsedInput: { groupId, deleteGlobally }, ctx: { userId } }) => {
			if (deleteGlobally) {
				// Delete all week 2 time slots for the current user across all groups
				await prisma.timeSlot.deleteMany({
					where: {
						userId,
						weekNumber: 2,
					},
				})
			} else {
				// Delete week 2 time slots only for the specified group
				await prisma.timeSlot.deleteMany({
					where: {
						userId,
						weekNumber: 2,
						groups: {
							some: {
								id: groupId,
							},
						},
					},
				})
			}

			revalidateTag('myAvailability')
			revalidateTag('groupAvailability')
		},
	)

export const updateBiWeeklySlotsAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			biWeeklyStartWeek: z.number().min(0).max(1).nullable(),
			weekNumber: z.number().min(1).max(2).optional(),
			updateGlobally: z.boolean().optional().default(false),
		}),
	)
	.action(
		async ({
			parsedInput: { groupId, biWeeklyStartWeek, weekNumber, updateGlobally },
			ctx: { userId },
		}) => {
			// Update slots with the specified parameters
			await prisma.timeSlot.updateMany({
				where: {
					userId,
					weekNumber: weekNumber ?? 1,
					// Simply target all day-specific slots for the given week
					// This will work for both first-time setup and updates
					type: 'DAY_SPECIFIC',
					...(updateGlobally
						? {}
						: {
								groups: {
									some: {
										id: groupId,
									},
								},
							}),
				},
				data: {
					biWeeklyStartWeek,
					...(weekNumber && { weekNumber }),
				},
			})

			revalidateTag('myAvailability')
			revalidateTag('groupAvailability')
		},
	)
