import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/base/Dialog'
import { TRPCError } from '@trpc/server'
import { Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { QuestionMark } from '../../QuestionMark'
import { DeclineEventDialog } from './DeclineEventDialog'

export const EventStatusArea: FunctionComponent<{
  id: string
}> = ({ id }) => {
  const trpcContext = trpc.useContext()

  const { data: session } = useSession()

  const { data } = trpc.event.getParticipants.useQuery({
    eventId: id,
  })

  const [showLeaveModal, setShowLeaveModal] = useState(false)

  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation()

  const { mutate: setEventStatus } =
    trpc.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  if (!data) return null

  const { participants } = data

  const userStatus = participants.find(
    (participant) => participant.user.id === session?.user?.id,
  )?.userEventStatus

  const checkMarkColor = userStatus === 'JOINED' ? 'text-green-500' : ''
  const maybeMarkColor = userStatus === 'MAYBE' ? '!fill-yellow-500' : ''

  const join = () => {
    try {
      setEventStatus({ eventId: id, status: 'JOINED' })
    } catch (error) {
      if (error instanceof TRPCError) {
        error.code === 'PRECONDITION_FAILED'
      }
      alert('Leider ist kein Platz mehr frei :( ')
    }
  }

  const maybe = () => {
    setEventStatus({ eventId: id, status: 'MAYBE' })
  }

  return (
    <Dialog
      open={showLeaveModal}
      onOpenChange={(open) => setShowLeaveModal(open)}
    >
      <span>Mein Status:</span>
      <div className="flex gap-x-1 w-full">
        <Button
          aria-label="join-button"
          variant="outline"
          onClick={join}
          className="w-full"
        >
          <Check className={checkMarkColor} />
        </Button>

        <Button
          aria-label="maybe-button"
          variant="outline"
          onClick={maybe}
          className="w-full"
        >
          <QuestionMark
            className={`fill-black dark:fill-white ${maybeMarkColor}`}
          />
        </Button>

        <DeclineEventDialog
          id={id}
          userStatus={userStatus}
          setShowLeaveModal={() => setShowLeaveModal(true)}
        />
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 id="modal-title">Event absagen</h2>
          </DialogTitle>
          <DialogDescription>
            <h2 id="modal-title" className="pr-10">
              Du hast bereits bezahlt, bist du dir sicher, dass du absagen
              willst?
            </h2>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-x-2">
          <Button
            variant="outline"
            color="info"
            onClick={() => {
              setEventStatus({ eventId: id, status: 'CANCELED' })
              sendEmail({ eventId: id })
              setShowLeaveModal(false)
            }}
            className="w-full"
          >
            Ja
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setShowLeaveModal(false)
            }}
            className="w-full"
          >
            Nein
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
