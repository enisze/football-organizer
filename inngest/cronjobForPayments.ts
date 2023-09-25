import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'
import { getEuroAmount } from '../src/helpers/getEuroAmount'

import { isDateInCertainRange } from '@/src/helpers/isDateInCertainRange'
import { differenceInDays, subDays } from 'date-fns'
import type { OAuth2ClientOptions } from 'google-auth-library'
import type { Event, Payment } from '../prisma/generated/client'

import { prisma } from '@/src/server/db/client'

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

const runCron = async () => {
  console.log('Starting cron')

  const ownerIds = await prisma.group.findMany({
    select: {
      ownerId: true,
      id: true,
      owner: { select: { email: true, name: true } },
    },
  })

  let emailAmount = 0
  const emailsAlreadyInDB: Payment[] = []
  let emailsWithConditions = 0

  await asyncForEach(ownerIds, async (data) => {
    const result = await getPaypalEmails(
      data.ownerId,
      data.owner.email,
      data.owner.name,
    )

    if (!result?.result) return { message: 'No paypal emails' }

    const events = await prisma.event.findMany({ where: { groupId: data.id } })

    const filteredEvents = events.filter((event) => Boolean(event.bookingDate))

    console.log(
      'filteredEvents',
      filteredEvents.length,
      filteredEvents.map((event) => event.id),
    )

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

        console.log(
          user.name + ' got ' + filteredByUser.length + ' paypalMails',
        )

        emailAmount += filteredByUser.length

        filteredByUser.forEach(async (email) => {
          const mailId = email.id

          if (!mailId) return

          const res = await prisma.payment.findFirst({
            where: { gmailMailId: mailId, userId: user.id },
          })

          if (res) {
            emailsAlreadyInDB.push(res)
            console.log('payment already exists for ' + user.name)
            return
          }

          const result = isInAmountRangeAndEventBookingDate(email, event)

          if (!result || !email.snippet || !email.id) {
            console.log('email data missing')
            return
          }

          if (!event?.id || !result) {
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
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GMAIL_REDIRECT_URIS,
}

const PAYPAL_LABEL = 'Label_3926228921657449356'

const oAuth2Client = new google.auth.OAuth2(credentials)

const getPaypalEmails = async (
  ownerId: string,
  ownerEmail: string,
  ownerName: string,
) => {
  console.log(ownerId)
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

    console.log('filteredResult', filteredResult.length)

    if (!filteredResult) {
      console.log('No Paypal data')
      return
    }

    return { result: filteredResult, success: true }
  } catch (error) {
    console.log('token expired')
    console.log('fetching new token')
    const token = await oAuth2Client.getAccessToken()

    if (token.token) {
      const tokenId = await prisma.tokens.findFirst({
        where: { ownerId },
        select: { id: true },
      })

      if (!tokenId) {
        console.log('No token found')
        return
      }

      console.log('token found')
      await prisma.tokens.update({
        where: { id: tokenId.id },
        data: {
          access_token: token.token,
        },
      })
      console.log('token updated')
    }

    return { ownerEmail, ownerName, error: 'Token has expired' }
  }
}

const AMOUNT_LIST = [4.5, 5, 10, 11]

const isInAmountRangeAndEventBookingDate = (
  paymentMail: gmail_v1.Schema$Message,
  event: Event | undefined,
) => {
  if (!paymentMail.internalDate) return undefined
  if (!paymentMail.snippet) return undefined
  if (!event) return undefined
  if (!event.bookingDate) return undefined

  const amount = getEuroAmount(paymentMail.snippet)
  const paymentDate = new Date(Number(paymentMail.internalDate))

  const dateInRange = isDateInCertainRange(paymentDate, event.bookingDate)

  const amountInRange = AMOUNT_LIST.includes(amount)

  return dateInRange && amountInRange
}

runCron()
