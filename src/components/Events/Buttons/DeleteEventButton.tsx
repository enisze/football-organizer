import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { revalidateGroup } from '@/src/helpers/isOwnerOfGroup'
import { prisma } from '@/src/server/db/client'
import { Button } from '@/ui/button'

import { redis } from '@/src/server/db/redis'

export const DeleteEventButton = async ({ id }: { id: string }) => {
  return (
    <form className="w-full">
      <Button
        variant="outline"
        formAction={async () => {
          'use server'

          const { addressKey, coordinatesKey } =
            getAddressAndCoordinatesRedisKeys(id)

          if (!redis.isOpen) {
            await redis.connect()
          }

          await redis.del(addressKey)
          await redis.del(coordinatesKey)
          await prisma.event.delete({ where: { id } })

          await redis.disconnect()

          revalidateGroup()
        }}
        className="w-full"
      >
        Delete
      </Button>
    </form>
  )
}
