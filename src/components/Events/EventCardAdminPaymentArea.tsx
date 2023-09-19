import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'

import { prisma } from '@/src/server/db/client'

type EventCardAdminPaymentAreaProps = {
  eventId: string
  userId: string
}

export const EventCardAdminPaymentArea = async ({
  eventId,
  userId,
}: EventCardAdminPaymentAreaProps) => {
  const session = await getServerComponentAuthSession()

  const isAdmin = session?.user?.role === 'ADMIN'

  const payment = await prisma.payment.findFirst({
    where: { eventId, userId },
  })
  if (!isAdmin) return null

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
