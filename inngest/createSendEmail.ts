import { resend } from '@/src/emails/transporter'

export const sendEmail = async (
  email: string,
  html: string,
  subject: string,
) => {
  try {
    const res = await resend.emails.send({
      from: 'eniszej@gmail.com',
      to: [email],
      subject,
      html,
    })

    return res
  } catch (e) {
    console.log(e)
  }
}
