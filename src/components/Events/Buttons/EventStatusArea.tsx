import type { ParticipantsOnEvents } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/base/Dialog'
import { TextField } from '@/ui/base/TextField'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { TRPCError } from '@trpc/server'
import { Check, XIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { QuestionMark } from '../../QuestionMark'

export const EventStatusArea: FunctionComponent<{
  id: string
  participants: ParticipantsOnEvents[]
}> = ({ id, participants }) => {
  const trpcContext = trpc.useContext()

  const { data: session } = useSession()

  const { mutate: setEventComment } = trpc.user.setEventComment.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const [comment, setComment] = useState('')

  const [showCommentModal, setShowCommentModal] = useState(false)

  const userStatus = participants.find(
    (user) => user.id === session?.user?.id,
  )?.userEventStatus

  const checkMarkColor = userStatus === 'JOINED' ? 'text-green-500' : ''
  const maybeMarkColor = userStatus === 'MAYBE' ? '!fill-yellow-500' : ''
  const canceledMarkColor = userStatus === 'CANCELED' ? 'text-red-500' : ''

  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation()

  const { mutate: setEventStatus } =
    trpc.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

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

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id })

  const leave = () => {
    if (!payment) {
      setEventStatus({ eventId: id, status: 'CANCELED' })
    } else {
      setShowLeaveModal(true)
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

        <Dialog
          open={showCommentModal}
          onOpenChange={(open) => setShowCommentModal(open)}
        >
          <DialogTrigger asChild>
            <Button
              aria-label="cancel-button"
              variant="outline"
              onClick={leave}
              className="w-full"
            >
              <XIcon className={canceledMarkColor} />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <h2 id="modal-title">Bitte gib einen Grund an (optional)</h2>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col w-full gap-y-2">
              <TextField
                label="Warum kannst du nicht teilnehmen?"
                text={''}
                onChange={(e) => setComment(e.target.value)}
                maxLength={35}
              />

              <Button
                variant="outline"
                color="info"
                type="submit"
                onClick={() => {
                  setEventComment({ comment, eventId: id })
                  setShowCommentModal(false)
                }}
                className="w-full"
              >
                Speichern
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
