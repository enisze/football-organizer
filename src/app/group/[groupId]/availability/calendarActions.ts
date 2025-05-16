'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { getProvider } from '@/src/server/auth/providers'
import type { ProviderType } from '@/src/server/auth/providers/types'
import { prisma } from '@/src/server/db/client'
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
			provider: z.enum(['google', 'microsoft']),
		}),
	)
	.action(
		async ({
			parsedInput,
			ctx: { userId },
		}): Promise<CalendarPreviewResult> => {
			const {
				timeRange,
				eventType = 'all',
				provider: providerName,
			} = parsedInput

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
					provider: providerName,
				},
			})

			const provider = getProvider(providerName as ProviderType)
			if (!token || !token.refresh_token) {
				const authUrl = await provider.getAuthUrl('calendar')
				throw new Error(`AUTH_REQUIRED:${authUrl}`)
			}

			try {
				// Try to refresh the token first
				const newToken = await provider.refreshToken(token.refresh_token)
				await prisma.tokens.update({
					where: { id: token.id },
					data: {
						access_token: newToken.access_token,
						refresh_token: newToken.refresh_token,
						expiry_date: newToken.expiry_date,
					},
				})

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
				})().toISOString()

				const events = await provider.getCalendarEvents(
					newToken,
					timeMin,
					timeMax,
				)
				const previewSlots: PreviewTimeSlot[] = []

				// Process each event based on the provider's format
				for (const event of events ?? []) {
					const start = event?.start.dateTime || event.start.date
					const end = event.end.dateTime || event.end.date
					const isAllDay = !event.start.dateTime

					if (!start || !end) continue

					// Skip events based on eventType filter
					if (eventType === 'fullday' && !isAllDay) continue
					if (eventType === 'timed' && isAllDay) continue

					const startDate = new Date(start)
					const endDate = new Date(end)

					// Find matching day-specific slot for this event's day
					const dayOfWeek = startDate.getDay()
					const matchingDaySlot = daySpecificSlots.find(
						(slot) => slot.day === dayOfWeek,
					)

					if (!isAllDay) {
						// For time-specific events
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
				console.error('Calendar preview error:', error)
				const authUrl = await provider.getAuthUrl('calendar')
				throw new Error(`AUTH_REQUIRED:${authUrl}`)
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
