import NewEvent from '@/emails/NewEvent'
import { render } from '@react-email/components'
import { sendEmail } from './createSendEmail'

import { inngest } from '@/src/server/db/client'

export const sendNewEventEmail = inngest.createFunction(
  { name: 'Send new Event Email' },
  { event: 'event/newEmail' },

  async ({ event: inngestEvent, prisma, step, logger }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const days = inngestEvent.data.days as number

    const event = await step.run(
      'get event',
      async () =>
        await prisma.event.findUnique({
          where: { id },
        }),
    )

    if (!event) return

    const html = render(
      <NewEvent
        event={{
          ...event,
          date: new Date(event.date),
          bookingDate: event.bookingDate ? new Date(event.bookingDate) : null,
        }}
        userName={user.name}
      />,
    )

    const { response } = await step.run('sending mail', async () => {
      try {
        const response = await sendEmail(
          user.email,
          html,
          `NEUES FUSSBALL EVENT: In ${days} Tagen`,
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

    return response
  },
)
