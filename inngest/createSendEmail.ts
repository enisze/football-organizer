import { default as mailerSend } from '@/src/emails/transporter'
import { EmailParams, Recipient, Sender } from 'mailersend'

export const sendEmail = async (
  email: string,
  html: string,
  subject: string,
) => {
  const sentFrom = new Sender('eniszej@gmail.com', 'Event Wizard')

  const recipients = [new Recipient(email)]

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(html)

  const res = await mailerSend.email.send(emailParams)

  return res
}
