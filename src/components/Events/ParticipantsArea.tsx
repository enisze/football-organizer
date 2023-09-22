import type { UserEventStatus } from '@/prisma/generated/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/ui/accordion'
import { User } from 'lucide-react'
import { AvatarStatus } from './AvatarStatus'
import { EventCardAdminPaymentArea } from './EventCardAdminPaymentArea'

type ParticipantsAreaProps = {
  joinedUsersAmount: number
  canceledUsersAmount: number
  maybeUsersAmount: number
  allUsersLength: number
  maxParticipants?: number
  participants: {
    userEventStatus: UserEventStatus
    comment: string | null
    user: {
      id: string
      name: string
    }
  }[]
  eventId: string
}

export const ParticipantsArea = async ({
  allUsersLength,
  joinedUsersAmount,
  canceledUsersAmount,
  maybeUsersAmount,
  maxParticipants,
  participants,
  eventId,
}: ParticipantsAreaProps) => {
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
                    comment={participant?.comment}
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
