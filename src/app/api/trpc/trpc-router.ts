import { sendGroupRequestEmail } from '@/inngest/sendGroupRequestEmail'
import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import { sendWelcomeMail } from '@/inngest/sendWelcomeMail'
import { getAddressAndCoordinatesRedisKeys } from '@/src/helpers/getAddressAndCoordinatesRedisKeys'
import { redis } from '@/src/server/redis/redis'
import type { Context } from '@/src/server/trpc/context'
import { mapCoordinatesToArray } from '@/src/server/trpc/router/map'
import { rateLimitedProcedure } from '@/src/server/trpc/trpc'
import { verifyJWT } from '@/src/server/trpc/verifyJWT'
import { TRPCError, initTRPC } from '@trpc/server'
import axios from 'axios'
import { isAfter, subDays } from 'date-fns'
import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library'
import { gmail_v1, google } from 'googleapis'
import { decode, sign } from 'jsonwebtoken'
import superjson from 'superjson'
import { z } from 'zod'
import { inngest, prisma } from '../../../server/db/client'

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const publicProcedure = t.procedure

const router = t.router

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed)

const groupRouter = router({
  getGroupsOfUser: publicProcedure
    .input(
      z.object({
        owned: z.boolean().optional(),
        id: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      //TODO: Fix this
      // const {
      //   user: { id },
      // } = ctx.session

      // if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const { id } = input

      const result = await prisma.group.findMany({
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
      return result
    }),
  getGroupbyId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const res = await prisma.group.findUnique({
        where: { id: input.id },
        include: { users: true },
      })

      const users = await Promise.all(
        res
          ? res?.users.map((user) => {
              return prisma.user.findUnique({ where: { id: user.id } })
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
    .query(async ({ input }) => {
      const res = await prisma.group.findUnique({
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
    .query(async ({ input }) => {
      return await prisma.group.findUnique({
        where: { id: input.id },
        include: { events: true },
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), ownerId: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ownerId } = input

      // const {
      //   user: { id: ownerId },
      // } = session

      const group = await prisma.group.findFirst({ where: { id, ownerId } })
      if (!group) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.group.delete({ where: { id } })
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), ownerId: z.string() }))
    .mutation(async ({ input }) => {
      // const owner = session.user
      // const id = owner.id

      const { ownerId: id } = input

      if (!id) throw new TRPCError({ code: 'BAD_REQUEST' })

      const group = await prisma.group.create({
        data: {
          name: input.name,
          ownerId: id,
          users: { create: { id, role: 'OWNER' } },
        },
        select: { id: true, name: true },
      })

      return group.name
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const { id, name } = input
      return await prisma.group.update({ data: { name }, where: { id } })
    }),
  deleteUser: protectedProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
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
    .input(z.object({ JWT: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      // const userId = session.user.id
      const { userId, JWT } = input

      const isValid = verifyJWT(JWT)

      if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST' })

      const res = decode(JWT) as {
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

export const eventRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          address: z.string(),
          date: z.date(),
          startTime: z.string(),
          endTime: z.string(),
          cost: z.number(),
          maxParticipants: z.number(),
          groupId: z.string(),
        })
        .nullish(),
    )
    .mutation(async ({ input }) => {
      if (!input) throw new TRPCError({ code: 'BAD_REQUEST' })

      const event = await prisma.event.create({
        data: { ...input },
      })

      await inngest.send('event/new', {
        data: {
          id: event.id,
        },
      })

      return event
    }),

  getParticipants: protectedProcedure
    .input(z.object({ eventId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      // const userId = ctx.session.user.id

      const { eventId, userId } = input

      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })

      const participants = await prisma.participantsOnEvents.findMany({
        where: { eventId },
        select: {
          userEventStatus: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      const joinedUsers = participants.filter(
        (participant) => participant.userEventStatus === 'JOINED',
      )
      const canceledUsers = participants.filter(
        (participant) => participant.userEventStatus === 'CANCELED',
      )

      const maybeUsers = participants.filter(
        (participant) => participant.userEventStatus === 'MAYBE',
      )

      return {
        participants,
        joinedUsersAmount: joinedUsers.length,
        canceledUsersAmount: canceledUsers.length,
        maybeUsersAmount: maybeUsers.length,
      }
    }),
  setParticipatingStatus: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        status: z.enum(['JOINED', 'CANCELED', 'MAYBE']),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { eventId, status, userId } = input
      // const userId = session.user.id

      if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' })
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' })

      switch (status) {
        case 'JOINED':
          const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { participants: true },
          })
          if (
            event?.participants.filter(
              (participant) => participant.userEventStatus === 'JOINED',
            ).length === event?.maxParticipants
          )
            throw new TRPCError({ code: 'PRECONDITION_FAILED' })

          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'JOINED',
            },
            update: {
              userEventStatus: 'JOINED',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })
        case 'CANCELED':
          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'CANCELED',
            },
            update: {
              userEventStatus: 'CANCELED',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })

        case 'MAYBE':
          return await prisma.participantsOnEvents.upsert({
            create: {
              eventId,
              id: userId,
              userEventStatus: 'MAYBE',
            },
            update: {
              userEventStatus: 'MAYBE',
            },
            where: {
              id_eventId: {
                eventId,
                id: userId,
              },
            },
          })
        default:
          throw new TRPCError({ code: 'BAD_REQUEST' })
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { addressKey, coordinatesKey } = getAddressAndCoordinatesRedisKeys(
        input.id,
      )

      try {
        console.log(await redis.ping())
      } catch (error) {
        await redis.connect()
      }
      await redis.del(addressKey)
      await redis.del(coordinatesKey)
      return await prisma.event.delete({ where: { id: input.id } })
    }),
  book: protectedProcedure
    .input(z.object({ id: z.string(), date: z.date() }))
    .mutation(async ({ input }) => {
      return await prisma.event.update({
        data: { status: 'BOOKED', bookingDate: subDays(input.date, 1) },
        where: { id: input.id },
      })
    }),
  cancel: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.event.update({
        data: { status: 'CANCELED', bookingDate: null },
        where: { id: input.id },
      })
    }),
  deleteAll: protectedProcedure.query(async ({}) => {
    return await prisma.event.deleteMany()
  }),
})

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
}

const oAuth2Client = new OAuth2Client(credentials)

const PAYPAL_LABEL = 'Label_3926228921657449356'

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

export const gmailRouter = router({
  generateAuthLink: protectedProcedure.query(() => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/oauth2callback',
    })
    return authorizeUrl
  }),

  setToken: protectedProcedure
    .input(z.object({ code: z.string(), userId: z.string() }))
    .query(async ({ input: { code, userId: id } }) => {
      const { tokens } = await oAuth2Client.getToken(code)

      const { expiry_date, access_token, refresh_token } = tokens

      if (!expiry_date || !refresh_token || !access_token || !id)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Access revoked',
        })

      await prisma.tokens.deleteMany({ where: { ownerId: id } })

      return await prisma.tokens.create({
        data: {
          expiry_date: new Date(expiry_date),
          access_token,
          refresh_token,
          ownerId: id,
        },
      })
    }),
  paypalEmails: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const tokens = await prisma.tokens.findMany()

      const { name } = input

      const token = tokens[0]

      if (!token)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'No tokens found' })

      const { access_token, expiry_date } = token

      try {
        oAuth2Client.setCredentials({
          access_token,
          expiry_date: expiry_date.getTime(),
          token_type: 'access_token',
        })

        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })

        const { data } = await gmail.users.messages.list({
          userId: 'me',
          labelIds: [PAYPAL_LABEL],
        })

        const result = await Promise.all(
          data.messages?.map(async (message) => {
            const res = await gmail.users.messages.get({
              userId: 'me',
              id: message.id ?? undefined,
            })
            return res.data
          }) ?? [],
        )

        if (!result)
          throw new TRPCError({ code: 'NOT_FOUND', message: 'No Paypal data' })

        const filteredByUserAndDate = result.filter((res) => {
          if (!res.internalDate) return false

          const paymentDate = new Date(Number(res.internalDate))
          return (
            res.snippet?.toLowerCase().includes(name.toLowerCase()) &&
            isAfter(paymentDate, new Date('01.11.2022'))
          )
        }) as gmail_v1.Schema$Message[]

        return filteredByUserAndDate
      } catch (error) {
        console.log('failed token')
        console.log(error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Probably new gmail token needed',
        })
      }
    }),
  sendPaidButCancledMail: protectedProcedure
    .input(z.object({ eventId: z.string(), userId: z.string() }))
    .mutation(async ({ input: { eventId, userId: id } }) => {
      const event = await prisma.event.findUnique({ where: { id: eventId } })
      const user = await prisma.user.findUnique({
        where: { id },
      })

      const group = await prisma.group.findUnique({
        where: { id: event?.groupId ?? '' },
        include: { owner: { select: { email: true, name: true } } },
      })

      return await sendPaidButCanceledMail(event, user, group?.owner ?? null)
    }),
  sendWelcomeMail: protectedProcedure.mutation(
    async ({ ctx: { prisma, session } }) => {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      })

      return await sendWelcomeMail(user)
    },
  ),
  sendGroupRequestMail: rateLimitedProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input: { email } }) => {
      return await sendGroupRequestEmail({ requester: email })
    }),
  sendPaymentAndEventReminder: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ input }) => {
      await inngest.send({
        name: 'event/reminder',
        data: {
          id: input.eventId,
        },
      })
    }),
})

