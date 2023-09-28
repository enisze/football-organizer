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

  const payment = await prisma.payment.findFirst({
    where: { eventId, userId: session?.user?.id },
  })

  const isInCertainRange = bookingDate
    ? isDateInCertainRange(new Date(), bookingDate)
    : false

  if (!isInCertainRange) return null

  if (payment)
    return (
      <div className="flex items-center gap-x-2 text-green-500 font-bold">
        {payment?.amount +
          '€  am ' +
          payment?.paymentDate.toLocaleDateString('de')}
        <span>Bezahlt</span>
      </div>
    )

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <a href={paypalLink} className="w-full">
        <Button variant="outline" aria-label="paypal" className="w-full">
          Bezahlen per Paypal
        </Button>
      </a>
    </div>
  )
}
