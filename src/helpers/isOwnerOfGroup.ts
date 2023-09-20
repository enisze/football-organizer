import { headers } from 'next/headers'
import { getServerComponentAuthSession } from '../server/auth/authOptions'

import { prisma } from '@/src/server/db/client'

export const isOwnerOfGroup = async () => {
  const session = await getServerComponentAuthSession()

  const pathname = headers().get('x-pathname')

  const groupId = pathname?.split('/').at(-1)

  if (!groupId || !session?.user?.id) return false

  const userOnGroup = prisma.userOnGroups.findUnique({
    where: {
      id_groupId: {
        groupId,
        id: session?.user?.id,
      },
    },
  })

  return Boolean(userOnGroup)
}
