import type { UserEventStatus } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { TextField } from '@/ui/TextField'
import { X } from 'lucide-react'
import { SessionProvider, useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

type DeclineEventDialogProps = {
  id: string
  userStatus?: UserEventStatus
  setShowLeaveModal: () => void
}

const DeclineEventDialogRaw: FunctionComponent<DeclineEventDialogProps> = ({
  id,
  userStatus,
  setShowLeaveModal,
}) => {
  const trpcContext = trpc.useContext()
  const [comment, setComment] = useState('')

  const session = useSession()

  const userId = session.data?.user?.id ?? ''

  const [showCommentModal, setShowCommentModal] = useState(false)

  const { mutate: setEventComment } = trpc.user.setEventComment.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { mutate: setEventStatus } =
    trpc.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        trpcContext.invalidate()
      },
    })

  const leave = () => {
    if (!payment) {
      setEventStatus({ eventId: id, status: 'CANCELED', userId })
    } else {
      setShowLeaveModal()
    }
  }

  const { data: payment } = trpc.payment.getByEventId.useQuery({
    eventId: id,
    userId,
  })

  const canceledMarkColor = userStatus === 'CANCELED' ? 'text-red-500' : ''

  return (
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
          <X className={canceledMarkColor} />
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
              setEventComment({ comment, eventId: id, userId })
              setShowCommentModal(false)
            }}
            className="w-full"
          >
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const DeclineEventDialog: FunctionComponent<DeclineEventDialogProps> = ({
  id,
  userStatus,
  setShowLeaveModal,
}) => {
  return (
    <SessionProvider>
      <DeclineEventDialogRaw
        id={id}
        userStatus={userStatus}
        setShowLeaveModal={setShowLeaveModal}
      />
    </SessionProvider>
  )
}
