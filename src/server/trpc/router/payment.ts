import { TRPCError } from "@trpc/server";
import { map, reduce } from "lodash";
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

  getByUserAndEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const { eventId, userId } = input;
      return await prisma.payment.findFirst({
        where: { eventId, userId },
      });
    }),
  getByEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input }) => {
      const { eventId } = input;
      return await prisma.payment.findFirst({
        where: { eventId, userId: session.user.id },
      });
    }),
  getAllForUser: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      return await prisma.payment.findMany({
        where: { userId: session.user.id },
      });
    }
  ),
  getAllPaymentsForEventFromNotParticipants: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const event = await prisma.event.findUnique({
        where: { id: input.eventId },
        include: { participants: true, Payment: true },
      });

      const paymentsFromNotParticipants = await Promise.all(
        map(event?.Payment, async (payment) => {
          const participantIds = reduce(
            event?.participants,
            (acc: string[], user) => {
              return [...acc, user.id];
            },
            []
          );
          if (!participantIds.includes(payment.userId)) {
            const user = await prisma.user.findUnique({
              where: { id: payment.userId },
            });
            return { ...payment, user };
          }
          return undefined;
        }).filter((x) => Boolean(x))
      );

      return paymentsFromNotParticipants;
    }),
  deleteAllPayments: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.payment.deleteMany({
      where: { amount: { gte: 0 } },
    });
  }),
});
