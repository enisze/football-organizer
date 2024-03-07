'use server'

import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { revalidateGroup } from '@/src/helpers/isOwnerOfGroup'
import { inngest, prisma } from '@/src/server/db/client'
import { redis } from '@/src/server/db/redis'

export const sendReminderEvent = async (id: string) => {
  await inngest.send({
    name: 'event/reminder',
    data: {
      id,
    },
  })
}

export const deleteEvent = async (id: string) => {
  const { addressKey, coordinatesKey } = getAddressAndCoordinatesRedisKeys(id)

  if (!redis.isOpen) {
    await redis.connect()
  }

  await redis.del(addressKey)
  await redis.del(coordinatesKey)
  await prisma.event.delete({ where: { id } })

  await redis.disconnect()

  revalidateGroup()
}
