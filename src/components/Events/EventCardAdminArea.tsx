import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { inngest, prisma } from '@/src/server/db/client'
import { Button } from '@/ui/button'
import { BookEventButton } from './Buttons/BookEventButton'
import { DeleteEventButton } from './Buttons/DeleteEventButton'

type EventCardAdminAreaProps = {
  eventId: string
}

export const EventCardAdminArea = async ({
  eventId,
}: EventCardAdminAreaProps) => {
  const session = await getServerComponentAuthSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  const participantsWithoutPayment = await prisma.participantsOnEvents.findMany(
    {
      where: { eventId, paymentId: { not: null } },
    },
  )

  const payments = await Promise.all(
    participantsWithoutPayment.map(async (participant) => {
      const user = await prisma.user.findUnique({
        where: { id: participant.id },
      })

      const paymentId = participant.paymentId

      if (!paymentId) throw new Error('NOT_FOUND')

      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      })

      return {
        id: paymentId,
        user,
        amount: payment?.amount,
        paymentDate: payment?.paymentDate,
      }
    }),
  )

  if (!isAdmin) return null

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        <span>{'Id: ' + eventId}</span>
        {payments && payments.length > 0 && (
          <>
            <span>Bezahlt aber nicht teilgenommen</span>
            {payments.map((payment) => {
              if (!payment || !payment?.user) return null
              return (
                <div key={payment.id}>
                  <div key={payment.id} className="flex items-center gap-x-2">
                    <div>{payment?.user.name}</div>
                    <div>{payment?.amount + ' €'}</div>
                    <div>{payment?.paymentDate?.toDateString()}</div>
                    <div color="success">Bezahlt</div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
      <DeleteEventButton id={eventId} />

      <Button
        variant="outline"
        formAction={async () => {
          'use server'

          await inngest.send({
            name: 'event/reminder',
            data: {
              id: eventId,
            },
          })
        }}
      >
        Remind
      </Button>
      <BookEventButton id={eventId} />
      <Button
        variant="outline"
        onClick={async () => {
          'use server'
          await prisma.event.update({
            data: { status: 'CANCELED', bookingDate: null },
            where: { id: eventId },
          })
        }}
      >
        Cancel Event
      </Button>
    </>
  )
}
