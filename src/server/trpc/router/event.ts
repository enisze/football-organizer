import { TRPCError } from '@trpc/server'
import { subDays } from 'date-fns'
import { z } from 'zod'
import { getAddressAndCoordinatesRedisKeys } from '../../../helpers/getAddressAndCoordinatesRedisKeys'
import { redis } from '../../redis/redis'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const eventRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.findUnique({
        where: { id: input.id },
        include: { participants: true },
      })
    }),

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
          groupId: z.string(),
        })
        .nullish(),
    )
    .mutation(async ({ ctx: { prisma, inngest }, input }) => {
      if (!input) throw new TRPCError({ code: 'BAD_REQUEST' })

      const event = await prisma.event.create({
        data: { ...input },
      })

      await inngest.send({
        name: 'event/new',
        data: {
          id: event.id,
        },
      })

      return event
    }),

  getParticipants: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id

      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const participants = await ctx.prisma.participantsOnEvents.findMany({
        where: { eventId: input.eventId },
        select: {
          userEventStatus: true,
          comment: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      const joinedUsers = participants.filter(
        (participant) => participant.userEventStatus === 'JOINED',
      )
      const canceledUsers = participants.filter(
        (participant) => participant.userEventStatus === 'CANCELED',
      )

      const maybeUsers = participants.filter(
        (participant) => participant.userEventStatus === 'MAYBE',
      )

      return {
        participants,
        joinedUsersAmount: joinedUsers.length,
        canceledUsersAmount: canceledUsers.length,
        maybeUsersAmount: maybeUsers.length,
      }
    }),
  setParticipatingStatus: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        status: z.enum(['JOINED', 'CANCELED', 'MAYBE']),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { eventId, status } = input
      const userId = session.user.id

      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

      switch (status) {
        case 'JOINED':
          const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { participants: true },
          })
          if (
            event?.participants.filter(
              (participant) => participant.userEventStatus === 'JOINED',
            ).length === event?.maxParticipants
          )
            throw new TRPCError({ code: 'PRECONDITION_FAILED' })

          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'JOINED',
            },
            update: {
              userEventStatus: 'JOINED',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })
        case 'CANCELED':
          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'CANCELED',
            },
            update: {
              userEventStatus: 'CANCELED',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })

        case 'MAYBE':
          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'MAYBE',
            },
            update: {
              userEventStatus: 'MAYBE',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })
        default:
          throw new TRPCError({ code: 'BAD_REQUEST' })
      }
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
  getByGroupId: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.findMany({
        where: { groupId: input.groupId },
        orderBy: { date: 'asc' },
      })
    }),
})
