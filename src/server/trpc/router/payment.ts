import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../../../utils/trpc'

export const paymentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        amount: z.number(),
        paymentDate: z.date(),
        gmailMailId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const { eventId, amount, paymentDate, gmailMailId } = input

      if (!session.user.id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.payment.create({
        data: {
          eventId: eventId,
          userId: session.user.id,
          amount: amount,
          paymentDate: paymentDate,
          gmailMailId: gmailMailId,
        },
      })
    }),
  getByGmailMailid: protectedProcedure
    .input(
      z.object({
        gmailMailId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const { gmailMailId } = input
      return await prisma.payment.findFirst({
        where: { gmailMailId },
      })
    }),
  getByUserAndEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const { eventId, userId } = input
      return await prisma.payment.findFirst({
        where: { eventId, userId },
      })
    }),
  getByEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx: { prisma, session }, input }) => {
      const { eventId } = input
      return await prisma.payment.findFirst({
        where: { eventId, userId: session.user.id },
      })
    }),
  getUserBalance: protectedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(async ({ ctx: { prisma, session }, input }) => {
      const events = await prisma.event.findMany({
        where: {
          groupId: input.groupId,
          participants: { some: { id: session.user.id } },
        },
      })

      const userEventStatus = await prisma.participantsOnEvents.findMany({
        where: { id: session.user.id },
      })

      const balance = await userEventStatus.reduce(async (acc, userEvent) => {
        const event = events.find((event) => event.id === userEvent.eventId)

        if (!event) return acc

        const payment = await prisma.payment.findFirst({
          where: { userId: session.user.id, eventId: event.id },
        })

        const cost: number = event.cost / event.maxParticipants

        if (userEvent.userEventStatus === 'JOINED') {
          if (!payment) return (await acc) - cost
        }
        if (userEvent.userEventStatus === 'CANCELED') {
          if (payment) return (await acc) + cost
        }
        return acc
      }, Promise.resolve(0))

      return balance
    }),
  getAllPaymentsForEventFromNotParticipants: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx: { prisma }, input }) => {
      const participantsWithoutPayment =
        await prisma.participantsOnEvents.findMany({
          where: { eventId: input.eventId, paymentId: { not: null } },
        })

      const paymentsFromNonparticipants = await Promise.all(
        participantsWithoutPayment.map(async (participant) => {
          const user = await prisma.user.findUnique({
            where: { id: participant.id },
          })

          const paymentId = participant.paymentId

          if (!paymentId) throw new TRPCError({ code: 'NOT_FOUND' })

          const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
          })

          return {
            id: paymentId,
            user,
            amount: payment?.amount,
            paymentDate: payment?.paymentDate,
          }
        }),
      )

      return paymentsFromNonparticipants
    }),
  deleteAllPayments: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.payment.deleteMany({
      where: { amount: { gte: 0 } },
    })
  }),
})
