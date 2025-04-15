'use server'

import { defaultValues } from '@/src/helpers/constants'
import { authedActionClient } from '@/src/lib/actionClient'
import { inngest, prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const deleteGroup = authedActionClient
	.schema(z.object({ groupId: z.string() }))
	.action(async ({ parsedInput: { groupId }, ctx: { userId } }) => {
		await prisma.group.delete({
			where: { id: groupId, ownerId: userId },
		})
		return { success: true }
	})

export const createGroup = authedActionClient
	.schema(
		zfd.formData({
			groupName: zfd.text(),
		}),
	)
	.action(async ({ parsedInput: { groupName }, ctx: { userId } }) => {
		await prisma.group.create({
			data: {
				name: groupName,
				code: nanoid(6),
				owner: { connect: { id: userId } },
				users: { create: { id: userId, role: 'OWNER' } },
			},
		})
		revalidatePath(routes.groupSettings())
		return { success: true }
	})

export const updateGroupName = authedActionClient
	.schema(
		zfd.formData({
			groupName: zfd.text(),
			groupId: zfd.text(),
		}),
	)
	.action(async ({ parsedInput: { groupName, groupId }, ctx: { userId } }) => {
		await prisma.group.update({
			where: { id: groupId, ownerId: userId },
			data: { name: groupName },
		})
		revalidatePath(routes.groupSettings())
		return { success: true, name: groupName }
	})

export const deleteUserFromGroup = authedActionClient
	.schema(z.object({ userId: z.string(), groupId: z.string() }))
	.action(
		async ({ parsedInput: { userId, groupId }, ctx: { userId: ownerId } }) => {
			if (ownerId === userId) {
				await prisma.group.delete({ where: { id: groupId } })
				revalidatePath(routes.groupSettings())
				revalidatePath(routes.groupSettingsDetails({ groupId }))
				return { groupDeleted: true }
			}

			await prisma.group.update({
				data: { users: { delete: { id_groupId: { groupId, id: userId } } } },
				where: { id: groupId, ownerId },
			})

			revalidatePath(routes.groupSettings())
			revalidatePath(routes.groupSettingsDetails({ groupId }))
			return { groupDeleted: false }
		},
	)

const schema = zfd.formData({
	address: zfd.text().default(defaultValues.address),
	date: zfd.text().default(defaultValues.date.toISOString()),
	startTime: zfd.text().default(defaultValues.startTime),
	endTime: zfd.text().default(defaultValues.endTime),
	cost: zfd.numeric().default(defaultValues.cost),
	maxParticipants: zfd.numeric().default(defaultValues.maxParticipants),
	environment: zfd.text().default(defaultValues.environment),
	groupId: zfd.text(),
})

export const createEvent = authedActionClient
	.schema(schema)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const groupId = parsedInput.groupId
		if (!userId) return { success: false }

		const event = await prisma.event.create({
			data: {
				address: parsedInput.address,
				date: new Date(parsedInput.date),
				startTime: parsedInput.startTime,
				endTime: parsedInput.endTime,
				cost: parsedInput.cost,
				maxParticipants: parsedInput.maxParticipants,
				groupId,
				environment: parsedInput.environment === 'on' ? 'INDOOR' : 'OUTDOOR',
			},
			select: { id: true },
		})

		await inngest.send({
			name: 'event/new',
			data: {
				id: event.id,
			},
		})

		revalidatePath(routes.groupDetails({ groupId }))
		return { success: true }
	})
