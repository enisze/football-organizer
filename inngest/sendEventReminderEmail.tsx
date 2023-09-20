import EventReminder from '@/emails/EventReminder'
import { inngest, prisma } from '@/src/server/db/client'
import { render } from '@react-email/components'
import { differenceInCalendarDays } from 'date-fns'
import { sendEmail } from './createSendEmail'

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
      include: { participants: true },
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
