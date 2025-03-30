'use server'

import { defaultValues } from '@/src/helpers/constants'
import { getGroupId } from '@/src/helpers/isOwnerOfGroup'
import { authedActionClient } from '@/src/lib/actionClient'
import { inngest, prisma } from '@/src/server/db/client'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const deleteGroup = authedActionClient
	.schema(z.object({ groupId: z.string() }))
	.action(async ({ parsedInput: { groupId }, ctx: { userId } }) => {
		await prisma.group.delete({
			where: { id: groupId, ownerId: userId }
		})
		return { success: true }
	})

export const createGroup = authedActionClient
	.schema(z.object({ groupName: z.string() }))
	.action(async ({ parsedInput: { groupName }, ctx: { userId } }) => {
		await prisma.group.create({
			data: {
				name: groupName,
				code: nanoid(6),
				owner: { connect: { id: userId } },
				users: { create: { id: userId, role: 'OWNER' } }
			}
		})
		revalidatePath(`/settings/groups`)
		return { success: true }
	})

export const updateGroupName = authedActionClient
	.schema(
		zfd.formData({
			groupName: zfd.text(),
			groupId: zfd.text()
		})
	)
	.action(async ({ parsedInput: { groupName, groupId }, ctx: { userId } }) => {
		await prisma.group.update({
			where: { id: groupId, ownerId: userId },
			data: { name: groupName }
		})
		revalidatePath(`/settings/groups`)
		return { success: true, name: groupName }
	})

export const deleteUserFromGroup = authedActionClient
	.schema(z.object({ userId: z.string(), groupId: z.string() }))
	.action(
		async ({ parsedInput: { userId, groupId }, ctx: { userId: ownerId } }) => {
			if (ownerId === userId) {
				await prisma.group.delete({ where: { id: groupId } })
				revalidatePath(`/settings/groups`)
				revalidatePath(`/settings/groups/${groupId}`)
				return { groupDeleted: true }
			}

			await prisma.group.update({
				data: { users: { delete: { id_groupId: { groupId, id: userId } } } },
				where: { id: groupId, ownerId }
			})

			revalidatePath(`/settings/groups`)
			revalidatePath(`/settings/groups/${groupId}`)
			return { groupDeleted: false }
		}
	)






const schema = zfd.formData({
	address: zfd.text().default(defaultValues.address),
	date: zfd.text().default(defaultValues.date.toISOString()),
	startTime: zfd.text().default(defaultValues.startTime),
	endTime: zfd.text().default(defaultValues.endTime),
	cost: zfd.numeric().default(defaultValues.cost),
	maxParticipants: zfd.numeric().default(defaultValues.maxParticipants),
	environment: zfd.text().default(defaultValues.environment)

});

export const createEvent = authedActionClient
	.schema(
		schema
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {

		const groupId = await getGroupId()

		if (!userId) return { success: false }

		const event = await prisma.event.create({
			data: {
				address: parsedInput.address,
				date: new Date(parsedInput.date),
				startTime: parsedInput.startTime,
				endTime: parsedInput.endTime,
				cost: parsedInput.cost,
				maxParticipants: parsedInput.maxParticipants,
				groupId: groupId,
				environment: parsedInput.environment === 'on' ? 'INDOOR' : 'OUTDOOR'
			},
			select: { id: true }
		})

		await inngest.send({
			name: 'event/new',
			data: {
				id: event.id
			}
		})

		revalidatePath(`/groups/${groupId}`)
		return { success: true }
	})
