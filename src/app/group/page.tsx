import { redirect } from 'next/navigation'

import { GroupSelectorServer } from '@/src/components/Groups/GroupSelectorServer'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '../../server/db/client'

const MainPage = async () => {
  const session = await getServerComponentAuthSession()
  const groups = await prisma.group.findMany({
    where: { users: { some: { id: session?.user?.id } } },
    select: {
      name: true,
      id: true,
      createdAt: true,
      events: true,
      pricingModel: true,
      users: true,
    },
  })

  if (groups && groups?.length > 0) {
    redirect(`/group/${groups.at(0)?.id}`)
  }
  return (
    <div className="flex flex-col pb-2 pt-7">
      <GroupSelectorServer />
    </div>
  )
}

export default MainPage
