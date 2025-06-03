'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const addToGroupAction = authedActionClient
	.schema(z.object({ code: z.string() }))
	.action(async ({ parsedInput: { code }, ctx: { userId } }) => {
		const group = await prisma.group.findFirst({
			where: { code },
		})

		if (!group) throw new Error('Group not found')

		const isOnGroup = await prisma.userOnGroups.findFirst({
			where: {
				groupId: group?.id,
				id: userId,
			},
			select: {
				group: { select: { name: true, id: true } },
			},
		})

		if (isOnGroup) {
			// User is already in the group, but make sure their timeslots are connected
			const userTimeSlots = await prisma.timeSlot.findMany({
				where: {
					userId: userId,
					NOT: {
						groups: {
							some: { id: group.id },
						},
					},
				},
				select: { id: true },
			})

			// Connect any timeslots that aren't already connected to this group
			for (const timeSlot of userTimeSlots) {
				await prisma.timeSlot.update({
					where: { id: timeSlot.id },
					data: {
						groups: {
							connect: { id: group.id },
						},
					},
				})
			}

			return isOnGroup
		}

		// Add user to group and connect their existing timeslots to the new group
		const result = await prisma.$transaction(async (tx) => {
			// Create the user-group relationship
			const userGroup = await tx.userOnGroups.create({
				data: {
					groupId: group?.id,
					id: userId,
				},
				select: {
					id: true,
					group: { select: { name: true, id: true } },
				},
			})

			// Get all existing timeslots for this user
			const userTimeSlots = await tx.timeSlot.findMany({
				where: {
					userId: userId,
				},
				select: { id: true },
			})

			// Connect all user's timeslots to the new group
			await Promise.all(
				userTimeSlots.map((timeSlot) =>
					tx.timeSlot.update({
						where: { id: timeSlot.id },
						data: {
							groups: {
								connect: { id: group.id },
							},
						},
					}),
				),
			)

			return userGroup
		})

		// Revalidate cache for availability data
		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')

		return result
	})
