import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const groupRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.group.findUnique({
        where: { id: input.id },
        include: { users: true, user: true },
      })
    }),
  getEvents: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.group.findUnique({
        where: { id: input.id },
        include: { events: true },
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.group.delete({ where: { id: input.id } })
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const owner = session.user
      const id = owner.id

      if (!id) throw new TRPCError({ code: 'BAD_REQUEST' })

      return await prisma.group.create({
        data: {
          name: input.name,
          user: { connect: { id } },
        },
      })
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id, name } = input
      return await prisma.group.update({ data: { name }, where: { id } })
    }),
})
