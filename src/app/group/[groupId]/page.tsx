import { EventCard } from '@/src/components/Events/EventCard'
import { addDays } from 'date-fns'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'

const MainPage = async ({
  params: { groupId },
}: {
  params: { groupId: string }
}) => {
  const session = await getServerComponentAuthSession()

  const isAdmin = session?.user?.role === 'ADMIN'

  const events = await prisma.event.findMany({
    where: {
      groupId,
    },
  })

  return (
    <div className="flex flex-col pb-2">
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
    </div>
  )
}

export default MainPage
