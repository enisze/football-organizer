import apiInstance from '@/src/emails/transporter'
import { SendSmtpEmail } from '@sendinblue/client'

export const sendEmail = async (
	email: string,
	html: string,
	subject: string
) => {
	const sendSmptMail = new SendSmtpEmail()

	sendSmptMail.to = [{ email }]
	sendSmptMail.htmlContent = html
	sendSmptMail.sender = {
		email: 'eniszej@gmail.com',
		name: 'Event Wizard'
	}
	sendSmptMail.subject = subject

	return await apiInstance.sendTransacEmail(sendSmptMail)
}
