import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const eventRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          address: z.string(),
          date: z.date(),
          startTime: z.string(),
          endTime: z.string(),
          booked: z.boolean(),
        })
        .nullish()
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      if (!input) throw new TRPCError({ code: "BAD_REQUEST" });
      return await prisma.event.create({
        data: { ...input },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.event.findMany({
      take: 10,
      include: { participants: true },
    });
  }),

  getAllForUser: publicProcedure.query(async ({ ctx: { session, prisma } }) => {
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
    const { user } = session;
    return await prisma.event.findMany({
      where: { participants: { some: { id: user?.id } } },
    });
  }),
  join: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      if (!session.user.id) throw new TRPCError({ code: "UNAUTHORIZED" });

      const event = await prisma.event.findUnique({
        where: { id: input.eventId },
        include: { participants: true },
      });

      if (event?.participants.length === 10)
        throw new TRPCError({ code: "PRECONDITION_FAILED" });

      return await prisma.event.update({
        data: { participants: { connect: { id: session.user.id } } },
        where: { id: input.eventId },
      });
    }),
  leave: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      if (!session.user.id) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.event.update({
        data: { participants: { disconnect: { id: session.user.id } } },
        where: { id: input.eventId },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.delete({ where: { id: input.id } });
    }),
  book: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.update({
        data: { booked: true },
        where: { id: input.id },
      });
    }),
});
