'use client'

import { api } from '@/src/server/trpc/api'
import { Button } from '@/ui/button'

export const StatusButton = ({ eventId }: { eventId: string }) => {
  const trpcContext = api.useContext()

  const { mutate: setStatus, isSuccess } =
    api.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  return (
    <>
      <Button
        onClick={() => setStatus({ eventId: eventId, status: 'CANCELED' })}
        variant="outline"
      >
        Keine Emails mehr erhalten
      </Button>

      {isSuccess && (
        <span className="text-green-500">
          Du hast dich erfolgreich abgemeldet.
        </span>
      )}
    </>
  )
}
