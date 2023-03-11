import { trpc } from '@/src/utils/trpc'
import { Button } from '@/ui/base/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/base/Dialog'
import { TRPCError } from '@trpc/server'
import { Check, XIcon } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { LoadingWrapper } from '../../LoadingWrapper'

export const EventStatusArea: FunctionComponent<{
  id: string
}> = ({ id }) => {
  const trpcContext = trpc.useContext()

  const [showLeaveModal, setShowLeaveModal] = useState(false)
  const { mutate: sendEmail } = trpc.gmail.sendPaidButCancledMail.useMutation()

  const { mutate: setEventStatus, isLoading } =
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

  const leave = async () => {
    if (payment) {
      setEventStatus({ eventId: id, status: 'CANCELED' })
    } else {
      setShowLeaveModal(true)
    }
  }

  const maybe = async () => {
    setEventStatus({ eventId: id, status: 'MAYBE' })
  }

  return (
    <Dialog
      open={showLeaveModal}
      onOpenChange={(open) => setShowLeaveModal(open)}
    >
      <LoadingWrapper isLoading={isLoading}>
        <div className="flex gap-x-1">
          <Button variant="outline" onClick={join} className="w-full">
            <Check />
          </Button>
          <Button variant="outline" onClick={maybe} className="w-full">
            <Check />
          </Button>
        </div>

        <DialogTrigger asChild>
          <Button variant="outline" onClick={leave} className="w-full">
            <XIcon />
          </Button>
        </DialogTrigger>
      </LoadingWrapper>
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
