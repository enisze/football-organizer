import { Button } from '@/ui/button'
import { Check } from 'lucide-react'
import { QuestionMark } from '../../QuestionMark'

import { setParticipatingStatus } from '@/src/app/group/[groupId]/actions'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'

export const EventStatusArea = async ({ id }: { id: string }) => {
  const session = await getServerComponentAuthSession()

  const participants = await prisma.participantsOnEvents.findMany({
    where: { eventId: id },
    select: {
      userEventStatus: true,
      comment: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  const userStatus = participants.find(
    (participant) => participant.user.id === session?.user?.id,
  )?.userEventStatus

  const checkMarkColor = userStatus === 'JOINED' ? 'text-green-500' : ''
  const maybeMarkColor = userStatus === 'MAYBE' ? '!fill-yellow-500' : ''

  const payment = await prisma.payment.findFirst({
    where: { eventId: id, userId: session?.user?.id },
  })

  return (
    <form>
      <span>Mein Status:</span>
      <div className="flex gap-x-1 w-full">
        <Button
          aria-label="join-button"
          variant="outline"
          type="submit"
          formAction={async () => {
            'use server'

            setParticipatingStatus({ eventId: id, status: 'JOINED' })
          }}
          className="w-full"
        >
          <Check className={checkMarkColor} />
        </Button>

        <Button
          aria-label="maybe-button"
          variant="outline"
          type="submit"
          formAction={async () => {
            'use server'

            setParticipatingStatus({ eventId: id, status: 'MAYBE' })
          }}
          className="w-full"
        >
          <QuestionMark
            className={`fill-black dark:fill-white ${maybeMarkColor}`}
          />
        </Button>

        {/* <DeclineEventDialog id={id} userStatus={userStatus} payment={payment} /> */}
      </div>
    </form>
  )
}
