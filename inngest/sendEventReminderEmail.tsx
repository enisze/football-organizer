import EventReminder from '@/emails/EventReminder'
import { PrismaClient } from '@/prisma/generated/client'
import apiInstance from '@/src/emails/transporter'
import { render } from '@react-email/components'
import { SendSmtpEmail } from '@sendinblue/client'
import { differenceInCalendarDays } from 'date-fns'
import { Inngest } from 'inngest'

const prisma = new PrismaClient()
const inngest = new Inngest({ name: 'Event Wizard' })

export const sendEventReminderEmail = inngest.createFunction(
  { name: 'Send Event Reminder Email' },
  { event: 'event/reminderEmail' },

  async ({ event: inngestEvent, step }) => {
    const id = inngestEvent.data.id as string

    const users = inngestEvent.data.usersEventReminder as {
      name: string
      email: string
    }[]

    const participantsAmount = inngestEvent.data.participantsAmount as number

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true, payments: true },
    })

    if (!event) return

    const promises = users.map(async (user) => {
      const html = render(
        <EventReminder
          event={event}
          userName={user.name}
          participantsAmount={participantsAmount}
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
      sendSmptMail.subject = `Erinnerung: Fussball in ${days} Tagen, ${participantsAmount}/${event.maxParticipants} Teilnehmer!`

      return apiInstance.sendTransacEmail(sendSmptMail)
    })

    await Promise.all(promises)
  },
)
