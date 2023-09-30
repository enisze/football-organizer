import { WelcomeEmail } from '@/emails/Welcome'
import { render } from '@react-email/render'
import type { User } from '../prisma/generated/client'
import { sendEmail } from './createSendEmail'

export const sendWelcomeMail = async (user: User | null) => {
  const html = render(<WelcomeEmail userFirstname={user?.name ?? ''} />)

  if (!user?.email) return { success: false }

  const { statusCode } = await sendEmail(
    user.email,
    html,
    'Erfolgreich Registriert :)',
  )

  console.log(`Message sent to: ${JSON.stringify(user.email)}`)

  return { success: statusCode === 201 }
}
