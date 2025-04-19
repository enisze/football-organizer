import {
	isOwnerOfGroupOfEvent,
	revalidateGroup,
} from '@/src/helpers/isOwnerOfGroup'
import { prisma } from '@/src/server/db/client'
import { Button } from '@/ui/button'
import { BookEventButton } from './Buttons/BookEventButton'
import { RemindButton } from './Buttons/RemindButton'
import { deleteEventAction } from './Buttons/actions'

type EventCardAdminAreaProps = {
	eventId: string
}

export const EventCardAdminArea = async ({
	eventId,
}: EventCardAdminAreaProps) => {
	const isOwner = await isOwnerOfGroupOfEvent(eventId)

	if (!isOwner) return null

	const participantsWithoutPayment = await prisma.participantsOnEvents.findMany(
		{
			where: { eventId, paymentId: { not: null } },
		},
	)

	const payments = await Promise.all(
		participantsWithoutPayment.map(async (participant) => {
			const user = await prisma.user.findUnique({
				where: { id: participant.id },
			})

			const paymentId = participant.paymentId

			if (!paymentId) throw new Error('NOT_FOUND')

			const payment = await prisma.payment.findUnique({
				where: { id: paymentId },
			})

			return {
				id: paymentId,
				user,
				amount: payment?.amount,
				paymentDate: payment?.paymentDate,
			}
		}),
	)

	return (
		<div className="space-y-3">
			{payments && payments.length > 0 && (
				<div className="flex flex-col items-center gap-y-3">
					<span className="text-slate-400">
						Bezahlt aber nicht teilgenommen
					</span>
					{payments.map((payment) => {
						if (!payment || !payment?.user) return null
						return (
							<div key={payment.id}>
								<div
									key={payment.id}
									className="flex items-center gap-x-2 text-slate-300"
								>
									<div>{payment?.user.name}</div>
									<div>{`${payment?.amount} €`}</div>
									<div>{payment?.paymentDate?.toDateString()}</div>
									<div className="text-emerald-400">Bezahlt</div>
								</div>
							</div>
						)
					})}
				</div>
			)}

			<form className="w-full flex flex-col gap-y-3">
				<Button
					variant="dark-danger"
					formAction={async () => {
						'use server'
						await deleteEventAction({
							id: eventId,
						})
					}}
				>
					Delete
				</Button>
				<RemindButton id={eventId} />
				<BookEventButton id={eventId} />
				<Button
					variant="dark-warning"
					formAction={async () => {
						'use server'
						const event = await prisma.event.findUnique({
							where: { id: eventId },
							select: { groupId: true },
						})

						await prisma.event.update({
							data: { status: 'CANCELED', bookingDate: null },
							where: { id: eventId },
						})

						if (event?.groupId) {
							revalidateGroup(event.groupId)
						}
					}}
				>
					Cancel Event
				</Button>
			</form>
		</div>
	)
}