const LATLONG_API_KEY = process.env.LATLONG_API_KEY

export const mapRouter = router({
  getLatLong: protectedProcedure
    .input(z.object({ id: z.string(), address: z.string() }))
    .query(async ({ input }) => {
      const { id, address } = input

      try {
        await redis.ping()
      } catch (error) {
        console.log('connecting')
        await redis.connect()
      }

      if (!address) return null

      const { addressKey, coordinatesKey } =
        getAddressAndCoordinatesRedisKeys(id)

      const cachedAddress = await redis.get(addressKey)
      const coordinates = await redis.get(coordinatesKey)

      if (
        coordinates !== 'undefined,undefined' &&
        coordinates &&
        cachedAddress === address
      ) {
        return mapCoordinatesToArray(coordinates)
      } else {
        await redis.set(addressKey, address)

        try {
          const {
            data: { data },
          } = await axios.get(
            `http://api.positionstack.com/v1/forward?access_key=${LATLONG_API_KEY}&query=${address}`,
          )
          const longitude = data[0].longitude
          const latitude = data[0].latitude

          if (!latitude || !longitude) {
            return null
          }
          const coordinates = `${longitude},${latitude}`

          await redis.set(coordinatesKey, coordinates)

          return mapCoordinatesToArray(coordinates)
        } catch (error) {
          console.log(error)
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
        }
      }
    }),
})

