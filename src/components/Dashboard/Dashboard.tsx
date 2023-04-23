import type { FunctionComponent } from 'react'
import { trpc } from '../../utils/trpc'

import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { EventCard } from '../Events/EventCard'
import { GroupSelector } from '../Groups/GroupSelector'
import { LoadingWrapper } from '../LoadingWrapper'

export const Dashboard: FunctionComponent<{ groupId?: string }> = ({
  groupId,
}) => {
  const {
    data: events,
    isLoading,
    isFetching,
  } = trpc.event.getAllByGroup.useQuery(
    {
      groupId: groupId ?? '',
    },
    { enabled: Boolean(groupId) },
  )

  const { data: groups, isLoading: groupsLoading } =
    trpc.group.getGroupsOfUser.useQuery({
      owned: false,
    })

  const loading = groupsLoading || (isLoading && isFetching)

  if (loading)
    return (
      <div className="flex justify-center m-8">
        <LoadingWrapper isLoading={loading} />
      </div>
    )

  return (
    <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
      {groups && groups?.length > 0 && (
        <>
          <GroupSelector />

          {groupId && (
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
          )}
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
