import { NewRefreshToken } from '@/emails/NewRefreshToken'
import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import apiInstance from '../src/emails/transporter'

export const sendNewRefreshTokenMail = async ({
  link,
  email,
  name,
}: {
  link: string
  email: string
  name: string
}) => {
  const html = render(<NewRefreshToken link={link} userName={name} />)

  const sendSmptMail = new SendSmtpEmail()

  sendSmptMail.to = [{ email }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Event Wizard',
  }
  sendSmptMail.subject = 'Neues Refresh Token benötigt'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
