'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { SCOPES, oAuth2Client } from '@/src/server/google'
import {
	addDays,
	addMonths,
	addYears,
	format,
	isAfter,
	isBefore,
	parse,
} from 'date-fns'
import { de } from 'date-fns/locale'
import { google } from 'googleapis'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import type { PreviewTimeSlot } from './types'
import { getUTCDate } from './utils/getUTCDate'

export type CalendarPreviewResult = {
	slots: PreviewTimeSlot[]
}

export const previewCalendarDataAction = authedActionClient
	.schema(
		z.object({
			timeRange: z.enum(['week', 'month', 'halfYear', 'year']),
			eventType: z.enum(['all', 'fullday', 'timed']).optional(),
		}),
	)
	.action(
		async ({
			parsedInput,
			ctx: { userId },
		}): Promise<CalendarPreviewResult> => {
			const { timeRange, eventType = 'all' } = parsedInput

			// Get all day-specific slots for the user first
			const daySpecificSlots = await prisma.timeSlot.findMany({
				where: {
					userId,
					type: 'DAY_SPECIFIC',
				},
			})

			const token = await prisma.tokens.findFirst({
				where: {
					ownerId: userId,
					type: 'calendar',
				},
			})

			if (!token || !token.refresh_token) {
				const authUrl = oAuth2Client.generateAuthUrl({
					access_type: 'offline',
					scope: SCOPES.calendar,
					prompt: 'consent',
					redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback?scope=calendar`,
				})
				throw new Error(`AUTH_REQUIRED:${authUrl}`)
			}

			// Try to refresh the token first
			try {
				oAuth2Client.setCredentials({
					refresh_token: token.refresh_token,
				})
				
				const { credentials } = await oAuth2Client.refreshAccessToken()
				
				// Update the tokens in the database
				await prisma.tokens.update({
					where: {
						id: token.id,
					},
					data: {
						access_token: credentials.access_token ?? '',
						refresh_token: credentials.refresh_token ?? token.refresh_token,
						expiry_date: credentials.expiry_date ? new Date(credentials.expiry_date) : undefined,
					},
				})

				// Set up OAuth2 client with new credentials
				oAuth2Client.setCredentials({
					access_token: credentials.access_token,
					expiry_date: credentials.expiry_date,
					refresh_token: credentials.refresh_token ?? token.refresh_token,
				})
			} catch (error) {
				throw new Error('Du musst deinen Kalender neu verbinden.')
			}

			try {
				// Calculate time range
				const now = new Date()
				const timeMin = now.toISOString()
				const timeMax = (() => {
					switch (timeRange) {
						case 'week':
							return addDays(now, 7)
						case 'month':
							return addMonths(now, 1)
						case 'halfYear':
							return addMonths(now, 6)
						case 'year':
							return addYears(now, 1)
					}
				})()

				// Get calendar events
				const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
				const response = await calendar.events.list({
					calendarId: 'primary',
					timeMin,
					timeMax: timeMax.toISOString(),
					singleEvents: true,
					orderBy: 'startTime',
				})

				const events = response.data.items || []
				const previewSlots: PreviewTimeSlot[] = []

				// Process each event
				for (const event of events) {
					if (!event.start || !event.end) continue

					const isAllDay = !event.start.dateTime && !event.end.dateTime

					// Skip events based on eventType filter
					if (eventType === 'fullday' && !isAllDay) continue
					if (eventType === 'timed' && isAllDay) continue

					const startDate = new Date(
						event.start.dateTime || event.start.date || '',
					)
					const endDate = new Date(event.end.dateTime || event.end.date || '')

					// Find matching day-specific slot for this event's day
					const dayOfWeek = startDate.getDay()
					const matchingDaySlot = daySpecificSlots.find(
						(slot) => slot.day === dayOfWeek,
					)

					// For time-specific events, check if they fall within the day slot's time range
					if (!isAllDay) {
						// If there's no day slot for this day, skip the event
						if (!matchingDaySlot) continue
						const eventStartTime = format(startDate, 'HH:mm', { locale: de })
						const eventEndTime = format(endDate, 'HH:mm', { locale: de })
						const eventStartDate = parse(eventStartTime, 'HH:mm', new Date())
						const eventEndDate = parse(eventEndTime, 'HH:mm', new Date())
						const slotStartDate = parse(
							matchingDaySlot.startTime,
							'HH:mm',
							new Date(),
						)
						const slotEndDate = parse(
							matchingDaySlot.endTime,
							'HH:mm',
							new Date(),
						)

						// Skip if event is outside of the day slot's time range
						if (
							isBefore(eventEndDate, slotStartDate) ||
							isAfter(eventStartDate, slotEndDate)
						) {
							continue
						}

						previewSlots.push({
							id: event.id || Math.random().toString(),
							startTime: eventStartTime,
							endTime: eventEndTime,
							date: startDate,
							isAllDay: false,
							summary: event.summary || undefined,
							selected: true,
						})
					} else {
						// For all-day events, we still include them if there's a day slot
						previewSlots.push({
							id: event.id || Math.random().toString(),
							startTime: '00:00',
							endTime: '23:59',
							date: startDate,
							isAllDay: true,
							summary: event.summary || undefined,
							selected: true,
						})
					}
				}

				return { slots: previewSlots }
			} catch (error) {
				if (error instanceof Error && error.message === 'invalid_grant') {
					// Token expired, need to re-authenticate
					const authUrl = oAuth2Client.generateAuthUrl({
						access_type: 'offline',
						scope: SCOPES.calendar,
						prompt: 'consent',
						redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
					})
					throw new Error(`AUTH_REQUIRED:${authUrl}`)
				}
				throw error
			}
		},
	)

export const applyCalendarSlotsAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			slots: z.array(
				z.object({
					startTime: z.string(),
					endTime: z.string(),
					date: z.date(),
					isAllDay: z.boolean(),
				}),
			),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { groupId, slots } = parsedInput

		for (const slot of slots) {
			if (slot.isAllDay) {
				// Create an exception for all-day events
				await prisma.timeSlot.create({
					data: {
						startTime: slot.startTime,
						endTime: slot.endTime,
						type: 'DATE_SPECIFIC',
						date: slot.date,
						userId,
						isException: true,
						groups: {
							connect: { id: groupId },
						},
					},
				})
			} else {
				// For time-specific events
				// First check for day-specific slot on this day
				const daySlot = await prisma.timeSlot.findFirst({
					where: {
						userId,
						type: 'DAY_SPECIFIC',
						day: slot.date.getDay(),
						groups: {
							some: { id: groupId },
						},
					},
				})

				if (daySlot) {
					console.log('Day slot found:', daySlot)

					// Convert all times to Date objects for comparison
					const eventStart = parse(slot.startTime, 'HH:mm', new Date())
					const eventEnd = parse(slot.endTime, 'HH:mm', new Date())
					const daySlotStart = parse(daySlot.startTime, 'HH:mm', new Date())
					const daySlotEnd = parse(daySlot.endTime, 'HH:mm', new Date())

					// Check if event overlaps with day slot
					if (
						!isBefore(eventEnd, daySlotStart) &&
						!isAfter(eventStart, daySlotEnd)
					) {
						if (isAfter(eventStart, daySlotStart)) {
							await prisma.timeSlot.create({
								data: {
									startTime: daySlot.startTime,
									endTime: slot.startTime,
									type: 'DATE_SPECIFIC',
									date: getUTCDate(slot.date),
									userId,
									isException: false,
									groups: { connect: { id: groupId } },
								},
							})
						}

						// If event ends before day slot end, create an "after" slot
						if (isBefore(eventEnd, daySlotEnd)) {
							await prisma.timeSlot.create({
								data: {
									startTime: slot.endTime,
									endTime: daySlot.endTime,
									type: 'DATE_SPECIFIC',
									date: getUTCDate(slot.date),
									userId,
									isException: false,
									groups: { connect: { id: groupId } },
								},
							})
						}
					}
				}
			}
		}

		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')
	})
