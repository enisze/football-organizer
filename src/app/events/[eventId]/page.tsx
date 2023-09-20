import { EventCard } from '@/src/components/Events/EventCard'
import Link from 'next/link'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { notFound } from 'next/navigation'
import { StatusButton } from './StatusButton'

const EventPage = async ({ params }: { params: { eventId: string } }) => {
  const id = params.eventId

  const session = await getServerComponentAuthSession()

  if (!session || !session.user?.id) {
    // redirect('/api/auth/signin', RedirectType.push)
  }

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  })

  if (!event) {
    notFound()
  }

  const url = process.env.NEXT_PUBLIC_BASE_URL as string

  const link = new URL(url)

  return (
    <div className="mx-20 flex flex-col">
      <div className="flex flex-col items-center">
        <div className="my-5 flex flex-col items-center justify-center gap-y-2 rounded p-5">
          <StatusButton eventId={event.id} />
          <Link href={link}>
            <span>Zur Startseite</span>
          </Link>
        </div>
        <EventCard event={event} />
      </div>
    </div>
  )
}

export default EventPage
