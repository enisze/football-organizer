import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/base/Button'
import { Dialog, DialogContent, DialogHeader } from '@/ui/base/Dialog'
import {
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

export const LeaveEventButton: FunctionComponent<{
  id: string
}> = ({ id }) => {
  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const trpcContext = trpc.useContext()

  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation()

  const { mutate: leaveEvent } = trpc.event.leave.useMutation({
    onSuccess: () => {
      trpcContext.invalidate()
    },
  })

  const { data: payment } = trpc.payment.getByEventId.useQuery({ eventId: id })

  const leave = async () => {
    if (payment) {
      leaveEvent({ eventId: id })
    } else {
      setShowLeaveModal(true)
    }
  }

  return (
    <Dialog
      open={showLeaveModal}
      onOpenChange={(open) => setShowLeaveModal(open)}
    >
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline" onClick={leave} className="w-full">
          Absagen
        </Button>
      </DialogTrigger>
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
              leaveEvent({ eventId: id })
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
