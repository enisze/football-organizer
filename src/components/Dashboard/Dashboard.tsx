'use client'
import { useIsAdmin } from '@/src/hooks/useIsAdmin'
import { api } from '@/src/server/trpc/api'
import { addDays } from 'date-fns'
import { useParams } from 'next/navigation'
import { EventCard } from '../Events/EventCard'

export const Dashboard = () => {
  const params = useParams()

  const groupId = params?.groupId as string

  const isAdmin = useIsAdmin()

  const { data: events } = api.event.getByGroupId.useQuery({
    groupId: groupId ?? '',
  })

  return (
    <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
      <ul className="flex flex-col gap-y-2">
        {events &&
          events?.length > 0 &&
          events.map((event) => {
            if (addDays(event.date, 1) < new Date() && !isAdmin) return null

            return (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
