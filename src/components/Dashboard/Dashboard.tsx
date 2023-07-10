import type { FunctionComponent } from 'react'

import type { Event } from '@/prisma/generated/client'
import { useIsAdmin } from '@/src/hooks/useIsAdmin'
import { OrganizerLink } from '@/ui/base/OrganizerLink'
import { addDays } from 'date-fns'
import { EventCard } from '../Events/EventCard'
import { GroupSelector } from '../Groups/GroupSelector'

export const Dashboard: FunctionComponent<{
  events?: Event[]
  groupNames?: string[]
}> = ({ events, groupNames }) => {
  const isAdmin = useIsAdmin()
  return (
    <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
      {groupNames && groupNames.length > 0 ? (
        <>
          <GroupSelector />
          <ul className="flex flex-col gap-y-2">
            {events && events?.length > 0 ? (
              events.map((event) => {
                if (addDays(event.date, 1) < new Date() && !isAdmin) return null

                return (
                  <li key={event.id}>
                    <EventCard event={event} />
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
