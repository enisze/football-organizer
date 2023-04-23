import { NewRefreshToken } from '@/emails/NewRefreshToken'
import { render } from '@react-email/render'
import { sendEmail } from './createSendEmail'

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

  const { response } = await sendEmail(
    email,
    html,
    'Neues Refresh Token benötigt',
  )

  console.log(`Message sent to: ${JSON.stringify(email)}`)

  return { success: response.statusCode === 201 }
}
