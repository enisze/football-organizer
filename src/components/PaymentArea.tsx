import { Button } from '@/ui/button'
import { isDateInCertainRange } from '../helpers/isDateInCertainRange'
import { getServerComponentAuthSession } from '../server/auth/authOptions'

import { prisma } from '../server/db/client'

const paypalLink =
  'https://www.paypal.com/paypalme/enz1994?country.x=DE&locale.x=de_DE'

export const PaymentArea = async ({
  eventId,
  bookingDate,
}: {
  eventId: string
  bookingDate: Date | null
}) => {
  const session = await getServerComponentAuthSession()

  const isAdmin = session?.user?.role === 'ADMIN'

  const payment = await prisma.payment.findFirst({
    where: { eventId, userId: session?.user?.id },
  })
  if (!isAdmin) return null

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
