'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const addAllUserTimeslotsToGroupAction = authedActionClient
	.schema(z.object({ groupId: z.string() }))
	.action(async ({ parsedInput: { groupId }, ctx: { userId } }) => {
		// Check if user is in the group
		const userInGroup = await prisma.userOnGroups.findFirst({
			where: {
				groupId,
				id: userId,
			},
		})

		if (!userInGroup) {
			throw new Error('User is not a member of this group')
		}

		// Get all user's timeslots that are not already connected to this group
		const userTimeSlots = await prisma.timeSlot.findMany({
			where: {
				userId: userId,
				NOT: {
					groups: {
						some: { id: groupId },
					},
				},
			},
			select: { id: true },
		})

		// Connect all unconnected timeslots to the group
		await Promise.all(
			userTimeSlots.map((timeSlot) =>
				prisma.timeSlot.update({
					where: { id: timeSlot.id },
					data: {
						groups: {
							connect: { id: groupId },
						},
					},
				}),
			),
		)

		// Revalidate cache for availability data
		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')

		return {
			success: true,
			connectedSlots: userTimeSlots.length,
		}
	})