export const paymentRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        amount: z.number(),
        paymentDate: z.date(),
        gmailMailId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { eventId, amount, paymentDate, gmailMailId } = input

      const { userId: id } = input

      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.payment.create({
        data: {
          eventId: eventId,
          userId: id,
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
    .mutation(async ({ input }) => {
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
    .query(async ({ input }) => {
      const { eventId, userId } = input
      return await prisma.payment.findFirst({
        where: { eventId, userId },
      })
    }),
  getByEventId: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { eventId, userId: id } = input
      return await prisma.payment.findFirst({
        where: { eventId, userId: id },
      })
    }),
  getUserBalance: protectedProcedure
    .input(
      z.object({
        groupId: z.string(),

        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const events = await prisma.event.findMany({
        where: {
          groupId: input.groupId,
          participants: { some: { id: input.userId } },
        },
      })

      const userEventStatus = await prisma.participantsOnEvents.findMany({
        where: { id: input.userId },
      })

      const balance = await userEventStatus.reduce(async (acc, userEvent) => {
        const event = events.find((event) => event.id === userEvent.eventId)

        if (!event) return acc

        const payment = await prisma.payment.findFirst({
          where: { userId: input.userId, eventId: event.id },
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
    .query(async ({ input }) => {
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
  deleteAllPayments: protectedProcedure.query(async ({}) => {
    return await prisma.payment.deleteMany({
      where: { amount: { gte: 0 } },
    })
  }),
})

export const userRouter = router({
  cancelEvent: protectedProcedure
    .input(z.object({ eventId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      const id = input.userId
      await prisma.participantsOnEvents.update({
        where: {
          id_eventId: {
            eventId: input.eventId,
            id,
          },
        },
        data: {
          userEventStatus: 'CANCELED',
        },
      })
    }),
  getUserNamesByIds: protectedProcedure
    .input(z.object({ ids: z.string().array(), eventId: z.string() }))
    .query(async ({ input }) => {
      const { eventId, ids } = input

      const res = await Promise.all(
        ids.map(async (id) => {
          const a = await prisma.user.findUnique({
            where: { id },
          })

          if (!a) {
            await prisma.participantsOnEvents.deleteMany({ where: { id } })
            return
          }

          const user = prisma.participantsOnEvents.findUnique({
            where: { id_eventId: { eventId, id } },
            select: {
              userEventStatus: true,
              user: { select: { name: true, id: true } },
              event: { select: { id: true } },
            },
          })
          return user
        }),
      )

      return res
    }),
  deleteAll: protectedProcedure.query(async ({}) => {
    await prisma.user.deleteMany()
  }),
  updateNotifications: protectedProcedure
    .input(z.object({ notificationsEnabled: z.boolean(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { notificationsEnabled, userId } = input
      const id = userId
      return await prisma.user.update({
        where: { id },
        data: { notificationsEnabled },
        select: { notificationsEnabled: true },
      })
    }),
  getNotificationStatus: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const id = input.userId
      return await prisma.user.findUnique({
        where: { id },
        select: { notificationsEnabled: true },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const id = input.userId
      return await prisma.user.delete({
        where: { id },
      })
    }),
  getDataFromJWT: publicProcedure
    .input(z.object({ JWT: z.string() }))
    .query(async ({ input }) => {
      const isValid = verifyJWT(input.JWT)

      if (!isValid) throw new TRPCError({ code: 'BAD_REQUEST' })

      const res = decode(input.JWT) as {
        email: string
      }

      return res
    }),
  checkByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findFirst({
        where: { email: input.email },
      })

      return Boolean(user)
    }),

  updatePaypalName: protectedProcedure
    .input(z.object({ name: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { name } = input
      const id = input.userId
      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.user.update({
        where: { id },
        data: { paypalName: name },
      })
    }),

  getPaypalName: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const id = input.userId
      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.user.findUnique({
        where: { id },
        select: { paypalName: true },
      })
    }),
  setEventComment: publicProcedure
    .input(
      z.object({
        comment: z.string().nullable(),
        eventId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { comment, eventId } = input
      const id = input.userId
      if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })

      return await prisma.participantsOnEvents.update({
        where: { id_eventId: { id, eventId } },
        data: { comment },
      })
    }),
})

export const appRouter = t.router({
  event: eventRouter,
  gmail: gmailRouter,
  payment: paymentRouter,
  user: userRouter,
  map: mapRouter,
  group: groupRouter,
})

export type AppRouter = typeof appRouter
