'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { getProvider } from '@/src/server/auth/providers'
import type { ProviderType } from '@/src/server/auth/providers/types'
import { prisma } from '@/src/server/db/client'
import {
	addDays,
	addMonths,
	addYears,
	isAfter,
	isBefore,
	parse,
} from 'date-fns'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import type { PreviewTimeSlot } from './types'
import { getUTCDate } from './utils/getUTCDate'
import {
	type CalendarEvent,
	transformCalendarEvents,
} from './utils/transformCalendarEvents'

export type CalendarPreviewResult = {
	slots: PreviewTimeSlot[]
	partialSuccess?: boolean
	failedProviders?: Array<{ provider: string; error: string }>
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

			const tokens = await prisma.tokens.findMany({
				where: {
					ownerId: userId,
					type: 'calendar',
				},
			})

			if (!tokens.length) {
				throw new Error('No calendar providers connected')
			}

			try {
				const allEvents: CalendarEvent[] = []

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

				// Fetch events from all connected providers
				const failedProviders: Array<{ provider: string; error: string }> = []

				for (const token of tokens) {
					if (!token.refresh_token) continue

					try {
						const provider = getProvider(token.provider as ProviderType)
						const newToken = await provider.refreshToken(token.refresh_token)

						// Update token
						await prisma.tokens.update({
							where: { id: token.id },
							data: {
								access_token: newToken.access_token,
								refresh_token: newToken.refresh_token,
								expiry_date: newToken.expiry_date,
							},
						})

						const events = (await provider.getCalendarEvents(
							newToken,
							timeMin,
							timeMax,
						)) as CalendarEvent[]

						if (events?.length) {
							allEvents.push(...events)
						}
					} catch (error) {
						console.error(
							`Failed to fetch events from ${token.provider}:`,
							error,
						)
						failedProviders.push({
							provider: token.provider,
							error: (error as Error).message || 'Unknown error',
						})
					}
				}

				if (failedProviders.length > 0) {
					console.warn('Some calendar providers failed:', failedProviders)
				}

				// Transform all events into preview slots
				const previewSlots = transformCalendarEvents(
					allEvents,
					daySpecificSlots,
					eventType,
				)

				// Return the result with information about any failures
				return {
					slots: previewSlots,
					...(failedProviders.length > 0
						? {
								partialSuccess: true,
								failedProviders,
							}
						: {}),
				}
			} catch (error) {
				console.error('Calendar preview error:', error)
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
