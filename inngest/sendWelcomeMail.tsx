import { WelcomeEmail } from '@/emails/Welcome'
import { render } from '@react-email/render'
import { sendEmail } from './createSendEmail'

export const sendWelcomeMail = async ({
	email,
	name,
}: {
	email: string
	name: string
}) => {
	const html = await render(<WelcomeEmail userFirstname={name ?? ''} />)

	if (!email) return { success: false }

	const { response } = await sendEmail(
		email,
		html,
		'Erfolgreich Registriert :)',
	)

	console.log(`Message sent to: ${JSON.stringify(email)}`)

	return { success: response.statusCode === 201 }
}
