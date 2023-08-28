'use client'
import { api } from '@/src/server/trpc/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion'
import { User } from 'lucide-react'
import { SessionProvider, useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { AvatarStatus } from './AvatarStatus'
import { EventCardAdminPaymentArea } from './EventCardAdminPaymentArea'

type ParticipantsAreaProps = {
  eventId: string
  maxParticipants?: number
}

const ParticipantsAreaRaw: FunctionComponent<ParticipantsAreaProps> = ({
  eventId,
  maxParticipants,
}) => {
  const session = useSession()

  const userId = session.data?.user?.id ?? ''

  const { data } = api.event.getParticipants.useQuery({
    eventId,
    userId,
  })

  if (!data) return null

  const {
    joinedUsersAmount,
    maybeUsersAmount,
    canceledUsersAmount,
    participants,
  } = data

  const allUsersLength = participants.length

  const joinedWidth = {
    width: `${(joinedUsersAmount / allUsersLength) * 100}%`,
  }
  const maybeWidth = { width: `${(maybeUsersAmount / allUsersLength) * 100}%` }

  const canceledWidth = {
    width: `${(canceledUsersAmount / allUsersLength) * 100}%`,
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
          <span>{`${joinedUsersAmount}/${maxParticipants} Teilnehmer`}</span>
        </div>

        {allUsersLength > 0 && (
          <AccordionTrigger className="p-0 hover:no-underline">
            <div
              className="rounded flex border w-full mr-1"
              style={{ border: 'solid' }}
            >
              <div className="bg-green-400 overflow-hidden" style={joinedWidth}>
                {joinedUsersAmount}
              </div>
              <div className="bg-yellow-400 overflow-hidden" style={maybeWidth}>
                {maybeUsersAmount}
              </div>
              <div className="bg-red-400 overflow-hidden" style={canceledWidth}>
                {canceledUsersAmount}
              </div>
            </div>
          </AccordionTrigger>
        )}
        <AccordionContent className="[&>div]:pb-0 [&>div]:pt-2">
          <div className="flex flex-col gap-y-1">
            {participants.map((participant) => {
              const res = participant?.user?.name?.split(' ') as string[]

              if (!res) return null
              const first = res[0]?.charAt(0) ?? 'X'
              const second = res[1]?.charAt(0) ?? 'X'

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

export const ParticipantsArea: FunctionComponent<ParticipantsAreaProps> = ({
  eventId,
  maxParticipants,
}) => {
  return (
    <SessionProvider>
      <ParticipantsAreaRaw
        eventId={eventId}
        maxParticipants={maxParticipants}
      />
    </SessionProvider>
  )
}
