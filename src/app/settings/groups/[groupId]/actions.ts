'use server'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'

export async function deleteGroup({ groupId }: { groupId: string }) {
  'use server'

  const session = await getServerComponentAuthSession()

  const id = session?.user?.id

  if (!id || !groupId) return

  await prisma.group.delete({
    where: { id: groupId, ownerId: id },
  })

  revalidatePath('/settings/groups')
}

export const createGroup = async (formData: FormData) => {
  'use server'
  const name = formData.get('groupName') as string

  const session = await getServerComponentAuthSession()

  const id = session?.user?.id

  if (!id) return

  await prisma.group.create({
    data: {
      name,
      owner: {
        connect: {
          id,
        },
      },
      users: { create: { id, role: 'OWNER' } },
    },
  })
  revalidatePath('/settings/groups')
}
