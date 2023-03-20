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

  const footballEvent = await prisma.event.findUnique({
    where: { id },
    include: { participants: true, payments: true },
  })

  if (!footballEvent)
    return {
      message: 'No football event',
    }

  const { participants } = footballEvent

  //Ids which are available
  const canceledParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
    'CANCELED',
  )

  const joinedParticipantIds = getParticipantIdsByStatus(
    footballEvent.participants,
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
        participants.length < footballEvent.maxParticipants
      ) {
        //Send event reminder

        const html = render(
          <EventReminder
            event={footballEvent}
            userName={user.name}
            participantsAmount={joinedParticipantIds.length}
          />,
        )

        const sendSmptMail = new SendSmtpEmail()

        const days = differenceInCalendarDays(footballEvent.date, new Date())

        sendSmptMail.to = [{ email: user.email }]
        sendSmptMail.htmlContent = html
        sendSmptMail.sender = {
          email: 'eniszej@gmail.com',
          name: 'Football Organizer',
        }
        sendSmptMail.subject = `Erinnerung: Fussball in ${days} Tagen, ${joinedParticipantIds.length}/${footballEvent.maxParticipants} Teilnehmer!`

        usersEventReminder.push(user.email)

        return apiInstance.sendTransacEmail(sendSmptMail)
      }

      if (footballEvent.bookingDate && joinedParticipantIds.includes(user.id)) {
        const payment = footballEvent.payments.find(
          (payment) => payment.userId === user.id,
        )

        if (!payment) {
          //Send payment reminder

          const html = render(
            <PaymentReminder event={footballEvent} userName={user.name} />,
          )

          const sendSmptMail = new SendSmtpEmail()

          sendSmptMail.to = [{ email: user.email }]
          sendSmptMail.htmlContent = html
          sendSmptMail.sender = {
            email: 'eniszej@gmail.com',
            name: 'Football Organizer',
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
