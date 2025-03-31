"use server"

import { revalidateGroup } from "@/src/helpers/isOwnerOfGroup"
import { authedActionClient } from "@/src/lib/actionClient"
import { prisma } from "@/src/server/db/client"
import { z } from "zod"

const timeSlotSchema = z.array(
	z.object({
		startTime: z.string(),
		endTime: z.string(),
	}),
)

const availabilityInput = z.object({
	groupId: z.string(),
	date: z.date(),
	timeSlots: timeSlotSchema,
	status: z.enum(["AVAILABLE", "UNAVAILABLE", "MAYBE"]).default("AVAILABLE"),
	type: z.enum(["one-time", "recurring"]).default("one-time"),
})

export const createAvailabilityAction = authedActionClient
	.schema(availabilityInput)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { groupId, date, timeSlots, status, type } = parsedInput

		const availability = await prisma.userAvailability.upsert({
			where: {
				userId_groupId_date: {
					userId,
					groupId,
					date,
				},
			},
			update: {
				timeSlots,
				status,
				type,
			},
			create: {
				userId,
				groupId,
				date,
				timeSlots,
				status,
				type,
			},
		})

		revalidateGroup()
		return availability
	})

export const deleteAvailabilityAction = authedActionClient
	.schema(z.object({ id: z.string() }))
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const availability = await prisma.userAvailability.deleteMany({
			where: {
				id: parsedInput.id,
				userId,
			},
		})

		return availability
	})

export const getAvailabilityAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			date: z.date(),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const availability = await prisma.userAvailability.findMany({
			where: {
				userId,
				groupId: parsedInput.groupId,
				date: parsedInput.date,
			},
		})

		return availability
	})
