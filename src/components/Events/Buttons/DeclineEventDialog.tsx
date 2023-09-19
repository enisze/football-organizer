'use client'
import type { UserEventStatus } from '@/prisma/generated/client'
import { setParticipatingStatus } from '@/src/app/group/[groupId]/actions'
import { api } from '@/src/server/trpc/api'
import { TextField } from '@/ui/TextField'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { X } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { LeaveModal } from './LeaveModal'

type DeclineEventDialogProps = {
  id: string
  userStatus?: UserEventStatus
}

export const DeclineEventDialog: FunctionComponent<DeclineEventDialogProps> = ({
  id,
  userStatus,
}) => {
  const trpcContext = api.useContext()
  const [comment, setComment] = useState('')

  const [showCommentModal, setShowCommentModal] = useState(false)

  const [showLeaveModal, setShowLeaveModal] = useState(false)

  const { mutate: setEventComment } = api.user.setEventComment.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const leave = async () => {
    if (!payment) {
      await setParticipatingStatus({ eventId: id, status: 'CANCELED' })
    } else {
      setShowLeaveModal(true)
    }
  }

  const { data: payment } = api.payment.getByEventId.useQuery({
    eventId: id,
  })

  const canceledMarkColor = userStatus === 'CANCELED' ? 'text-red-500' : ''

  return (
    <>
      <Dialog
        open={showCommentModal}
        onOpenChange={(open) => setShowCommentModal(open)}
      >
        <DialogTrigger asChild>
          <Button
            aria-label="cancel-button"
            variant="outline"
            className="w-full"
            formAction={leave}
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

      <LeaveModal
        eventId={id}
        showLeaveModal={showLeaveModal}
        setShowLeaveModal={setShowLeaveModal}
      />
    </>
  )
}
