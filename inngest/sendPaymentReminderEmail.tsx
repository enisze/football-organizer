import PaymentReminder from '@/emails/PaymentReminder'
import { render } from '@react-email/components'
import { sendEmail } from './createSendEmail'

import { inngest, prisma } from '@/src/server/db/client'

export const sendPaymentReminderEmail = inngest.createFunction(
  { name: 'Send Payment Reminder Email' },
  { event: 'event/paymentReminderEmail' },

  async ({ event: inngestEvent }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true },
    })

    if (!event) return

    const html = render(<PaymentReminder event={event} userName={user.name} />)

    const { response } = await sendEmail(
      user.email,
      html,
      'Erinnerung: Fussball bezahlen',
    )

    console.log(
      `Message sent to: ${JSON.stringify(user.email)}, Code : ${
        response.statusCode
      }`,
    )
  },
)
