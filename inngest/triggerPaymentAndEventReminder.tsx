import { inngest } from '@/src/server/db/client'
import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from '../prisma/generated/client'

export const triggerPaymentAndEventReminder = inngest.createFunction(
  { name: 'Trigger Payment and Event Reminder' },
  { event: 'event/reminder' },
  async ({ step, event: inngestEvent, prisma }) => {
    try {
      const id = inngestEvent.data.id

      const event = await prisma.event.findUnique({
        where: { id },
        include: { participants: true },
      })

      if (!event?.groupId) return { message: 'No group id' }

      const groupMembers = await prisma.group.findUnique({
        where: { id: event.groupId },
        select: { users: true },
      })

      if (!event)
        return {
          message: 'No event',
        }

      if (!groupMembers)
        return {
          message: 'No group members',
        }

      const allGroupMembers = await Promise.all(
        groupMembers.users.map(async (user) => {
          return await prisma.user.findUnique({ where: { id: user.id } })
        }),
      )

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

      await step.run('send reminder Email', () => {
        usersEventReminder.forEach(async (user) => {
          console.log(
            'sending trigger reminder email for' + user.email + ' ' + user.name,
          )
          await inngest.send({
            name: 'event/reminderEmail',
            data: {
              user,
              id: event.id,
              participantsAmount: joinedParticipantIds.length,
            },
          })
        })
      })

      if (usersPaymentReminder.length > 0) {
        await step.run('paymentReminder', () => {
          usersPaymentReminder.forEach(async (user) => {
            console.log(
              'sending trigger reminder payment for' +
                user.email +
                ' ' +
                user.name,
            )
            await inngest.send({
              name: 'event/paymentReminderEmail',
              data: {
                user,
                id: event.id,
              },
            })
          })
        })
      }

      return {
        success: true,
      }
    } catch (error) {
      console.log(error)
    }
  },
)

const getParticipantIdsByStatus = (
  participants: ParticipantsOnEvents[],
  eventStatus: UserEventStatus,
) => {
  return participants.reduce((acc: string[], participant) => {
    if (participant.userEventStatus === eventStatus) {
      return [...acc, participant.id]
    }
    return acc
  }, [])
}
