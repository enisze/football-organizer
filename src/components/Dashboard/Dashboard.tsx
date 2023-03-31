import type { FunctionComponent } from 'react'
import { trpc } from '../../utils/trpc'

import { useAtomValue } from 'jotai'
import type {
  Event,
  ParticipantsOnEvents,
} from '../../../prisma/generated/client'
import { EventCard } from '../Events/EventCard'
import { selectedGroupAtom } from '../Groups/GroupSelector'
import { LoadingWrapper } from '../LoadingWrapper'

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined

export const Dashboard: FunctionComponent = () => {
  const groupId = useAtomValue(selectedGroupAtom)

  const { data: events, isLoading } = trpc.event.getAllByGroup.useQuery({
    groupId: groupId ?? '',
  })

  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <EventList events={events} isLoading={isLoading} />
    </div>
  )
}

const EventList: FunctionComponent<{
  events: EventsWithparticipants
  isLoading: boolean
}> = ({ events, isLoading }) => {
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center">
      <LoadingWrapper isLoading={isLoading}>
        <ul className="flex flex-col gap-y-2">
          {events && events?.length > 0 ? (
            events.map((event) => {
              const { participants, ...realEvent } = event
              return (
                <li key={realEvent.id}>
                  <EventCard event={realEvent} participants={participants} />
                </li>
              )
            })
          ) : (
            <div className="flex justify-center">
              <span>Keine Events</span>
            </div>
          )}
        </ul>
      </LoadingWrapper>
    </div>
  )
}
