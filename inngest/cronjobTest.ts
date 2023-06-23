import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'
import { PrismaClient } from '../prisma/generated/client'
import { getEuroAmount } from '../src/helpers/getEuroAmount'

import { isDateInCertainRange } from '@/src/helpers/isDateInCertainRange'
import { differenceInDays, subDays } from 'date-fns'
import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import type { Event, Payment } from '../prisma/generated/client'
import { inngest } from './inngestClient'

const asyncForEach = async <T>(
  array: (T | undefined)[],
  callback: (
    item: T,
    index: number,
    array: (T | undefined)[],
  ) => Promise<{ message: string } | undefined>,
) => {
  for (let index = 0; index < array.length; index++) {
    const item = array[index]
    if (item !== undefined) {
      await callback(item, index, array as T[])
    }
  }
}

const prisma = new PrismaClient()

export const cronJobTest = inngest.createFunction(
  { name: 'Cronjob test' },
  { cron: '0 0 * * *' },
  ({ step }) => {
    runCron(step)
  },
)
const runCron = async (step?: any) => {
  console.log('Starting cron')

  const ownerIds = await prisma.group.findMany({
    select: {
      ownerId: true,
      id: true,
      owner: { select: { email: true, name: true } },
    },
  })

  const emailsAlreadyInDB: Payment[] = []

  await asyncForEach(ownerIds, async (data) => {
    console.log(data.id)

    return { message: data.id }
  })

  return `
    Email amount: 
    Emails found already in DB: ${
      emailsAlreadyInDB.length
    } ${emailsAlreadyInDB.map((mail) => mail.gmailMailId)}
    Amount of emails that fulfill conditions and are not in DB yet: 
    `
}

const credentials: OAuth2ClientOptions = {
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
}

const PAYPAL_LABEL = 'Label_3926228921657449356'

const oAuth2Client = new OAuth2Client(credentials)

const getPaypalEmails = async (
  ownerId: string,
  ownerEmail: string,
  ownerName: string,
) => {
  const token = await prisma.tokens.findFirst({ where: { ownerId } })

  if (!token) {
    console.log('No token found')
    return
  }

  const { access_token, expiry_date, refresh_token } = token

  try {
    console.log('Getting Gmail emails')
    oAuth2Client.setCredentials({
      access_token,
      expiry_date: expiry_date.getTime(),
      refresh_token,
    })

    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
    const { data } = await gmail.users.messages.list({
      userId: 'me',
      labelIds: [PAYPAL_LABEL],
    })

    const result = await Promise.all(
      data.messages
        ? data.messages?.map(async (label) => {
            const res = await gmail.users.messages.get({
              userId: 'me',
              id: label.id ?? undefined,
            })
            return res.data
          })
        : [],
    )

    const filteredResult = result.filter((res) => {
      const date = new Date(Number(res.internalDate))
      const dateNow = new Date()

      const nowLastWeek = subDays(dateNow, 7)
      const dateDiff = differenceInDays(nowLastWeek, date)

      return dateDiff < 0
    })

    if (!filteredResult) {
      console.log('No Paypal data')
      return
    }

    return { result: filteredResult, success: true }
  } catch (error) {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/oauth2callback',
    })

    return { authorizeUrl, ownerEmail, ownerName, error: 'Token has expired' }
  }
}

const AMOUNT_LIST = [4.5, 5, 10, 11]

const isInAmountRangeAndEventBookingDate = (
  paymentMail: gmail_v1.Schema$Message,
  events: Event[] | undefined,
): { conditionFulfilled: boolean; event: Event | undefined } | undefined => {
  if (!paymentMail.internalDate) return undefined
  if (!paymentMail.snippet) return undefined
  if (!events) return undefined

  const amount = getEuroAmount(paymentMail.snippet)
  const paymentDate = new Date(Number(paymentMail.internalDate))

  const eventWithBookingDateInRange = events.find((event) => {
    if (!event.bookingDate) return null
    const dateInRange = isDateInCertainRange(paymentDate, event.bookingDate)

    return dateInRange
  })

  const amountInRange = AMOUNT_LIST.includes(amount)

  return {
    conditionFulfilled: Boolean(eventWithBookingDateInRange) && amountInRange,
    event: eventWithBookingDateInRange,
  }
}
