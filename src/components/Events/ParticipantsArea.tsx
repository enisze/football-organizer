import type { ParticipantsOnEvents } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import { Avatar } from '@/ui/base/Avatar'
import { Button } from '@/ui/base/Button'
import { AvatarFallback } from '@radix-ui/react-avatar'
import type { FunctionComponent } from 'react'
import { useState } from 'react'
import { EventCardAdminPaymentArea } from './EventCardAdminPaymentArea'

export const ParticipantsArea: FunctionComponent<{
  participants: ParticipantsOnEvents[]
  eventId: string
  maxParticipants?: number
  heading: string
}> = ({ participants, eventId, heading, maxParticipants }) => {
  const [showParticipants, setShowParticipants] = useState(false)

  const { data: users } = trpc.user.getUserNamesByIds.useQuery({
    ids: participants.map((user) => user.id),
  })

  const amountOfParticipants = users?.length ?? 0

  const participantsString =
    heading === 'Teilnehmer'
      ? `${heading} ${amountOfParticipants}/${maxParticipants}`
      : `${heading}: ${amountOfParticipants}`
  return (
    <>
      <Button
        variant="ghost"
        color="info"
        onClick={() => setShowParticipants(!showParticipants)}
        className="bg-[#89A6FB] text-black"
      >
        {participantsString}
      </Button>
      {showParticipants &&
        users &&
        users.map((participant) => {
          const res = participant?.name?.split(' ') as string[]
          const first = res[0]?.charAt(0) ?? 'X'
          const second = res[1]?.charAt(0) ?? 'X'

          return (
            <div key={participant?.id} className="flex items-center gap-x-2">
              <Avatar className="flex items-center justify-center border-[1px] border-slate-100 dark:border-white">
                <AvatarFallback>{first + second}</AvatarFallback>
              </Avatar>
              <div>{participant?.name}</div>
              <EventCardAdminPaymentArea
                eventId={eventId}
                userId={participant?.id ?? ''}
              />
            </div>
          )
        })}
    </>
  )
}
