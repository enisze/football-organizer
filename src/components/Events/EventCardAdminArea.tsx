import {
	isOwnerOfGroupOfEvent,
	revalidateGroup,
} from '@/src/helpers/isOwnerOfGroup'
import { prisma } from '@/src/server/db/client'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { Button } from '@/ui/button'
import { Settings } from 'lucide-react'
import { BookEventButton } from './Buttons/BookEventButton'
import { RemindButton } from './Buttons/RemindButton'
import { RemoveTemplateButton } from './Buttons/RemoveTemplateButton'
import { deleteEventAction } from './Buttons/actions'

type EventCardAdminAreaProps = {
	eventId: string
	isTemplate?: boolean
}

export const EventCardAdminArea = async ({
	eventId,
	isTemplate,
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
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value="admin-area" className="border-none">
				<AccordionTrigger className="p-0 hover:no-underline">
					<div className="flex items-center gap-2">
						<Settings className="h-4 w-4 text-slate-400" />
						<span className="text-slate-400 font-medium text-sm">
							Admin Area
						</span>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-4 pt-4">
						<div className="text-xs font-mono text-slate-500">
							Event ID: {eventId}
						</div>

						{payments && payments.length > 0 && (
							<div className="space-y-2">
								<span className="text-sm text-slate-400 block">
									Bezahlt aber nicht teilgenommen
								</span>
								<div className="space-y-2 bg-slate-800/50 rounded-lg p-3">
									{payments.map((payment) => {
										if (!payment || !payment?.user) return null
										return (
											<div
												key={payment.id}
												className="flex items-center justify-between text-sm"
											>
												<span className="text-slate-300">
													{payment?.user.name}
												</span>
												<div className="flex items-center gap-3">
													<span className="text-slate-400">{`${payment?.amount} €`}</span>
													<span className="text-xs text-slate-500">
														{payment?.paymentDate?.toLocaleDateString()}
													</span>
													<span className="text-emerald-400 text-xs">
														Bezahlt
													</span>
												</div>
											</div>
										)
									})}
								</div>
							</div>
						)}

						<div className="space-y-2">
							<span className="text-sm text-slate-400 block">
								Event Management
							</span>
							<div className="flex flex-col gap-2">
								<RemindButton id={eventId} />
								<BookEventButton id={eventId} />
								{isTemplate && <RemoveTemplateButton id={eventId} />}
								<Button
									variant="dark-warning"
									size="sm"
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
								<Button
									variant="dark-danger"
									size="sm"
									formAction={async () => {
										'use server'
										await deleteEventAction({
											id: eventId,
										})
									}}
								>
									Delete Event
								</Button>
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
