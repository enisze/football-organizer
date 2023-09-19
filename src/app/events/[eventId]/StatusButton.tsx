import { Button } from '@/ui/button'
import { setParticipatingStatus } from '../../group/[groupId]/actions'

export const StatusButton = ({ eventId }: { eventId: string }) => {
  return (
    <form>
      <Button
        formAction={async () => {
          'use server'

          await setParticipatingStatus({ eventId: eventId, status: 'CANCELED' })
        }}
        variant="outline"
      >
        Keine Emails mehr erhalten
      </Button>

      {/*  TODO: ADD THIS BACK{isSuccess && (
        <span className="text-green-500">
          Du hast dich erfolgreich abgemeldet.
        </span>
      )} */}
    </form>
  )
}
