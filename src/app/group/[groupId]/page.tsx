import { EventCard } from '@/src/components/Events/EventCard'
import { addDays } from 'date-fns'

import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { redis } from '@/src/server/db/redis'
import { getLatLong } from './getLatLong'

const MainPage = async ({
  params: { groupId },
}: {
  params: { groupId: string }
}) => {
  const isOwner = await isOwnerOfGroup()
  const events = await prisma.event.findMany({
    where: {
      groupId,
    },
    orderBy: { date: 'asc' },
  })

  const eventInfo = events.map((event) => {
    return { address: event.address, id: event.id }
  })

  const data = await getLatLong(eventInfo)

  if (redis.isOpen) {
    await redis.disconnect()
  }

  const session = await getServerComponentAuthSession()

  return (
    <div className="flex flex-col pb-2">
      <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
        <ul className="flex flex-col gap-y-2">
          {events &&
            events?.length > 0 &&
            events.map(async (event) => {
              const payment = await prisma.payment.findFirst({
                where: { eventId: event.id, userId: session?.user?.id },
              })
              if (addDays(event.date, 3) < new Date() && !isOwner && payment)
                return null

              return (
                <li key={event.id}>
                  <EventCard event={event} location={data?.get(event.id)} />
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default MainPage
