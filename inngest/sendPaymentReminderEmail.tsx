import PaymentReminder from '@/emails/PaymentReminder'
import { PrismaClient } from '@/prisma/generated/client'
import apiInstance from '@/src/emails/transporter'
import { render } from '@react-email/components'
import { SendSmtpEmail } from '@sendinblue/client'
import { Inngest } from 'inngest'

const prisma = new PrismaClient()
const inngest = new Inngest({ name: 'Event Wizard' })

export const sendPaymentReminderEmail = inngest.createFunction(
  { name: 'Send Payment Reminder Email' },
  { event: 'event/paymentReminderEmail' },

  async ({ event: inngestEvent, step }) => {
    const id = inngestEvent.data.id as string

    const user = inngestEvent.data.user as {
      name: string
      email: string
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true, payments: true },
    })

    if (!event) return

    const html = render(<PaymentReminder event={event} userName={user.name} />)

    const sendSmptMail = new SendSmtpEmail()

    sendSmptMail.to = [{ email: user.email }]
    sendSmptMail.htmlContent = html
    sendSmptMail.sender = {
      email: 'eniszej@gmail.com',
      name: 'Event Wizard',
    }
    sendSmptMail.subject = 'Erinnerung: Fussball bezahlen'

    await apiInstance.sendTransacEmail(sendSmptMail)
  },
)
