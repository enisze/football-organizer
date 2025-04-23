import { setParticipatingStatus } from '@/src/app/group/[groupId]/actions'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { Button } from '@/ui/button'
import type { ReactNode } from 'react'
import { DeclineEventDialog } from './DeclineEventDialog'

type ValidStatus = 'JOINED' | 'CANCELED' | 'MAYBE'

type StatusButtonProps = {
	icon: ReactNode
	eventId: string
	status: ValidStatus
	label: string
}

type StatusButtonVariant =
	| 'status-default'
	| 'status-joined'
	| 'status-maybe'
	| 'status-canceled'

export async function StatusButton({
	icon,
	eventId,
	status,
	label,
}: StatusButtonProps) {
	const session = await serverAuth()
	const participant = await prisma.participantsOnEvents.findFirst({
		where: {
			eventId,
			user: {
				id: session?.user?.id,
			},
		},
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

	const payment = await prisma.payment.findFirst({
		where: { eventId, userId: session?.user?.id },
	})

	const active = participant?.userEventStatus === status

	if (status === 'CANCELED') {
		return (
			<DeclineEventDialog
				id={eventId}
				userStatus={participant?.userEventStatus}
				payment={payment ?? null}
			/>
		)
	}

	const statusVariant = active
		? (`status-${status.toLowerCase()}` as StatusButtonVariant)
		: ('status-default' as const)

	return (
		<Button
			variant={statusVariant}
			size='status'
			onClick={async () => {
				'use server'
				await setParticipatingStatus({ eventId, status })
			}}
			aria-label={label}
			type='button'
		>
			{icon}
			{active && (
				<span className='absolute inset-0 border-2 border-current rounded-xl opacity-50' />
			)}
		</Button>
	)
}
