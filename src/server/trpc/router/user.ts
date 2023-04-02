import { TRPCError } from '@trpc/server'
import { decode } from 'jsonwebtoken'
import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { verifyJWT } from '../verifyJWT'

export const userRouter = router({
  cancelEvent: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const id = session.user.id
      await prisma.participantsOnEvents.update({
        where: {
          id_eventId: {
            eventId: input.eventId,
            id,
          },
        },
        data: {
          userEventStatus: 'CANCELED',
        },
      })
    }),
  getUserNamesByIds: protectedProcedure
    .input(z.object({ ids: z.string().array(), eventId: z.string() }))
    .query(async ({ ctx: { prisma }, input }) => {
      const { eventId, ids } = input
      const res = await Promise.all(
        ids.map((id) =>
          prisma.participantsOnEvents.findUnique({
            where: { id_eventId: { eventId, id } },
            select: {
              userEventStatus: true,
              user: { select: { name: true, id: true } },
            },
          }),
        ),
      )

      return res
    }),
  deleteAll: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    await prisma.user.deleteMany()
  }),
  updateNotifications: protectedProcedure
    .input(z.object({ notificationsEnabled: z.boolean() }))
    .mutation(async ({ ctx: { session, prisma }, input }) => {
      const { notificationsEnabled } = input
      const id = session.user.id
      return await prisma.user.update({
        where: { id },
        data: { notificationsEnabled },
        select: { notificationsEnabled: true },
      })
    }),
  getNotificationStatus: protectedProcedure.query(
    async ({ ctx: { session, prisma } }) => {
      const id = session.user.id
      return await prisma.user.findUnique({
        where: { id },
        select: { notificationsEnabled: true },
      })
    },
  ),
  delete: protectedProcedure.mutation(async ({ ctx: { session, prisma } }) => {
    const id = session.user.id
    return await prisma.user.delete({
      where: { id },
    })
  }),
  getDataFromJWT: publicProcedure
    .input(z.object({ JWT: z.string() }))
    .query(async ({ input }) => {
      const isValid = verifyJWT(input.JWT)

      if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST' })

      const res = decode(input.JWT) as {
        email: string
      }

      return res
    }),
  checkByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      })

      return Boolean(user)
    }),

  updatePaypalName: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      const { name } = input
      const id = session?.user?.id
      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.user.update({
        where: { id },
        data: { paypalName: name },
      })
    }),

  getPaypalName: publicProcedure.query(async ({ ctx: { prisma, session } }) => {
    const id = session?.user?.id
    if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

    return await prisma.user.findUnique({
      where: { id },
      select: { paypalName: true },
    })
  }),
})
