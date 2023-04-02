import type {
  ParticipantsOnEvents,
  UserEventStatus,
} from '../prisma/generated/client'
import { PrismaClient } from '../prisma/generated/client'
import apiInstance from '../src/emails/transporter'

import EventReminder from '@/emails/EventReminder'
import PaymentReminder from '@/emails/PaymentReminder'
import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import { differenceInCalendarDays } from 'date-fns'

const prisma = new PrismaClient()

export const sendPaymentAndEventReminderEmails = async ({
  id,
}: {
  id: string
}) => {
  const allUsers = await prisma.user.findMany()

  const event = await prisma.event.findUnique({
    where: { id },
    include: { participants: true, payments: true },
  })

  if (!event)
    return {
      message: 'No event',
    }

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

  const usersEventReminder: string[] = []
  const usersPaymentReminder: string[] = []

  const promises = allUsers
    .filter((user) => user.notificationsEnabled)
    .map(async (user) => {
      //Did not interact with the event at all
      if (
        !joinedParticipantIds.includes(user.id) &&
        !canceledParticipantIds.includes(user.id) &&
        participants.length < event.maxParticipants
      ) {
        //Send event reminder

        const html = render(
          <EventReminder
            event={event}
            userName={user.name}
            participantsAmount={joinedParticipantIds.length}
          />,
        )

        const sendSmptMail = new SendSmtpEmail()

        const days = differenceInCalendarDays(event.date, new Date())

        sendSmptMail.to = [{ email: user.email }]
        sendSmptMail.htmlContent = html
        sendSmptMail.sender = {
          email: 'eniszej@gmail.com',
          name: 'Event Wizard',
        }
        sendSmptMail.subject = `Erinnerung: Fussball in ${days} Tagen, ${joinedParticipantIds.length}/${event.maxParticipants} Teilnehmer!`

        usersEventReminder.push(user.email)

        return apiInstance.sendTransacEmail(sendSmptMail)
      }

      if (event.bookingDate && joinedParticipantIds.includes(user.id)) {
        const payment = event.payments.find(
          (payment) => payment.userId === user.id,
        )

        if (!payment) {
          //Send payment reminder

          const html = render(
            <PaymentReminder event={event} userName={user.name} />,
          )

          const sendSmptMail = new SendSmtpEmail()

          sendSmptMail.to = [{ email: user.email }]
          sendSmptMail.htmlContent = html
          sendSmptMail.sender = {
            email: 'eniszej@gmail.com',
            name: 'Event Wizard',
          }
          sendSmptMail.subject = 'Erinnerung: Fussball bezahlen'

          usersPaymentReminder.push(user.email)

          return apiInstance.sendTransacEmail(sendSmptMail)
        }
      }
    })

  const responses = await Promise.all(promises)

  const codes = responses.map((res) =>
    res
      ? res.response.statusCode + ' ' + res.response.statusMessage
      : 'No status',
  )

  console.log(
    `Event reminders: ${JSON.stringify(
      usersEventReminder,
    )}, Payment reminders: ${usersPaymentReminder},
    Message results: ${codes}`,
  )
  return {
    success: true,
  }
}

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
