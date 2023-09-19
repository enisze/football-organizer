'use client'
import { Button } from '@/ui/button'
import type { FunctionComponent } from 'react'
import { isDateInCertainRange } from '../helpers/isDateInCertainRange'
import { api } from '../server/trpc/api'

const paypalLink =
  'https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE'

export const PaymentArea: FunctionComponent<{
  eventId: string
  bookingDate: Date | null
}> = ({ eventId, bookingDate }) => {
  const { data: payment } = api.payment.getByEventId.useQuery({ eventId })

  const isInCertainRange = bookingDate
    ? isDateInCertainRange(new Date(), bookingDate)
    : false

  return (
    <>
      {(!payment && isInCertainRange) ||
        (payment && (
          <div className="flex w-full flex-col items-center justify-center gap-y-2">
            {!payment && isInCertainRange && (
              <a href={paypalLink} className="w-full">
                <Button
                  variant="outline"
                  aria-label="paypal"
                  className="w-full"
                >
                  Bezahlen per Paypal
                </Button>
              </a>
            )}
            {payment && (
              <div className="flex items-center gap-x-2">
                {payment?.amount +
                  '€  am ' +
                  payment?.paymentDate.toDateString()}
                <span>Bezahlt</span>
              </div>
            )}
          </div>
        ))}
    </>
  )
}
