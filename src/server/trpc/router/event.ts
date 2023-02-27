import { TRPCError } from '@trpc/server'
import { subDays } from 'date-fns'
import { z } from 'zod'
import { inngest } from '../../../../inngest/inngestClient'
import { getAddressAndCoordinatesRedisKeys } from '../../../helpers/getAddressAndCoordinatesRedisKeys'
import { redis } from '../../redis/redis'

import { protectedProcedure, router } from '../trpc'

export const eventRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          address: z.string(),
          date: z.date(),
          startTime: z.string(),
          endTime: z.string(),
          cost: z.number(),
          maxParticipants: z.number(),
        })
        .nullish(),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      if (!input) throw new TRPCError({ code: 'BAD_REQUEST' })

      const result = await prisma.event.create({
        data: { ...input },
        select: { id: true },
      })
      await inngest.send('event/new', {
        data: { ...input, date: input.date.toDateString(), id: result.id },
      })

      return result
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.event.findMany({
      take: 10,
      include: { participants: true },
    })
  }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: { participants: true },
      })
    }),
  remind: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ input }) => {
      const { eventId } = input

      await inngest.send('event/reminder', { data: { eventId } })
      return true
    }),

  join: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const userId = session.user.id
      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const event = await prisma.event.findUnique({
        where: { id: input.eventId },
        include: { participants: true },
      })

      if (
        event?.participants.filter(
          (participant) => participant.userEventStatus === 'JOINED',
        ).length === 10
      )
        throw new TRPCError({ code: 'PRECONDITION_FAILED' })

      return await prisma.participantsOnEvents.upsert({
        create: {
          eventId: input.eventId,
          id: userId,
          userEventStatus: 'JOINED',
        },
        update: {
          userEventStatus: 'JOINED',
        },
        where: {
          id_eventId: {
            eventId: input.eventId,
            id: userId,
          },
        },
      })
    }),
  leave: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const userId = session.user.id
      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
      return await prisma.participantsOnEvents.upsert({
        create: {
          eventId: input.eventId,
          id: userId,
          userEventStatus: 'CANCELED',
        },
        update: {
          userEventStatus: 'CANCELED',
        },
        where: {
          id_eventId: {
            eventId: input.eventId,
            id: userId,
          },
        },
      })
    }),
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
  deleteAll: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.event.deleteMany()
  }),
})
