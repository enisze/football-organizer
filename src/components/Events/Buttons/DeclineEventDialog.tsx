import type { UserEventStatus } from '@/prisma/generated/client'
import { api } from '@/src/server/trpc/api'
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
import type { FunctionComponent } from 'react'
import { useState } from 'react'

type DeclineEventDialogProps = {
  id: string
  userStatus?: UserEventStatus
  setShowLeaveModal: () => void
}

export const DeclineEventDialog: FunctionComponent<DeclineEventDialogProps> = ({
  id,
  userStatus,
  setShowLeaveModal,
}) => {
  const trpcContext = api.useContext()
  const [comment, setComment] = useState('')

  const [showCommentModal, setShowCommentModal] = useState(false)

  const { mutate: setEventComment } = api.user.setEventComment.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { mutate: setEventStatus } =
    api.event.setParticipatingStatus.useMutation({
      onSuccess: () => {
        // trpcContext.invalidate()
      },
    })

  const leave = () => {
    if (!payment) {
      setEventStatus({ eventId: id, status: 'CANCELED' })
    } else {
      setShowLeaveModal()
    }
  }

  const { data: payment } = api.payment.getByEventId.useQuery({
    eventId: id,
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
  )
}
