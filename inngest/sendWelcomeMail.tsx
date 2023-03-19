import { WelcomeEmail } from '@/emails/Welcome'
import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import type { User } from '../prisma/generated/client'
import apiInstance from '../src/emails/transporter'

export const sendWelcomeMail = async (user: User | null) => {
  const html = render(<WelcomeEmail userFirstname={user?.name ?? ''} />)

  const sendSmptMail = new SendSmtpEmail()

  sendSmptMail.to = [{ email: user?.email ?? '' }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Football Organizer',
  }
  sendSmptMail.subject = 'Erfolgreich Registriert :)'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
