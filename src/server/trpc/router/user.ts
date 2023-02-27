import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

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
    .input(z.object({ ids: z.string().array() }))
    .query(async ({ ctx: { prisma }, input }) => {
      const res = await Promise.all(
        input.ids.map((id) =>
          prisma.user.findUnique({
            where: {
              id,
            },
            select: { name: true, id: true },
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
})
