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

export const updateGroupName = async (formData: FormData, groupId: string) => {
  'use server'
  const name = formData.get('groupName') as string

  const session = await getServerComponentAuthSession()

  const id = session?.user?.id

  if (!id || !groupId) return

  await prisma.group.update({
    where: { id: groupId, ownerId: id },
    data: {
      name,
    },
  })

  revalidatePath('/settings/groups')

  return name
}

export const deleteUserFromGroup = async ({
  userId,
  groupId,
}: {
  userId: string
  groupId: string
}) => {
  'use server'
  const session = await getServerComponentAuthSession()
  const id = session?.user?.id
  if (!id || !groupId) return

  if (id === userId) {
    await prisma.group.delete({ where: { id: groupId } })
    revalidatePath('/settings/groups')

    revalidatePath(`/settings/groups/${groupId}`)

    return { groupDeleted: true }
  }

  await prisma.group.update({
    data: { users: { delete: { id_groupId: { groupId, id: userId } } } },
    where: { id: groupId, ownerId: id },
  })

  revalidatePath(`/settings/groups/${groupId}`)
  revalidatePath('/settings/groups')

  return { groupDeleted: false }
}
