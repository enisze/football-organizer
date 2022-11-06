import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const eventRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  create: protectedProcedure
    .input(
      z
        .object({
          address: z.string(),
          startDate: z.date(),
          endDate: z.date(),
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
  join: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      if (!session.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.event.update({
        data: { participants: { connect: { email: session.user.email } } },
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
      if (!session.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.event.update({
        data: { participants: { disconnect: { email: session.user.email } } },
        where: { id: input.eventId },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma }, input }) => {
      return await prisma.event.delete({ where: { id: input.id } });
    }),
});
