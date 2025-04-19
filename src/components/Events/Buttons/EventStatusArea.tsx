import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { Check, X } from 'lucide-react'
import { QuestionMark } from '../../QuestionMark'
import { StatusButton } from './StatusButton'

export const EventStatusArea = async ({ id }: { id: string }) => {
	const session = await serverAuth()

	const participants = await prisma.participantsOnEvents.findMany({
		where: { eventId: id },
		select: {
			userEventStatus: true,
			comment: true,
			user: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	})

	const userStatus = participants.find(
		(participant) => participant.user.id === session?.user?.id,
	)?.userEventStatus

	const payment = await prisma.payment.findFirst({
		where: { eventId: id, userId: session?.user?.id },
	})

	return (
		<div className="px-2">
			<div className="text-sm font-medium text-slate-400 mb-2">
				Mein Status:
			</div>
			<div className="grid grid-cols-3 gap-3">
				<StatusButton
					icon={<Check className="w-5 h-5" />}
					active={userStatus === 'JOINED'}
					eventId={id}
					status="JOINED"
					label="Attending"
				/>
				<StatusButton
					icon={<QuestionMark className="w-5 h-5" />}
					active={userStatus === 'MAYBE'}
					eventId={id}
					status="MAYBE"
					label="Maybe"
				/>
				<StatusButton
					icon={<X className="w-5 h-5" />}
					active={userStatus === 'CANCELED'}
					eventId={id}
					status="CANCELED"
					label="Declined"
					payment={payment}
					userStatus={userStatus}
				/>
			</div>
		</div>
	)
}
