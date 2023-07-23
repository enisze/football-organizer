import { inngest, prisma } from '@/src/server/db/client'
import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from '../prisma/generated/client'

export const triggerPaymentAndEventReminder = inngest.createFunction(
  { name: 'Trigger Payment and Event Reminder' },
  { event: 'event/reminder' },
  async ({ event: inngestEvent }) => {
    console.log('here')

    const id = inngestEvent.data.id

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true },
    })

    if (!event)
      return {
        message: 'No event',
      }

    if (!event.participants)
      return {
        message: `No users found`,
      }

    const allParticipants = await Promise.all(
      event.participants.map(async (user) => {
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

    allParticipants
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
          const payment = await prisma.participantsOnEvents.findUnique({
            where: { id_eventId: { eventId: event.id, id: user.id } },
          })

          if (!payment) {
            //Send payment reminder

            usersPaymentReminder.push({ email: user.email, name: user.name })
          }
        }
      })

    usersEventReminder.forEach(async (user) => {
      console.log('sending event reminder email')
      await inngest.send({
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
        await inngest.send({
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
