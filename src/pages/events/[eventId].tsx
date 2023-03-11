import { LoginForm } from '@/src/components/Authentication/LoginForm'
import { EventCard } from '@/src/components/Events/EventCard'
import { LoadingWrapper } from '@/src/components/LoadingWrapper'
import { Button } from '@/ui/base/Button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FunctionComponent } from 'react'

import { trpc } from '../../utils/trpc'

const EventPage: FunctionComponent = () => {
  const router = useRouter()

  const id = router.query.eventId as string

  const { data, isLoading } = trpc.event.getById.useQuery(
    { id },
    { enabled: Boolean(id) },
  )
  const { status } = useSession()

  const trpcContext = trpc.useContext()

  const { mutate: setStatus, isSuccess } =
    trpc.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  if (isLoading)
    return (
      <div className="grid place-items-center h-full">
        <LoadingWrapper isLoading={isLoading} />
      </div>
    )

  if (!data) return <div>Wrong ID</div>

  const { participants, ...event } = data

  const url = process.env.NEXT_PUBLIC_BASE_URL as string

  const link = new URL(url)

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to top, #373B44, #73C8A9)',
        }}
        className="fixed -z-10 flex h-full w-full"
      />

      <div className="mx-20 flex flex-col">
        {status === 'unauthenticated' ? (
          <LoginForm />
        ) : (
          <div className="flex flex-col items-center">
            <div className="my-5 flex flex-col items-center justify-center gap-y-2 rounded p-5">
              <Button
                onClick={() =>
                  setStatus({ eventId: event.id, status: 'CANCELED' })
                }
                variant="outline"
              >
                Keine Emails mehr erhalten
              </Button>

              {isSuccess && (
                <span className="text-green-500">
                  Du hast dich erfolgreich abgemeldet.
                </span>
              )}
              <Link href={link}>
                <span>Zur Startseite</span>
              </Link>
            </div>
            <EventCard event={event} participants={participants} />
          </div>
        )}
      </div>
    </>
  )
}

export default EventPage
