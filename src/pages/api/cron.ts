import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'
import { PrismaClient } from '../../../prisma/generated/client'
import { getEuroAmount } from '../../../src/helpers/getEuroAmount'

import { isDateInCertainRange } from '@/src/helpers/isDateInCertainRange'
import { differenceInDays, subDays } from 'date-fns'
import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event, Payment } from '../../../prisma/generated/client'

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

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result = await runCron()
    response.status(200).json({
      message: 'Cronjob done',
      result,
    })
  } catch (error) {
    response.status(500).json({
      error,
    })
  }
}

const runCron = async () => {
  console.log('Starting cron')

  let emailAmount = 0
  const emailsAlreadyInDB: Payment[] = []
  let emailsWithConditions = 0

  const ownerId = 'clc0sbfrm0000mk089zywcc8e'
  const ownerEmail = 'eniszej@gmail.com'
  const ownerName = 'Enis'

  const result = await getPaypalEmails(ownerId, ownerEmail, ownerName)

  if (!result?.result) return { message: 'No paypal emails' }

  if (result.error) {
    return {
      message: 'New token needed',
    }
  }

  const groupId = 'clfzyt3dp0001mp087tvls8yu'

  const events = await prisma.event.findMany({ where: { groupId } })

  const filteredEvents = events.filter((event) => Boolean(event.bookingDate))

  filteredEvents.forEach(async (event) => {
    const participants = await prisma.participantsOnEvents.findMany({
      where: { eventId: event.id, userEventStatus: 'JOINED' },
    })

    participants.forEach(async (participant) => {
      const user = await prisma.user.findUnique({
        where: { id: participant.id },
      })

      if (!user) return

      //Get all paypal emails from specific user
      const filteredByUser = result.result.filter((res) => {
        if (!res.internalDate) return false

        return res.snippet?.toLowerCase().includes(user.name.toLowerCase())
      }) as gmail_v1.Schema$Message[]

      console.log(user.name + ' got ' + filteredByUser.length + ' paypalMails')

      emailAmount += filteredByUser.length

      filteredByUser.forEach(async (email) => {
        const mailId = email.id

        if (!mailId) return

        const res = await prisma.payment.findFirst({
          where: { gmailMailId: mailId, userId: user.id },
        })

        if (res) {
          emailsAlreadyInDB.push(res)
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

        await prisma.payment.create({
          data: {
            eventId: event.id,
            amount,
            paymentDate: new Date(Number(email.internalDate)),
            gmailMailId: email.id,
            userId: user.id,
          },
        })

        console.log('added for ', user.name)
      })
    })
  })

  return `
    Email amount: ${emailAmount}
    Emails found already in DB: ${
      emailsAlreadyInDB.length
    } ${emailsAlreadyInDB.map((mail) => mail.gmailMailId)}
    Amount of emails that fulfill conditions and are not in DB yet: ${emailsWithConditions}
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
