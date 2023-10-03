import EventReminder from '@/emails/EventReminder'
import { inngest } from '@/src/server/db/client'
import { render } from '@react-email/components'
import { differenceInCalendarDays } from 'date-fns'
import { sendEmail } from './createSendEmail'

export const sendEventReminderEmail = inngest.createFunction(
  { name: 'Send Event Reminder Email' },
  { event: 'event/reminderEmail' },

  async ({ event: inngestEvent, prisma, step, logger }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const participantsAmount = inngestEvent.data.participantsAmount as number

    const event = await step.run(
      'get event',
      async () =>
        await prisma.event.findUnique({
          where: { id },
          include: { participants: true },
        }),
    )

    if (!event) return

    const html = render(
      <EventReminder
        event={{
          ...event,
          date: new Date(event.date),
          bookingDate: event.bookingDate ? new Date(event.bookingDate) : null,
          createdAt: new Date(event.createdAt),
          updatedAt: new Date(event.updatedAt),
        }}
        userName={user.name}
        participantsAmount={participantsAmount}
      />,
    )

    const days = differenceInCalendarDays(new Date(event.date), new Date())

    const { response } = await step.run('sending mail', async () => {
      try {
        const response = await sendEmail(
          user.email,
          html,
          `Erinnerung: Fussball in ${days} Tagen, ${participantsAmount}/${event.maxParticipants} Teilnehmer!`,
        )

        return response
      } catch (error: unknown) {
        console.log(error)

        return { response: null }
      }
    })

    logger.info(
      `Message sent to: ${JSON.stringify(
        user.email,
      )}, Code : ${response?.statusCode}`,
    )
  },
)
