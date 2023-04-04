import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from '../prisma/generated/client'
import { PrismaClient } from '../prisma/generated/client'

import { Inngest } from 'inngest'

const prisma = new PrismaClient()

const inngest = new Inngest({ name: 'Event Wizard' })

export const sendPaymentAndEventReminderEmails = inngest.createFunction(
  { name: 'Send Payment and Events' },
  { event: 'event/reminder' },
  async ({ event: inngestEvent, step }) => {
    const id = inngestEvent.data.id

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true, payments: true },
    })

    if (!event)
      return {
        message: 'No event',
      }

    const usersOnGroup = await prisma.userOnGroups.findMany({
      where: { groupId: event.groupId ?? '' },
    })

    if (!usersOnGroup)
      return {
        message: `No users found`,
      }

    const usersOfGroup = await Promise.all(
      usersOnGroup.map(async (user) => {
        return await prisma.user.findUnique({ where: { id: user.id } })
      }),
    )

    const { participants } = event

    //Ids which are available
    const canceledParticipantIds = getParticipantIdsByStatus(
      event.participants,
      'CANCELED',
    )

    const joinedParticipantIds = getParticipantIdsByStatus(
      event.participants,
      'JOINED',
    )

    const usersEventReminder: { name: string; email: string }[] = []
    const usersPaymentReminder: { name: string; email: string }[] = []

    usersOfGroup
      .filter((user) => user?.notificationsEnabled)
      .forEach(async (user) => {
        if (!user) return
        //Did not interact with the event at all
        if (
          !joinedParticipantIds.includes(user.id) &&
          !canceledParticipantIds.includes(user.id) &&
          participants.length < event.maxParticipants
        ) {
          usersEventReminder.push({ email: user.email, name: user.name })
        }

        if (event.bookingDate && joinedParticipantIds.includes(user.id)) {
          const payment = event.payments.find(
            (payment) => payment.userId === user.id,
          )

          if (!payment) {
            //Send payment reminder

            usersPaymentReminder.push({ email: user.email, name: user.name })
          }
        }
      })

    usersEventReminder.forEach(async (user) => {
      await inngest.send('event/reminderEmail', {
        data: {
          user,
          id: event.id,
          participantsAmount: joinedParticipantIds.length,
        },
      })
    })

    if (usersPaymentReminder.length > 0) {
      await inngest.send('event/paymentReminderEmail', {
        data: {
          usersPaymentReminder,
          id: event.id,
        },
      })
    }

    return {
      success: true,
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
