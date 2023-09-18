import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { headers } from 'next/headers'
import { OrganizerMenu } from './OrganizerMenu'

export const OrganizerServerMenu = async () => {
  const session = await getServerComponentAuthSession()

  const list = headers()

  const pathname = list.get('x-pathname')

  const groupId = pathname?.split('/').at(-1)

  const events = await prisma.event.findMany({
    where: {
      groupId,
      participants: { some: { id: session?.user?.id } },
    },
  })

  const userEventStatus = await prisma.participantsOnEvents.findMany({
    where: { id: session?.user?.id },
  })

  const balance = await userEventStatus.reduce(async (acc, userEvent) => {
    const event = events.find((event) => event.id === userEvent.eventId)

    if (!event) return acc

    const payment = await prisma.payment.findFirst({
      where: { userId: session?.user?.id, eventId: event.id },
    })

    const cost: number = event.cost / event.maxParticipants

    if (userEvent.userEventStatus === 'JOINED') {
      if (!payment) return (await acc) - cost
    }
    if (userEvent.userEventStatus === 'CANCELED') {
      if (payment) return (await acc) + cost
    }
    return acc
  }, Promise.resolve(0))

  return <OrganizerMenu balance={balance} />
}
