import EventReminder from '@/emails/EventReminder'
import { inngest } from '@/src/server/db/client'
import { render } from '@react-email/components'
import { differenceInCalendarDays } from 'date-fns'
import { sendEmail } from './createSendEmail'
import { getParticipantIdsByStatus } from './triggerPaymentAndEventReminder'

export const sendEventReminderEmail = inngest.createFunction(
	{ id: 'send-event-reminder-email' },
	{ event: 'event/reminderEmail' },

	async ({ event: inngestEvent, prisma, step, logger }) => {
		const id = inngestEvent.data?.id

		const user = inngestEvent.data?.user as {
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

		const participantsAmount = getParticipantIdsByStatus(
			event.participants,
			'JOINED',
		).length

		const html = await render(
			<EventReminder
				event={{
					...event,
					date: new Date(event.date),
					bookingDate: event.bookingDate ? new Date(event.bookingDate) : null,
				}}
				userName={user.name}
				participantsAmount={participantsAmount}
			/>,
		)

		const days = differenceInCalendarDays(new Date(event.date), new Date())

		const { response } = await step.run('sending mail', async () => {
			try {
				const response = await sendEmail(
					user.email,
					html,
					`Erinnerung: Fussball in ${days} Tagen, ${participantsAmount}/${event.maxParticipants} Teilnehmer!`,
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
	},
)
