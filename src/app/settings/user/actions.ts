'use server'

import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { prisma } from '@/src/server/db/client'
import { revalidatePath } from 'next/cache'

export const updatePaypalName = async (formData: FormData) => {
  'use server'

  const session = await getServerComponentAuthSession()
  const paypalName = formData.get('paypalName')?.toString()

  const id = session?.user?.id

  if (!id) return null

  await prisma.user.update({
    where: { id },
    data: { paypalName },
  })

  revalidatePath('/settings/user')
}

export async function updateNotification() {
  'use server'

  const session = await getServerComponentAuthSession()

  const id = session?.user?.id
  if (!session || !id) {
    return { message: 'failed' }
  }

  const userInfo = await prisma.user.findUnique({
    where: { id },
    select: { notificationsEnabled: true, paypalName: true },
  })

  const notificationsEnabled = userInfo?.notificationsEnabled

  await prisma.user.update({
    where: { id },
    data: { notificationsEnabled: !notificationsEnabled },
    select: { notificationsEnabled: true },
  })
}

export async function deleteUser() {
  'use server'

  const session = await getServerComponentAuthSession()
  const id = session?.user?.id
  await prisma.user.delete({
    where: { id },
  })
}
