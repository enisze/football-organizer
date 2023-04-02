import type { FunctionComponent } from 'react'
import { trpc } from '../../utils/trpc'

import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { useAtomValue } from 'jotai'
import type {
  Event,
  ParticipantsOnEvents,
} from '../../../prisma/generated/client'
import { EventCard } from '../Events/EventCard'
import { GroupSelector, selectedGroupAtom } from '../Groups/GroupSelector'
import { LoadingWrapper } from '../LoadingWrapper'

type EventsWithparticipants =
  | (Event & { participants: ParticipantsOnEvents[] })[]
  | undefined

export const Dashboard: FunctionComponent = () => {
  return (
    <div className="m-8 flex flex-col items-center justify-center">
      <EventList />
    </div>
  )
}

const EventList: FunctionComponent = () => {
  const groupId = useAtomValue(selectedGroupAtom)

  const { data: events, isLoading } = trpc.event.getAllByGroup.useQuery({
    groupId: groupId ?? '',
  })

  const { data: groups, isLoading: groupsLoading } =
    trpc.group.getGroupsOfUser.useQuery({
      owned: false,
    })

  return (
    <div className="flex flex-col gap-y-3 justify-center items-center">
      {groups && groups?.length > 1 && (
        <>
          <GroupSelector />

          <LoadingWrapper isLoading={isLoading}>
            <ul className="flex flex-col gap-y-2">
              {events && events?.length > 0 ? (
                events.map((event) => {
                  const { participants, ...realEvent } = event
                  return (
                    <li key={realEvent.id}>
                      <EventCard
                        event={realEvent}
                        participants={participants}
                      />
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
        </>
      )}
      {groups && groups?.length < 1 && (
        <div className="flex flex-col justify-center">
          <span>Du bist noch kein Mitglied einer Gruppe</span>

          <OrganizerLink href="/settings/groups" className="justify-center">
            Grupper erstellen
          </OrganizerLink>
        </div>
      )}
    </div>
  )
}
