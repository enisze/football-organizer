import { inngest } from '@/src/server/db/client'
import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from '../prisma/generated/client'

export const triggerPaymentAndEventReminder = inngest.createFunction(
  { name: 'Trigger Payment and Event Reminder' },
  { event: 'event/reminder' },
  async ({ event: inngestEvent, prisma, step, logger }) => {
    const id = inngestEvent.data.id

    const event = await step.run(
      'getEvent',
      async () =>
        await prisma.event.findUnique({
          where: { id },
          include: { participants: true },
        }),
    )

    if (!event?.groupId) return { message: 'No group id' }

    const allGroupMembers = await step.run('getting members', async () => {
      const groupMembers = await prisma.group.findUnique({
        where: { id: event.groupId ?? undefined },
        select: { users: true },
      })

      if (!groupMembers) return []

      const allGroupMembers = await Promise.all(
        groupMembers.users.map(async (user) => {
          return await prisma.user.findUnique({ where: { id: user.id } })
        }),
      )

      return allGroupMembers
    })

    if (!event)
      return {
        message: 'No event',
      }

    if (!allGroupMembers)
      return {
        message: 'No group members',
      }

    const { participants } = event

    const canceledParticipantIds = getParticipantIdsByStatus(
      event.participants,
      'CANCELED',
    )

    const joinedParticipantIds = getParticipantIdsByStatus(
      event.participants,
      'JOINED',
    )

    const membersToRemindEvent = allGroupMembers.filter(
      (user) =>
        !canceledParticipantIds.includes(user?.id ?? '') &&
        !joinedParticipantIds.includes(user?.id ?? ''),
    )

    const membersToRemindPayment = allGroupMembers.filter((user) =>
      joinedParticipantIds.includes(user?.id ?? ''),
    )

    const usersEventReminder: { name: string; email: string }[] = []
    const usersPaymentReminder: { name: string; email: string }[] = []

    if (participants.length < event.maxParticipants) {
      membersToRemindEvent
        .filter((user) => user?.notificationsEnabled)
        .forEach((user) => {
          if (!user) return
          usersEventReminder.push({ email: user.email, name: user.name })
        })
    }

    if (event.bookingDate) {
      membersToRemindPayment
        .filter((user) => user?.notificationsEnabled)
        .forEach(async (user) => {
          if (!user) return
          const payment = await prisma.participantsOnEvents.findUnique({
            where: { id_eventId: { eventId: event.id, id: user.id } },
          })

          if (!payment?.paymentId) {
            usersPaymentReminder.push({ email: user.email, name: user.name })
          }
        })
    }

    logger.info('usersEventReminder', usersEventReminder)

    logger.info('usersPaymentReminder', usersPaymentReminder)

    usersEventReminder.forEach(async (user) => {
      await step.sendEvent({
        name: 'event/reminderEmail',
        data: {
          user,
          id: event.id,
          participantsAmount: joinedParticipantIds.length,
        },
      })
    })

    if (usersPaymentReminder.length > 0) {
      usersPaymentReminder.forEach(async (user) => {
        await step.sendEvent({
          name: 'event/paymentReminderEmail',
          data: {
            user,
            id: event.id,
          },
        })
      })
    }

    return {
      success: true,
    }
  },
)

const getParticipantIdsByStatus = (
  participants: Array<Omit<ParticipantsOnEvents, 'date'>>,
  eventStatus: UserEventStatus,
) => {
  return participants.reduce((acc: string[], participant) => {
    if (participant.userEventStatus === eventStatus) {
      return [...acc, participant.id]
    }
    return acc
  }, [])
}
