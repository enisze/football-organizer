import { EventCard } from '@/src/components/Events/EventCard'
import { addDays } from 'date-fns'

import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { prisma } from '@/src/server/db/client'

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
  })

  return (
    <div className="flex flex-col pb-2">
      <div className="m-8 flex flex-col gap-y-3 justify-center items-center">
        <ul className="flex flex-col gap-y-2">
          {events &&
            events?.length > 0 &&
            events.map((event) => {
              if (addDays(event.date, 1) < new Date() && !isOwner) return null

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
