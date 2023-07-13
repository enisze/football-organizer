'use client'
import type { FunctionComponent } from 'react'

import type { Event } from '@/prisma/generated/client'
import { useIsAdmin } from '@/src/hooks/useIsAdmin'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Skeleton } from '@/ui/skeleton'
import { addDays } from 'date-fns'
import { SessionProvider } from 'next-auth/react'
import { EventCard } from '../Events/EventCard'
import { GroupSelector } from '../Groups/GroupSelector'

type DashboardProps = {
  events?: Event[]
  groupNames: string[]
}

const DashboardRaw: FunctionComponent<DashboardProps> = ({
  events,
  groupNames,
}) => {
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
              <div className="flex flex-col gap-y-2 justify-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <div
                      className="relative h-full w-full rounded-2xl bg-gradient-to-b from-purple-400 to-purple-100 p-[1px] md:w-[400px]"
                      key={i}
                    >
                      <div className="flex w-full flex-col justify-center gap-2 rounded-2xl bg-gradient-to-tl from-white to-blue-100 shadow-xl dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-600 p-2">
                        <Skeleton className="h-6 w-32 self-center" />
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton className="h-6 w-69 md:w-80" key={i} />
                        ))}

                        <div className="flex gap-x-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton className="h-10 w-23 md:w-28" key={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
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

export const Dashboard: FunctionComponent<DashboardProps> = ({
  events,
  groupNames,
}) => {
  return (
    <SessionProvider>
      <DashboardRaw events={events} groupNames={groupNames} />
    </SessionProvider>
  )
}
