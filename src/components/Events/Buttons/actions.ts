"use server"

import { getAddressAndCoordinatesRedisKeys } from "@/src/helpers/getAddressAndCoordinatesRedisKeys"
import { revalidateGroup } from "@/src/helpers/isOwnerOfGroup"
import { authedActionClient } from "@/src/lib/actionClient"
import { inngest, prisma } from "@/src/server/db/client"
import { redis } from "@/src/server/db/redis"
import { z } from "zod"

export const sendReminderEventAction = authedActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id } }) => {
		await inngest.send({
			name: "event/reminder",
			data: { id },
		})
		return { success: true }
	})

export const deleteEventAction = authedActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput: { id } }) => {
		const { addressKey, coordinatesKey } = getAddressAndCoordinatesRedisKeys(id)

		if (!redis.isOpen) {
			await redis.connect()
		}

		const event = await prisma.event.findUnique({
			where: { id },
			select: { groupId: true },
		})

		await redis.del(addressKey)
		await redis.del(coordinatesKey)
		await prisma.event.delete({ where: { id } })
		await redis.disconnect()

		if (event?.groupId) {
			revalidateGroup(event.groupId)
		}
		return { success: true }
	})
