import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { prisma, redis } from '@/src/server/db/client'
import { Button } from '@/ui/button'
import type { FunctionComponent } from 'react'

export const DeleteEventButton: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  return (
    <form className="w-full">
      <Button
        variant="outline"
        formAction={async () => {
          'use server'

          const { addressKey, coordinatesKey } =
            getAddressAndCoordinatesRedisKeys(id)

          await redis.del(addressKey)
          await redis.del(coordinatesKey)
          await prisma.event.delete({ where: { id } })
        }}
        className="w-full"
      >
        Delete
      </Button>
    </form>
  )
}
