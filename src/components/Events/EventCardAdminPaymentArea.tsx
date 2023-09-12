'use client'
import { api } from '@/src/server/trpc/api'
import type { FunctionComponent } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'

type EventCardAdminPaymentAreaProps = {
  eventId: string
  userId: string
}

export const EventCardAdminPaymentArea: FunctionComponent<
  EventCardAdminPaymentAreaProps
> = ({ eventId, userId }) => {
  const isAdmin = useIsAdmin()
  const { data: payment } = api.payment.getByUserAndEventId.useQuery({
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
