'use server'

import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import { revalidateGroup } from '@/src/helpers/isOwnerOfGroup'
import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { subDays } from 'date-fns'
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

export const sendPaidButCanceledMailAction = authedActionClient
	.schema(z.object({ eventId: z.string() }))
	.action(async ({ parsedInput: { eventId }, ctx: { userId } }) => {
		const event = await prisma.event.findUnique({ where: { id: eventId } })
		const user = await prisma.user.findUnique({ where: { id: userId } })
		const group = await prisma.group.findUnique({
			where: { id: event?.groupId ?? '' },
			include: { owner: { select: { email: true, name: true } } },
		})

		if (!event || !user || !group) throw new Error('Not found')

		await sendPaidButCanceledMail(event, user, group.owner)
		revalidateGroup(event.groupId)
		return { success: true }
	})

export const setParticipatingStatus = authedActionClient
	.schema(
		z.object({
			eventId: z.string(),
			status: z.enum(['JOINED', 'CANCELED', 'MAYBE']),
			comment: z.string().optional().nullable(),
		}),
	)
	.action(
		async ({ parsedInput: { eventId, status, comment }, ctx: { userId } }) => {
			const event = await prisma.event.findUnique({
				where: { id: eventId },
				include: { participants: true },
			})

			if (!event) throw new Error('Event not found')

			if (
				status === 'JOINED' &&
				event.participants.filter(
					(p: { userEventStatus: string }) => p.userEventStatus === 'JOINED',
				).length >= event.maxParticipants
			) {
				throw new Error('Event is full')
			}

			await prisma.participantsOnEvents.upsert({
				create: { eventId, id: userId, userEventStatus: status, comment },
				update: { userEventStatus: status, comment },
				where: { id_eventId: { eventId, id: userId } },
			})

			revalidateGroupAction({ groupId: event.groupId })
		},
	)

export const bookEvent = authedActionClient
	.schema(
		z.object({
			eventId: z.string(),
			bookingDate: z.string(),
		}),
	)
	.action(async ({ parsedInput: { eventId, bookingDate } }) => {
		const date = new Date(bookingDate)
		if (!eventId) throw new Error('BAD_REQUEST')

		const event = await prisma.event.findUnique({
			where: { id: eventId },
			select: { groupId: true },
		})

		await prisma.event.update({
			data: { status: 'BOOKED', bookingDate: subDays(date, 1) },
			where: { id: eventId },
		})

		if (event?.groupId) {
			revalidateGroup(event.groupId)
		}
		return { success: true }
	})

export const revalidateGroupAction = async ({
	groupId,
	date,
	duration,
	minUsers,
}: {
	groupId: string
	date?: string
	duration?: '60min' | '90min' | '120min'
	minUsers?: number
}) => {
	const search: Record<string, string | number> = {}
	if (date !== undefined) search.date = date
	if (duration !== undefined) search.duration = duration
	if (minUsers !== undefined) search.minUsers = minUsers

	revalidatePath(
		routes.groupDetails({
			groupId,
			search,
		}),
	)
}

export const revalidateTagAction = async ({
	tagId,
}: {
	tagId: string
}) => {
	revalidateTag(tagId)
}
