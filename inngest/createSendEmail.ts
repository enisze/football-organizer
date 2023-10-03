import apiInstance from '@/src/emails/transporter'

//@ts-expect-error - Astro doesn't know about the request object
import Brevo from '@getbrevo/brevo'

export const sendEmail = async (
  email: string,
  html: string,
  subject: string,
) => {
  const sendSmtpMail = new Brevo.SendSmtpEmail()

  sendSmtpMail.to = [{ email }]
  sendSmtpMail.htmlContent = html
  sendSmtpMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Event Wizard',
  }
  sendSmtpMail.subject = subject

  return await apiInstance.sendTransacEmail(sendSmtpMail)
}

sendEmail('eniszej@gmail.com', '<h1>Test</h1>', 'Test')
