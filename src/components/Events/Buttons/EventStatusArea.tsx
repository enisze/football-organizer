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

  const userStatus = participants.find(
    (user) => user.id === session?.user?.id,
  )?.userEventStatus

  const checkMarkColor = userStatus === 'JOINED' ? 'text-green-500' : ''
  const maybeMarkColor = userStatus === 'MAYBE' ? 'fill-yellow-500' : ''
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
      <div className="flex gap-x-1">
        <Button variant="outline" onClick={join} className="w-full">
          <Check className={checkMarkColor} />
        </Button>
        <Button variant="outline" onClick={maybe} className="w-full">
          <QuestionMark className={`fill-white ${maybeMarkColor}`} />
        </Button>
        <Button variant="outline" onClick={leave} className="w-full">
          <XIcon className={canceledMarkColor} />
        </Button>
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
