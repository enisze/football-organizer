import NewEvent from '@/emails/NewEvent'
import { PrismaClient } from '@/prisma/generated/client'
import { render } from '@react-email/components'
import { Inngest } from 'inngest'
import { sendEmail } from './createSendEmail'

const prisma = new PrismaClient()
const inngest = new Inngest({ name: 'Event Wizard' })

export const sendNewEventEmail = inngest.createFunction(
  { name: 'Send new Event Email' },
  { event: 'event/newEmail' },

  async ({ event: inngestEvent }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const days = inngestEvent.data.days as number

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true, payments: true },
    })

    if (!event) return

    const html = render(<NewEvent event={event} userName={user.name} />)

    const { response } = await sendEmail(
      user.email,
      html,
      `NEUES FUSSBALL EVENT: In ${days} Tagen`,
    )

    console.log(
      `Message sent to: ${JSON.stringify(user.email)}, Code : ${
        response.statusCode
      }`,
    )
  },
)
