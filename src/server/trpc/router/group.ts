import { TRPCError } from '@trpc/server'
import { decode, sign } from 'jsonwebtoken'
import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { verifyJWT } from '../verifyJWT'

export const groupRouter = router({
  getGroupsOfUser: protectedProcedure
    .input(z.object({ owned: z.boolean() }).optional())
    .query(async ({ ctx, input }) => {
      const {
        user: { id },
      } = ctx.session

      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await ctx.prisma.group.findMany({
        where: input?.owned ? { ownerId: id } : { users: { some: { id } } },
        select: {
          name: true,
          id: true,
          createdAt: true,
          events: true,
          pricingModel: true,
          users: true,
        },
      })
    }),
  getGroupbyId: protectedProcedure
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
      return { group: res, users }
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
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { id } = input

      const {
        user: { id: ownerId },
      } = session

      const group = await prisma.group.findFirst({ where: { id, ownerId } })
      if (!group) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.group.delete({ where: { id } })
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const owner = session.user
      const id = owner.id

      if (!id) throw new TRPCError({ code: 'BAD_REQUEST' })

      const group = await prisma.group.create({
        data: {
          name: input.name,
          ownerId: id,
          users: { create: { id } },
        },
        select: { id: true, name: true },
      })

      await prisma.userOnGroups.create({
        data: { id, groupId: group.id, role: 'OWNER' },
      })

      return group.name
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { id, name } = input
      return await prisma.group.update({ data: { name }, where: { id } })
    }),
  deleteUser: protectedProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { groupId, userId } = input
      return await prisma.group.update({
        data: { users: { delete: { id_groupId: { groupId, id: userId } } } },
        where: { id: groupId },
      })
    }),
  getDataFromJWT: protectedProcedure
    .input(z.object({ JWT: z.string() }))
    .query(async ({ input }) => {
      const isValid = verifyJWT(input.JWT)

      if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST' })

      const res = decode(input.JWT) as {
        id: string
        groupName: string
        ownerName: string
      }

      return res
    }),

  addUserViaJWT: protectedProcedure
    .input(z.object({ JWT: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const userId = session.user.id

      const isValid = verifyJWT(input.JWT)

      if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST' })

      const res = decode(input.JWT) as {
        id: string
        groupName: string
        ownerName: string
      }

      return await prisma.group.update({
        data: {
          users: { create: { id: userId } },
        },
        where: { id: res.id },
      })
    }),
  getJWT: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        groupName: z.string(),
        ownerName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id, groupName, ownerName } = input
      const token = sign(
        { id, groupName, ownerName },
        process.env.JWT_SECRET as string,
      )

      return token
    }),
})
