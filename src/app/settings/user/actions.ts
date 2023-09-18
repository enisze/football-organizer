'use server'

import { prisma } from '@/src/server/db/client'
import type { Session } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const updatePaypalName = async (input: {
  name: string | undefined
  id: string | undefined
}) => {
  'use server'
  const { name, id } = input

  if (!name || !id) return null

  await prisma.user.update({
    where: { id },
    data: { paypalName: name },
  })

  revalidatePath('/settings/user')
}

export async function updateNotification(session: Session | null) {
  'use server'

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

export async function updateUserName(
  formData: FormData,
  session: Session | null,
) {
  'use server'
  const paypalName = formData.get('paypalName')?.toString()
  const id = session?.user?.id

  updatePaypalName({ name: paypalName, id })
}

export async function deleteUser(formData: FormData, session: Session | null) {
  const userNameForDeletion = formData.get('userNameForDeletion')?.toString()

  if (!userNameForDeletion)
    return {
      message: 'User name does not match',
    }

  const id = session?.user?.id

  const result = await prisma.user.findUnique({
    where: { id },
    select: { name: true },
  })

  if (result?.name !== userNameForDeletion) {
    return { message: 'User name does not match' }
  }

  await prisma.user.delete({
    where: { id },
  })
}
