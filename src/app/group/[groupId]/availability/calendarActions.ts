'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { getProvider } from '@/src/server/auth/providers'
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
import { getWeekNumber } from './utils/getWeekNumber'
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

				// Process all providers in parallel
				const results = await Promise.all(
					tokens
						.filter((token) => token.refresh_token)
						.map(async (token) => {
							try {
								const provider = getProvider(token.provider)
								const newToken = await provider.refreshToken(
									token.refresh_token,
								)

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

								return {
									success: true as const,
									events: events || [],
									provider: token.provider,
								}
							} catch (error) {
								console.error(
									`Failed to fetch events from ${token.provider}:`,
									error,
								)
								return {
									success: false as const,
									provider: token.provider,
									error: (error as Error).message || 'Unknown error',
								}
							}
						}),
				)

				const allEvents: CalendarEvent[] = []
				const failedProviders: Array<{ provider: string; error: string }> = []

				// Process results
				for (const result of results) {
					if (result.success) {
						allEvents.push(...result.events)
					} else {
						failedProviders.push({
							provider: result.provider,
							error: result.error,
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
				// First get all day-specific slots for this user, day, and group
				const daySlots = await prisma.timeSlot.findMany({
					where: {
						userId,
						type: 'DAY_SPECIFIC',
						day: slot.date.getDay(),
						groups: {
							some: { id: groupId },
						},
					},
				})

				// Find the relevant slot based on week number calculation
				let relevantSlot = null
				for (const daySlot of daySlots) {
					if (daySlot.weekNumber === 1 || daySlot.weekNumber === null) {
						// This is a weekly slot or default slot
						if (!relevantSlot) {
							relevantSlot = daySlot
						}
					} else if (daySlot.weekNumber === 2) {
						// This is a bi-weekly slot, check if it matches current week
						const weekNumber = getWeekNumber(
							slot.date,
							daySlot.biWeeklyStartWeek,
						)
						if (weekNumber === 2) {
							relevantSlot = daySlot
							break // Bi-weekly match takes priority
						}
					}
				}

				if (relevantSlot) {
					console.log('Day slot found:', relevantSlot)

					// Convert all times to Date objects for comparison
					const eventStart = parse(slot.startTime, 'HH:mm', new Date())
					const eventEnd = parse(slot.endTime, 'HH:mm', new Date())
					const daySlotStart = parse(
						relevantSlot.startTime,
						'HH:mm',
						new Date(),
					)
					const daySlotEnd = parse(relevantSlot.endTime, 'HH:mm', new Date())

					// Check if event overlaps with day slot
					if (
						!isBefore(eventEnd, daySlotStart) &&
						!isAfter(eventStart, daySlotEnd)
					) {
						if (isAfter(eventStart, daySlotStart)) {
							await prisma.timeSlot.create({
								data: {
									startTime: relevantSlot.startTime,
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
									endTime: relevantSlot.endTime,
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
