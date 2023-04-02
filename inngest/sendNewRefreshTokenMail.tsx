import { NewRefreshToken } from '@/emails/NewRefreshToken'
import { render } from '@react-email/render'
import { SendSmtpEmail } from '@sendinblue/client'
import apiInstance from '../src/emails/transporter'

export const sendNewRefreshTokenMail = async ({
  link,
  email,
}: {
  link: string
  email: string
}) => {
  //TODO: send username of the owner of the group here
  const html = render(<NewRefreshToken link={link} userName="" />)

  const sendSmptMail = new SendSmtpEmail()

  sendSmptMail.to = [{ email }]
  sendSmptMail.htmlContent = html
  sendSmptMail.sender = {
    email: 'eniszej@gmail.com',
    name: 'Football Organizer',
  }
  sendSmptMail.subject = 'Neues Refresh Token benötigt'

  const res = await apiInstance.sendTransacEmail(sendSmptMail)

  return { success: res.response.statusCode === 201 }
}
