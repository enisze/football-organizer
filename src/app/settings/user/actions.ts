'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const updatePaypalName = authedActionClient
	.schema(
		zfd.formData({
			paypalName: zfd.text(),
		}),
	)
	.action(async ({ parsedInput: { paypalName }, ctx: { userId } }) => {
		await prisma.user.update({
			where: { id: userId },
			data: { paypalName },
		})
		revalidatePath('/settings/user')
		return { success: true }
	})

export const updateNotification = authedActionClient
	.schema(z.object({}))
	.action(async ({ ctx: { userId } }) => {
		const userInfo = await prisma.user.findUnique({
			where: { id: userId },
			select: { notificationsEnabled: true },
		})

		await prisma.user.update({
			where: { id: userId },
			data: { notificationsEnabled: !userInfo?.notificationsEnabled },
		})
		return { success: true }
	})

export const deleteUser = authedActionClient.action(
	async ({ ctx: { userId } }) => {
		await prisma.user.delete({
			where: { id: userId },
		})
		return { success: true }
	},
)
