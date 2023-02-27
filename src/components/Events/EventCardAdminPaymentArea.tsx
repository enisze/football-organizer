import type { FunctionComponent } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { trpc } from '../../utils/trpc'

type EventCardAdminPaymentAreaProps = {
  eventId: string
  userId: string
}

export const EventCardAdminPaymentArea: FunctionComponent<
  EventCardAdminPaymentAreaProps
> = ({ eventId, userId }) => {
  const isAdmin = useIsAdmin()
  const { data: payment } = trpc.payment.getByUserAndEventId.useQuery({
    eventId,
    userId,
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
