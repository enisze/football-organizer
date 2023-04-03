import { sendNewRefreshTokenMail } from '@/inngest/sendNewRefreshTokenMail'
import type { Event, Payment } from '@/prisma/generated/client'
import { PrismaClient } from '@/prisma/generated/client'
import { getEuroAmount } from '@/src/helpers/getEuroAmount'
import { isDateInCertainRange } from '@/src/helpers/isDateInCertainRange'
import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'

const prisma = new PrismaClient()

export default async function job() {
  const ownerIds = await prisma.group.findMany({
    select: { ownerId: true, owner: { select: { email: true, name: true } } },
  })

  ownerIds.forEach(async (data) => {
    const result = await getPaypalEmails(
      data.ownerId,
      data.owner.email,
      data.owner.name,
    )

    if (!result) return { message: 'No paypal emails' }

    if (result === 'Token has expired') return { message: 'New token needed' }

    const events = await prisma.event.findMany()
    const users = await prisma.user.findMany()
    const payments = await prisma.payment.findMany()

    const paymentsAddedForUser: {
      eventId: string
      amount: number
      paymentDate: Date
      gmailMailId: string
      userId: string
      name: string
    }[] = []

    let emailAmount = 0

    const emailsAlreadyInDB: Payment[] = []

    let emailsWithConditions = 0

    users
      .filter((user) => user.email !== 'eniszej@gmail.com')
      .forEach((user) => {
        //Get all paypal emails from specific user

        const filteredByUser = result.filter((res) => {
          if (!res.internalDate) return false

          return res.snippet?.toLowerCase().includes(user.name.toLowerCase())
        }) as gmail_v1.Schema$Message[]

        console.log(
          user.name + ' got ' + filteredByUser.length + ' paypalMails',
        )

        emailAmount += filteredByUser.length

        filteredByUser.forEach((email) => {
          const res = payments.find(
            (payment) => payment.gmailMailId === email.id,
          )

          if (res) {
            emailsAlreadyInDB.push(res)
            console.log('payment already exists')
            return
          }

          const result = isInAmountRangeAndEventBookingDate(email, events)

          if (!result || !email.snippet || !email.id) {
            console.log('email data missing')
            return
          }

          const { conditionFulfilled, event } = result

          if (!event?.id || !conditionFulfilled) {
            console.log('No event id or condition failed')
            return
          }
          emailsWithConditions += 1

          const amount = getEuroAmount(email.snippet)

          paymentsAddedForUser.push({
            eventId: event.id,
            amount,
            paymentDate: new Date(Number(email.internalDate)),
            gmailMailId: email.id,
            userId: user.id,
            name: user.name,
          })
        })
      })

    try {
      await Promise.all(
        paymentsAddedForUser.map((payment) =>
          prisma.payment.create({
            data: {
              ...omit(payment, 'name'),
            },
          }),
        ),
      )
    } catch (error) {
      console.log(error)
    }
    //TODO: Delete all events older than a week

    return `
  Email amount: ${emailAmount}
  Emails found already in DB: ${
    emailsAlreadyInDB.length
  } ${emailsAlreadyInDB.map((mail) => mail.gmailMailId)}
  Amount of emails that fulfill conditions and are not in DB yet: ${emailsWithConditions}
  Users with payments: ${
    paymentsAddedForUser.length
  } ${paymentsAddedForUser.map((user) => user.name)}`
  })
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

  if (!token) throw new Error('No token found')

  const { access_token, expiry_date, refresh_token } = token

  try {
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

    if (!result) {
      console.log('No Paypal data')
      return
    }

    return result
  } catch (error) {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent',
      redirect_uri: process.env.NEXT_PUBLIC_BASE_URL + '/oauth2callback',
    })
    await sendNewRefreshTokenMail({
      link: authorizeUrl,
      email: ownerEmail,
      name: ownerName,
    })
    console.log(error)
    return 'Token has expired'
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

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> => {
  keys.forEach((key) => delete obj[key])
  return obj
}
