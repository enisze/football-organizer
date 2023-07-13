import { Dashboard } from '@/src/components/Dashboard/Dashboard'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

import { Navbar } from '@/src/components/Navigation/Navbar'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'
import { prisma } from '../../../prisma/prisma'

const MainPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    redirect('/api/auth/signin', RedirectType.push)
  }

  const id = session.user.id

  const groupNames = await prisma.group.findMany({
    where: { users: { some: { id } } },
    select: {
      name: true,
    },
  })

  const names = groupNames?.map((group) => group.name)

  return (
    <div className="flex flex-col pb-2">
      <Navbar />
      <div className="p-8" />
      <Dashboard groupNames={names} />
    </div>
  )
}

export default MainPage
