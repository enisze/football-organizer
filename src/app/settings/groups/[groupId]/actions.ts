'use server'

import { defaultValues } from '@/src/helpers/constants'
import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { inngest, prisma } from '@/src/server/db/client'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

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
      code: nanoid(6),
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

const eventSchema = z
  .object({
    address: z.coerce.string().default(defaultValues.address),
    date: z.coerce.date().default(defaultValues.date),
    startTime: z.coerce.string().default(defaultValues.startTime),
    endTime: z.coerce.string().default(defaultValues.endTime),
    cost: z.coerce.number().default(defaultValues.cost),
    maxParticipants: z.coerce.number().default(defaultValues.maxParticipants),
    groupId: z.string().default(''),
    environment: z
      .enum(['OUTDOOR', 'INDOOR'])
      .default(defaultValues.environment),
  })
  .nullish()

export const createEvent = async ({
  formData,
  groupId,
}: {
  formData: FormData
  groupId: string
}) => {
  'use server'
  const session = await getServerComponentAuthSession()
  const id = session?.user?.id
  if (!id || !groupId) return

  const data = {
    address: formData.get('address'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    endTime: formData.get('endTime'),
    cost: formData.get('cost'),
    maxParticipants: formData.get('maxParticipants'),
    environment: formData.get('environment'),
    groupId,
  }

  const parsed = eventSchema.parse({
    ...data,
    environment: data.environment === 'on' ? 'INDOOR' : 'OUTDOOR',
  })

  if (!parsed) return

  const event = await prisma.event.create({
    data: {
      ...parsed,
    },
    select: { id: true },
  })

  await inngest.send({
    name: 'event/new',
    data: {
      id: event.id,
    },
  })

  revalidatePath(`/groups/${groupId}`)
}
