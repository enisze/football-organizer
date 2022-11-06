import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const paymentRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        amount: z.number(),
        paymentDate: z.date(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { eventId, amount, paymentDate } = input;
      return await prisma.payment.create({
        data: {
          eventId: eventId,
          userId: session.user.id,
          amount: amount,
          paymentDate: paymentDate,
        },
      });
    }),
  get: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input }) => {
      const { eventId } = input;
      return await prisma.payment.findFirst({
        where: { eventId: eventId, userId: session.user.id },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    return await prisma.payment.findMany({
      where: { userId: session.user.id },
    });
  }),
});
