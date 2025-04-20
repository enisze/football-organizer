import { inngest } from '@/src/server/db/client'
import type { ParticipantsOnEvents, UserEventStatus } from '@prisma/client'

export const triggerPaymentAndEventReminder = inngest.createFunction(
	{ id: 'trigger-payment-and-event-reminder' },
	{ event: 'event/reminder' },
	async ({ event: inngestEvent, prisma, step, logger }) => {
		const id = inngestEvent.data.id

		const event = await step.run(
			'Get Event',
			async () =>
				await prisma.event.findUnique({
					where: { id },
					include: { participants: true },
				}),
		)

		if (!event?.groupId) return { message: 'No group id' }

		const membersToRemind = await step.run('Get members', async () => {
			const groupMembersToRemind = await prisma.user.findMany({
				where: {
					notificationsEnabled: true,
					groups: {
						some: {
							groupId: event.groupId,
						},
					},
					events: { none: { id: event.id, userEventStatus: 'CANCELED' } },
				},
			})

			return groupMembersToRemind
		})

		if (!event)
			return {
				message: 'No event',
			}

		if (!membersToRemind)
			return {
				message: 'No group members',
			}

		const { participants } = event

		const joinedParticipantIds = getParticipantIdsByStatus(
			participants,
			'JOINED',
		)

		const membersToRemindPayment = membersToRemind.filter((user) =>
			joinedParticipantIds.find((id) => id === user.id),
		)

		const usersEventReminder: { name: string; email: string }[] = []
		const usersPaymentReminder: { name: string; email: string }[] = []

		if (joinedParticipantIds.length < event.maxParticipants) {
			const filteredUsers = membersToRemind.filter(
				(user) => user?.notificationsEnabled,
			)

			for (const user of filteredUsers) {
				if (!user) return
				usersEventReminder.push({ email: user.email, name: user.name })
			}
		}

		if (event.bookingDate) {
			for (const user of membersToRemindPayment) {
				if (!user) return
				const payment = await prisma.participantsOnEvents.findUnique({
					where: { id_eventId: { eventId: event.id, id: user.id } },
				})

				if (!payment?.paymentId) {
					usersPaymentReminder.push({ email: user.email, name: user.name })
				}
			}
		}

		await step.run('logging', async () => {
			logger.info('usersEventReminder', usersEventReminder)

			logger.info('usersPaymentReminder', usersPaymentReminder)
		})

		for (const user of usersEventReminder) {
			await step.sendEvent('send-event-reminder-email', {
				name: 'event/reminderEmail',
				data: {
					user,
					id: event.id,
				},
			})
		}

		if (usersPaymentReminder.length > 0) {
			for (const user of usersPaymentReminder) {
				await step.sendEvent('send-event-payment-reminder-email', {
					name: 'event/paymentReminderEmail',
					data: {
						user,
						id: event.id,
					},
				})
			}
		}

		return {
			success: true,
			usersEventReminder,
			usersPaymentReminder,
		}
	},
)

export const getParticipantIdsByStatus = (
	participants: Array<Omit<ParticipantsOnEvents, 'date'>>,
	eventStatus: UserEventStatus,
) => {
	return participants.reduce((acc: string[], participant) => {
		if (participant.userEventStatus === eventStatus) {
			acc.push(participant.id)
			return acc
		}
		return acc
	}, [])
}
