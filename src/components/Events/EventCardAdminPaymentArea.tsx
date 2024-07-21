import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'

import { prisma } from '@/src/server/db/client'

type EventCardAdminPaymentAreaProps = {
	eventId: string
	userId: string
}

export const EventCardAdminPaymentArea = async ({
	eventId,
	userId
}: EventCardAdminPaymentAreaProps) => {
	const isOwner = await isOwnerOfGroup()

	if (!isOwner) return null

	const payment = await prisma.payment.findFirst({
		where: { eventId, userId }
	})

	return (
		<>
			{payment && (
				<>
					<div>{payment?.amount + ' €'}</div>
					<div>{payment?.paymentDate.toDateString()}</div>
					<span>Bezahlt</span>
				</>
			)}
			{!payment && <span>Nicht bezahlt</span>}
		</>
	)
}
