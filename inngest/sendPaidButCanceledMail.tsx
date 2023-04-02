import { PaidButCanceled } from '@/emails/PaidButCanceled'
import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import type { Event, User } from '../prisma/generated/client'
import apiInstance from '../src/emails/transporter'

export const sendPaidButCanceledMail = async (
  event: Event | null,
  user: User | null,
  owner: Pick<User, 'email' | 'name'> | null,
) => {
  const html = render(
    <PaidButCanceled
      event={{
        ...event,
        date: event?.date ? new Date(event.date) : new Date(),
      }}
      participantName={user?.name ?? ''}
      userName={owner?.name ?? ''}
    />,
  )

  const sendSmptMail = new SendSmtpEmail()

  sendSmptMail.to = [{ email: owner?.email ?? '' }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Event Wizard',
  }
  sendSmptMail.subject = 'BEZAHLUNG TROTZ ABSAGE'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
