import { Button } from '@/ui/base/Button'
import type { FunctionComponent } from 'react'
import { isDateInCertainRange } from '../helpers/isDateInCertainRange'
import { trpc } from '../utils/trpc'

const paypalLink =
  'https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE'

export const PaymentArea: FunctionComponent<{
  eventId: string
  bookingDate: Date | null
}> = ({ eventId, bookingDate }) => {
  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId })

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
                <Button variant="outline" className="w-full">
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
