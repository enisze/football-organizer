import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const groupRouter = router({
  getGroupNamesOwnedByUser: protectedProcedure
    .input(
      z.object({
        ownerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.group.findMany({
        where: { ownerId: input.ownerId },
        select: { name: true },
      })
    }),
  getUsers: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.prisma.group.findUnique({
        where: { id: input.id },
        include: { users: true },
      })

      const users = await Promise.all(
        res
          ? res?.users.map((user) => {
              return prisma?.user.findUnique({ where: { id: user.id } })
            })
          : [],
      ).then((data) => {
        return data.map((user) => {
          if (!user) return null
          return user
        })
      })

      return users
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
          ownerId: id,
          users: { create: { id } },
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
