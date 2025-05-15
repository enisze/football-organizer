'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { SCOPES, oAuth2Client } from '@/src/server/google'
import { google } from 'googleapis'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import type { PreviewTimeSlot } from './types'

export type CalendarPreviewResult = {
	slots: PreviewTimeSlot[]
}

export const previewCalendarDataAction = authedActionClient
	.schema(
		z.object({
			groupId: z.string(),
			timeRange: z.enum(['week', 'month', 'halfYear', 'year']),
			eventType: z.enum(['all', 'fullday', 'timed']).optional(),
		}),
	)
	.action(
		async ({
			parsedInput,
			ctx: { userId },
		}): Promise<CalendarPreviewResult> => {
			const { groupId, timeRange, eventType = 'all' } = parsedInput

			const token = await prisma.tokens.findFirst({
				where: {
					ownerId: userId,
					type: 'calendar',
				},
			})

			if (!token) {
				const authUrl = oAuth2Client.generateAuthUrl({
					access_type: 'offline',
					scope: SCOPES.calendar,
					prompt: 'consent',
					redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback?scope=calendar`,
				})
				throw new Error(`AUTH_REQUIRED:${authUrl}`)
			}

			// Set up OAuth2 client
			oAuth2Client.setCredentials({
				access_token: token.access_token,
				expiry_date: token.expiry_date.getTime(),
				refresh_token: token.refresh_token,
			})

			try {
				// Calculate time range
				const now = new Date()
				const timeMin = now.toISOString()
				const timeMax = new Date()
				switch (timeRange) {
					case 'week':
						timeMax.setDate(now.getDate() + 7)
						break
					case 'month':
						timeMax.setMonth(now.getMonth() + 1)
						break
					case 'halfYear':
						timeMax.setMonth(now.getMonth() + 6)
						break
					case 'year':
						timeMax.setFullYear(now.getFullYear() + 1)
						break
				}

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

					if (isAllDay) {
						previewSlots.push({
							id: event.id || Math.random().toString(),
							startTime: '00:00',
							endTime: '23:59',
							date: startDate,
							isAllDay: true,
							summary: event.summary || undefined,
							selected: true,
						})
					} else {
						const startTime = startDate.toLocaleTimeString('de-DE', {
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						})
						const endTime = endDate.toLocaleTimeString('de-DE', {
							hour: '2-digit',
							minute: '2-digit',
							hour12: false,
						})

						previewSlots.push({
							id: event.id || Math.random().toString(),
							startTime,
							endTime,
							date: startDate,
							isAllDay: false,
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
				// For time-specific events, create a date-specific slot
				// Check if there's a day-specific slot for this day of week
				const existingDaySlot = await prisma.timeSlot.findFirst({
					where: {
						userId,
						type: 'DAY_SPECIFIC',
						day: slot.date.getDay(),
						groups: {
							some: {
								id: groupId,
							},
						},
					},
				})

				// Only create a date-specific slot if the event time is smaller than existing day slot
				if (
					!existingDaySlot ||
					slot.startTime > existingDaySlot.startTime ||
					slot.endTime < existingDaySlot.endTime
				) {
					await prisma.timeSlot.create({
						data: {
							startTime: slot.startTime,
							endTime: slot.endTime,
							type: 'DATE_SPECIFIC',
							date: slot.date,
							userId,
							isException: false,
							groups: {
								connect: { id: groupId },
							},
						},
					})
				}
			}
		}

		revalidateTag('myAvailability')
		revalidateTag('groupAvailability')
	})
