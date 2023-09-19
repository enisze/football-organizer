import { subDays } from 'date-fns'
import { z } from 'zod'
import { getAddressAndCoordinatesRedisKeys } from '../../../helpers/getAddressAndCoordinatesRedisKeys'
import { redis } from '../../redis/redis'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const eventRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { addressKey, coordinatesKey } = getAddressAndCoordinatesRedisKeys(
        input.id,
      )

      try {
        console.log(await redis.ping())
      } catch (error) {
        await redis.connect()
      }
      await redis.del(addressKey)
      await redis.del(coordinatesKey)
      return await prisma.event.delete({ where: { id: input.id } })
    }),
  book: protectedProcedure
    .input(z.object({ id: z.string(), date: z.date() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.update({
        data: { status: 'BOOKED', bookingDate: subDays(input.date, 1) },
        where: { id: input.id },
      })
    }),
  cancel: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.update({
        data: { status: 'CANCELED', bookingDate: null },
        where: { id: input.id },
      })
    }),
})
