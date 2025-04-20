import { PaidButCanceled } from '@/emails/PaidButCanceled'
import type { Event, User } from '@prisma/client'
import { render } from '@react-email/render'
import { sendEmail } from './createSendEmail'

export const sendPaidButCanceledMail = async (
	event: Event | null,
	user: User | null,
	owner: Pick<User, 'email' | 'name'> | null,
) => {
	const html = await render(
		<PaidButCanceled
			event={{
				...event,
				date: event?.date ? new Date(event.date) : new Date(),
			}}
			participantName={user?.name ?? ''}
			userName={owner?.name ?? ''}
		/>,
	)

	if (!owner) return { success: false }

	const { response } = await sendEmail(
		owner.email,
		html,
		'BEZAHLUNG TROTZ ABSAGE',
	)

	console.log(
		`Message sent to: ${JSON.stringify(owner.email)}, Code : ${
			response.statusCode
		}`,
	)

	return { success: response.statusCode === 201 }
}
