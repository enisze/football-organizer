import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { revalidateGroup } from '@/src/helpers/isOwnerOfGroup'
import { prisma, redis } from '@/src/server/db/client'
import { Button } from '@/ui/button'

export const DeleteEventButton = async ({ id }: { id: string }) => {
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

          revalidateGroup()
        }}
        className="w-full"
      >
        Delete
      </Button>
    </form>
  )
}
