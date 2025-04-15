import { WelcomeEmail } from '@/emails/Welcome'
import type { User } from '@prisma/client'
import { render } from '@react-email/render'
import { sendEmail } from './createSendEmail'

export const sendWelcomeMail = async (user: User | null) => {
	const html = render(<WelcomeEmail userFirstname={user?.name ?? ''} />)

	if (!user?.email) return { success: false }

	const { response } = await sendEmail(
		user.email,
		html,
		'Erfolgreich Registriert :)',
	)

	console.log(`Message sent to: ${JSON.stringify(user.email)}`)

	return { success: response.statusCode === 201 }
}
