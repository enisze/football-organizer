import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

import { useIsAdmin } from '@/src/hooks/useIsAdmin'
import { trpc } from '@/src/utils/trpc'
import { Skeleton } from '@/ui/skeleton'
import { addDays } from 'date-fns'
import { useRouter } from 'next/router'
import { EventCard } from '../Events/EventCard'
import { GroupSelector } from '../Groups/GroupSelector'

export const Dashboard: FunctionComponent = () => {
  const isAdmin = useIsAdmin()

  const router = useRouter()

  const groupId = router.query.groupId as string

  const { data: groupNames, isLoading: loadingGroups } =
    trpc.group.getGroupNames.useQuery()

  const id = useMemo(() => {
    return groupId ?? groupNames?.at(0)?.id
  }, [groupId, groupNames])

  const {
    data: res,
    isLoading: loadingEvents,
    isFetching: fetchingEvents,
  } = trpc.group.getEvents.useQuery(
    {
      id,
    },
    { enabled: !!id },
  )

  const events = res?.events

  const loading = (loadingEvents && fetchingEvents) || loadingGroups

  return (
    <div className="m-4 flex flex-col gap-y-3 justify-center items-center">
      <GroupSelector />
      <ul className="flex flex-col gap-y-2">
        {!loading && events && events?.length > 0 ? (
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
    </div>
  )
}
