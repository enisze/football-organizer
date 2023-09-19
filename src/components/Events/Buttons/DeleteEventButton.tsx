import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { prisma } from '@/src/server/db/client'
import { redis } from '@/src/server/redis/redis'
import { Button } from '@/ui/button'
import type { FunctionComponent } from 'react'

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  return (
    <form>
      <Button
        variant="outline"
        formAction={async () => {
          'use server'

          const { addressKey, coordinatesKey } =
            getAddressAndCoordinatesRedisKeys(id)

          try {
            console.log(await redis.ping())
          } catch (error) {
            await redis.connect()
          }
          await redis.del(addressKey)
          await redis.del(coordinatesKey)
          await prisma.event.delete({ where: { id } })
        }}
      >
        Delete
      </Button>
    </form>
  )
}
