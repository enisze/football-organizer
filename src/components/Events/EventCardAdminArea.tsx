import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/button'
import { SessionProvider } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useIsAdmin } from '../../hooks/useIsAdmin'
import { LoadingWrapper } from '../LoadingWrapper'
import { BookEventButton } from './Buttons/BookEventButton'
import { DeleteEventButton } from './Buttons/DeleteEventButton'

type EventCardAdminAreaProps = {
  eventId: string
}

const EventCardAdminAreaRaw: FunctionComponent<EventCardAdminAreaProps> = ({
  eventId,
}) => {
  const isAdmin = useIsAdmin()
  const trpcContext = trpc.useContext()

  const { mutate: remind, isLoading: loadingRemind } =
    trpc.gmail.sendPaymentAndEventReminder.useMutation({
      onSuccess: () => trpcContext.invalidate(),
    })
  const { mutate: cancel, isLoading: loadingCancel } =
    trpc.event.cancel.useMutation({
      onSuccess: () => trpcContext.invalidate(),
    })

  const { data: payments, isLoading } =
    trpc.payment.getAllPaymentsForEventFromNotParticipants.useQuery(
      { eventId },
      { enabled: isAdmin },
    )

  if (!isAdmin) return null

  return (
    <>
      <div className="flex flex-col items-center gap-y-3">
        <span>{'Id: ' + eventId}</span>
        <LoadingWrapper isLoading={isLoading}>
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
        </LoadingWrapper>
      </div>
      <DeleteEventButton id={eventId} />

      <LoadingWrapper isLoading={loadingRemind}>
        <Button variant="outline" onClick={() => remind({ eventId })}>
          Remind
        </Button>
      </LoadingWrapper>
      <BookEventButton id={eventId} />
      <LoadingWrapper isLoading={loadingCancel}>
        <Button variant="outline" onClick={() => cancel({ id: eventId })}>
          Cancel Event
        </Button>
      </LoadingWrapper>
    </>
  )
}

export const EventCardAdminArea: FunctionComponent<EventCardAdminAreaProps> = ({
  eventId,
}) => {
  return (
    <SessionProvider>
      <EventCardAdminAreaRaw eventId={eventId} />
    </SessionProvider>
  )
}
