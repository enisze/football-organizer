import type { FunctionComponent } from 'react'

import type { EventWithParticipants } from '@/src/types/EventWithParticipants'
import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { EventCard } from '../Events/EventCard'
import { GroupSelector } from '../Groups/GroupSelector'

export const Dashboard: FunctionComponent<{
  events?: EventWithParticipants
  groupNames?: string[]
}> = ({ events, groupNames }) => {
  return (
    <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
      {groupNames && groupNames.length > 0 ? (
        <>
          <GroupSelector />
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
        </>
      ) : (
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
