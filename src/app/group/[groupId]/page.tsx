import { Dashboard } from '@/src/components/Dashboard/Dashboard'

import { getServerSession } from 'next-auth'

import { Navbar } from '@/src/components/Navigation/Navbar'
import { authOptions } from '@/src/lib/auth'
import { notFound } from 'next/navigation'
import { prisma } from '../../../../prisma/prisma'

const MainPage = async ({ params }: { params: { groupId: string } }) => {
  const groupId = params.groupId

  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  const events = await prisma.event.findMany({
    where: { groupId },
    orderBy: { date: 'asc' },
  })

  const id = session.user.id

  const groupNames = await prisma.group.findMany({
    where: { users: { some: { id } } },
    select: {
      name: true,
    },
  })

  const names = groupNames?.map((group) => group.name)

  if (!events) {
    notFound()
  }

  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard events={events} groupNames={names} />
    </div>
  )
}

export default MainPage
