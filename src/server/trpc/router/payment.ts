import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const paymentRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        amount: z.number(),
        paymentDate: z.date(),
        gmailMailId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { eventId, amount, paymentDate, gmailMailId } = input;

      if (!session.user.id) throw new TRPCError({ code: "UNAUTHORIZED" });
      const payment = await prisma.payment.findFirst({
        where: {
          userId: session.user.id,
          amount: amount,
          paymentDate: paymentDate,
          gmailMailId: gmailMailId,
        },
      });

      if (payment) return null;

      return await prisma.payment.create({
        data: {
          eventId: eventId,
          userId: session.user.id,
          amount: amount,
          paymentDate: paymentDate,
          gmailMailId: gmailMailId,
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

  getAllForUser: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      return await prisma.payment.findMany({
        where: { userId: session.user.id },
      });
    }
  ),
  getAllPaymentsForEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      return await prisma.payment.findMany({
        where: { eventId: input.eventId },
        include: { user: true },
      });
    }),
  deleteAllPayments: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.payment.deleteMany({
      where: { amount: { gte: 0 } },
    });
  }),
});
