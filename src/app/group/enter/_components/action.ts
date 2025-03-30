'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { z } from 'zod'

export const addToGroupAction = authedActionClient
	.schema(z.object({ code: z.string() }))
	.action(async ({ parsedInput: { code }, ctx: { userId } }) => {
		const group = await prisma.group.findFirst({
			where: { code }
		})

		if (!group) throw new Error('Group not found')

		const isOnGroup = await prisma.userOnGroups.findFirst({
			where: {
				groupId: group?.id,
				id: userId
			},
			select: {
				group: { select: { name: true, id: true } }
			}
		})

		if (isOnGroup) return isOnGroup

		return await prisma.userOnGroups.create({
			data: {
				groupId: group?.id,
				id: userId
			},
			select: {
				id: true,
				group: { select: { name: true, id: true } }
			}
		})
	})
