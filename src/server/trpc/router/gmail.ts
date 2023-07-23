import { sendGroupRequestEmail } from '@/inngest/sendGroupRequestEmail'
import { sendPaidButCanceledMail } from '@/inngest/sendPaidButCanceledMail'
import { sendWelcomeMail } from '@/inngest/sendWelcomeMail'
import { TRPCError } from '@trpc/server'
import { isAfter } from 'date-fns'
import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'
import { z } from 'zod'

import { protectedProcedure, rateLimitedProcedure, router } from '../trpc'

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
    .input(z.object({ code: z.string() }))
    .query(async ({ input: { code }, ctx: { prisma, session } }) => {
      const { tokens } = await oAuth2Client.getToken(code)

      const { expiry_date, access_token, refresh_token } = tokens

      if (!expiry_date || !refresh_token || !access_token || !session.user.id)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Access revoked',
        })

      await prisma.tokens.deleteMany({ where: { ownerId: session.user.id } })

      return await prisma.tokens.create({
        data: {
          expiry_date: new Date(expiry_date),
          access_token,
          refresh_token,
          ownerId: session.user.id,
        },
      })
    }),
  paypalEmails: protectedProcedure.query(
    async ({
      ctx: {
        session: {
          user: { name },
        },
        prisma,
      },
    }) => {
      const tokens = await prisma.tokens.findMany()

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
    },
  ),
  sendPaidButCancledMail: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input: { eventId } }) => {
      const event = await prisma.event.findUnique({ where: { id: eventId } })
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
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
    .mutation(async ({ input, ctx: { inngest } }) => {
      await inngest.send({
        name: 'event/reminder',
        data: {
          id: input.eventId,
        },
      })
    }),
})
