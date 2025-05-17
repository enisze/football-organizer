import { isDateInCertainRange } from '@/src/helpers/isDateInCertainRange'
import { getProvider } from '@/src/server/auth/providers'
import type { AuthToken } from '@/src/server/auth/providers/types'
import { prisma } from '@/src/server/db/client'
import type { Event, Payment } from '@prisma/client'
import { differenceInDays, subDays } from 'date-fns'
import { OAuth2Client } from 'google-auth-library'
import type { gmail_v1 } from 'googleapis'
import { google } from 'googleapis'
import { getEuroAmount } from '../src/helpers/getEuroAmount'

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

		if (!result?.result?.length) return { message: 'No paypal emails' }

		const events = await prisma.event.findMany({
			where: { groupId: data.id, Group: {} },
		})

		const filteredEvents = events.filter((event) => Boolean(event.bookingDate))

		console.log(
			'filteredEvents',
			filteredEvents.length,
			filteredEvents.map((event) => event.id),
		)

		for (const event of filteredEvents) {
			const participants = await prisma.participantsOnEvents.findMany({
				where: { eventId: event.id, userEventStatus: 'JOINED' },
			})

			for (const participant of participants) {
				const user = await prisma.user.findUnique({
					where: { id: participant.id },
				})

				if (!user) return

				//Get all paypal emails from specific user
				const filteredByUser = result.result.filter(
					(res): res is gmail_v1.Schema$Message => {
						if (!res?.internalDate || !res.snippet) return false
						return res.snippet.toLowerCase().includes(user.name.toLowerCase())
					},
				)

				console.log(`${user.name} got ${filteredByUser.length} paypalMails`)

				emailAmount += filteredByUser.length

				for (const email of filteredByUser) {
					if (!email?.id) return

					const res = await prisma.payment.findFirst({
						where: { gmailMailId: email.id, userId: user.id },
					})

					if (res) {
						emailsAlreadyInDB.push(res)
						console.log(`payment already exists for ${user.name}`)
						return
					}

					const result = isInAmountRangeAndEventBookingDate(email, event)

					if (!result || !email.snippet || !email.id || !email.internalDate) {
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

					console.log(`added for ${user.name}`)
				}
			}
		}
	})

	return `
    Email amount: ${emailAmount}
    Emails found already in DB: ${emailsAlreadyInDB.length} ${emailsAlreadyInDB.map((mail) => mail.gmailMailId)}
    Amount of emails that fulfill conditions and are not in DB yet: ${emailsWithConditions}
    `
}

const PAYPAL_LABEL = 'Label_3926228921657449356'

const getPaypalEmails = async (
	ownerId: string,
	ownerEmail: string,
	ownerName: string,
) => {
	console.log(ownerId)
	const token = await prisma.tokens.findFirst({
		where: {
			ownerId,
			provider: 'google',
			type: 'email',
		},
	})

	if (!token) {
		console.log('No token found')
		return
	}

	let currentToken: AuthToken = {
		access_token: token.access_token,
		refresh_token: token.refresh_token || undefined,
		expiry_date: token.expiry_date,
	}

	const googleAuth = getProvider('google')

	try {
		console.log('Getting Gmail emails')

		if (token.refresh_token && new Date() >= token.expiry_date) {
			console.log('Token expired, refreshing...')
			currentToken = await googleAuth.refreshToken(token.refresh_token)

			await prisma.tokens.update({
				where: { id: token.id },
				data: {
					access_token: currentToken.access_token,
					expiry_date: currentToken.expiry_date,
					refresh_token: currentToken.refresh_token,
				},
			})
		}

		const messages = (await googleAuth.getEmails(
			currentToken,
			`label:${PAYPAL_LABEL}`,
		)) as gmail_v1.Schema$Message[]

		if (!messages.length) {
			console.log('No Paypal emails found')
			return
		}

		const oAuth2Client = new OAuth2Client({
			credentials: {
				access_token: currentToken.access_token,
				refresh_token: currentToken.refresh_token,
				expiry_date: currentToken.expiry_date.getTime(),
			},
		})

		const result = await Promise.all(
			messages
				.map(async (message) => {
					if (!message.id) return undefined
					const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
					const res = await gmail.users.messages.get({
						userId: 'me',
						id: message.id,
					})
					return res.data
				})
				.filter(Boolean),
		)

		const filteredResult = result.filter(
			(res): res is gmail_v1.Schema$Message => {
				if (!res?.internalDate) return false
				const date = new Date(Number(res.internalDate))
				const dateNow = new Date()
				const nowLastWeek = subDays(dateNow, 7)
				const dateDiff = differenceInDays(nowLastWeek, date)
				return dateDiff < 0
			},
		)

		console.log('filteredResult', filteredResult.length)

		if (!filteredResult.length) {
			console.log('No Paypal data')
			return
		}

		return { result: filteredResult, success: true }
	} catch (error) {
		console.error('Error getting Paypal emails:', error)
		return { ownerEmail, ownerName, error: 'Failed to get Paypal emails' }
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
