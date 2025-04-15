import PaymentReminder from '@/emails/PaymentReminder'
import { render } from '@react-email/components'
import { sendEmail } from './createSendEmail'

import { inngest } from '@/src/server/db/client'

export const sendPaymentReminderEmail = inngest.createFunction(
	{ id: 'send-payment-reminder-email' },
	{ event: 'event/paymentReminderEmail' },

	async ({ event: inngestEvent, prisma, step, logger }) => {
		const id = inngestEvent.data.id as string

		const user = inngestEvent.data.user as {
			name: string
			email: string
		}

		const event = await step.run(
			'get event',
			async () =>
				await prisma.event.findUnique({
					where: { id },
					include: { participants: true },
				}),
		)

		if (!event) return

		const html = render(
			<PaymentReminder
				event={{
					...event,
					date: new Date(event.date),
					bookingDate: event.bookingDate ? new Date(event.bookingDate) : null,
				}}
				userName={user.name}
			/>,
		)

		const { response } = await step.run('sending mail', async () => {
			try {
				const response = await sendEmail(
					user.email,
					html,
					'Erinnerung: Fussball bezahlen',
				)

				return response
			} catch (error: unknown) {
				console.log(error)

				return { response: null }
			}
		})

		logger.info(
			`Message sent to: ${JSON.stringify(
				user.email,
			)}, Code : ${response?.statusCode}`,
		)

		return response
	},
)
