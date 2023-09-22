import {
  sendPaidButCanceledMailAction,
  setParticipatingStatus,
} from '@/src/app/group/[groupId]/actions'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog'

export const LeaveModal = ({
  eventId,
  setShowLeaveModal,
  showLeaveModal,
}: {
  eventId: string
  showLeaveModal: boolean
  setShowLeaveModal: (open: boolean) => void
}) => {
  const test = async () => {
    await setParticipatingStatus({ eventId: eventId, status: 'CANCELED' })
    await sendPaidButCanceledMailAction({ eventId })
    setShowLeaveModal(false)
  }

  return (
    <Dialog
      open={showLeaveModal}
      onOpenChange={(open) => setShowLeaveModal(open)}
    >
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
            type="submit"
            formAction={test}
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
