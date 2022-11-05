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
    });
  }),
});
