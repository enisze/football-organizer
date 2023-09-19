import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
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

  setEventComment: publicProcedure
    .input(z.object({ comment: z.string().nullable(), eventId: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { comment, eventId } = input
      const id = session?.user?.id
      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.participantsOnEvents.update({
        where: { id_eventId: { id, eventId } },
        data: { comment },
      })
    }),
})
