import EventReminder from '@/emails/EventReminder'
import { PrismaClient } from '@/prisma/generated/client'
import { render } from '@react-email/components'
import { differenceInCalendarDays } from 'date-fns'
import { Inngest } from 'inngest'
import { sendEmail } from './createSendEmail'

const prisma = new PrismaClient()
const inngest = new Inngest({ name: 'Event Wizard' })

export const sendEventReminderEmail = inngest.createFunction(
  { name: 'Send Event Reminder Email' },
  { event: 'event/reminderEmail' },

  async ({ event: inngestEvent }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const participantsAmount = inngestEvent.data.participantsAmount as number

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true, payments: true },
    })

    if (!event) return

    const html = render(
      <EventReminder
        event={event}
        userName={user.name}
        participantsAmount={participantsAmount}
      />,
    )

    const days = differenceInCalendarDays(event.date, new Date())

    const { response } = await sendEmail(
      user.email,
      html,
      `Erinnerung: Fussball in ${days} Tagen, ${participantsAmount}/${event.maxParticipants} Teilnehmer!`,
    )

    console.log(
      `Message sent to: ${JSON.stringify(user.email)}, Code : ${
        response.statusCode
      }`,
    )
  },
)
