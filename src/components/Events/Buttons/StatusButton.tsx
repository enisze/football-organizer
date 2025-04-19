import { setParticipatingStatus } from '@/src/app/group/[groupId]/actions'
import { Button } from '@/ui/button'
import type { Payment, UserEventStatus } from '@prisma/client'
import type { ReactNode } from 'react'
import { DeclineEventDialog } from './DeclineEventDialog'

type ValidStatus = 'JOINED' | 'CANCELED' | 'MAYBE'

type StatusButtonProps = {
	icon: ReactNode
	active: boolean
	eventId: string
	status: ValidStatus
	label: string
	payment?: Payment | null
	userStatus?: UserEventStatus
}

type StatusButtonVariant =
	| 'status-default'
	| 'status-joined'
	| 'status-maybe'
	| 'status-canceled'

export function StatusButton({
	icon,
	active,
	eventId,
	status,
	label,
	payment,
	userStatus,
}: StatusButtonProps) {
	if (status === 'CANCELED') {
		return (
			<DeclineEventDialog
				id={eventId}
				userStatus={userStatus}
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
			size="status"
			onClick={async () => {
				'use server'
				await setParticipatingStatus({ eventId, status })
			}}
			aria-label={label}
			type="button"
		>
			{icon}
			{active && (
				<span className="absolute inset-0 border-2 border-current rounded-xl opacity-50" />
			)}
		</Button>
	)
}
