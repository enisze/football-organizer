import { TRPCError } from "@trpc/server";
import { find, map, reduce } from "lodash";
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
  getByGmailMailid: protectedProcedure
    .input(
      z.object({
        gmailMailId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { gmailMailId } = input;
      return await prisma.payment.findFirst({
        where: { gmailMailId },
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
  getUserBalance: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      const payments = await prisma.payment.findMany({
        where: { userId: session.user.id },
      });
      const events = await prisma.event.findMany({
        where: {
          participants: { some: { id: session.user.id } },
        },
        include: { payments: true },
      });
      const paidBalance = reduce(
        payments,
        (acc, payment) => {
          const event = find(events, (event) => event.id === payment.eventId);
          if (!event) {
            return acc + payment.amount;
          }

          return acc;
        },
        0
      );

      const unpaidBalance = reduce(
        events,
        (acc, event) => {
          const payment = find(
            event.payments,
            (payment) => payment.userId === session.user.id
          );
          if (payment) {
            return acc;
          }
          return acc - event.cost / 10;
        },
        0
      );

      return paidBalance + unpaidBalance;
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
        include: { participants: true, payments: true },
      });

      const paymentsFromNotParticipants = await Promise.all(
        map(event?.payments, async (payment) => {
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
