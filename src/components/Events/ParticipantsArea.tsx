import type { ParticipantsOnEvents } from '@/prisma/generated/client'
import { trpc } from '@/src/utils/trpc'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/base/Accordion'
import { User } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { AvatarStatus } from './AvatarStatus'
import { EventCardAdminPaymentArea } from './EventCardAdminPaymentArea'

export const ParticipantsArea: FunctionComponent<{
  participants: ParticipantsOnEvents[]
  eventId: string
  maxParticipants?: number
}> = ({ participants, eventId, maxParticipants }) => {
  const joinedUsers = participants.filter(
    (participant) => participant.userEventStatus === 'JOINED',
  )
  const canceledUsers = participants.filter(
    (participant) => participant.userEventStatus === 'CANCELED',
  )

  const maybeUsers = participants.filter(
    (participant) => participant.userEventStatus === 'MAYBE',
  )
  const { data: users } = trpc.user.getUserNamesByIds.useQuery({
    ids: participants.map((user) => user.id),
    eventId,
  })

  const allUsersLength = participants.length

  const joinedWidth = {
    width: `${(joinedUsers.length / allUsersLength) * 100}%`,
  }
  const maybeWidth = { width: `${(maybeUsers.length / allUsersLength) * 100}%` }

  const canceledWidth = {
    width: `${(canceledUsers.length / allUsersLength) * 100}%`,
  }

  return (
    <Accordion type="single" collapsible className="p-0">
      <AccordionItem
        value="item-1"
        className="border-b-0"
        style={{ padding: 0 }}
      >
        <div className="flex gap-x-1 items-center">
          <User className="h-4 w-4 opacity-70 flex-none" />
          <span>{`${joinedUsers.length}/${maxParticipants} Teilnehmer`}</span>
        </div>

        {allUsersLength > 0 && (
          <AccordionTrigger className="p-0 hover:no-underline">
            <div
              className={`rounded flex border w-full bg-gradient-to-b from mr-1`}
            >
              <div
                className={`bg-green-400 overflow-hidden`}
                style={joinedWidth}
              >
                {joinedUsers.length}
              </div>
              <div className="bg-yellow-400 overflow-hidden" style={maybeWidth}>
                {maybeUsers.length}
              </div>
              <div className="bg-red-400 overflow-hidden" style={canceledWidth}>
                {canceledUsers.length}
              </div>
            </div>
          </AccordionTrigger>
        )}
        <AccordionContent className="[&>div]:pb-0 [&>div]:pt-2">
          <div className="flex flex-col gap-y-1">
            {users &&
              users.map((participant) => {
                const res = participant?.user?.name?.split(' ') as string[]
                const first = res[0]?.charAt(0) ?? 'X'
                const second = res[1]?.charAt(0) ?? 'X'

                const user = participants.find(
                  (user) => user.id === participant?.user?.id,
                )

                return (
                  <div
                    key={participant?.user.id}
                    className="flex items-center gap-x-2"
                  >
                    <AvatarStatus
                      name={participant?.user.name ?? ''}
                      shortName={`${first}${second}`}
                      userEventStatus={participant?.userEventStatus}
                    />

                    <span>{user?.comment}</span>
                    <EventCardAdminPaymentArea
                      eventId={eventId}
                      userId={participant?.user.id ?? ''}
                    />
                  </div>
                )
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
