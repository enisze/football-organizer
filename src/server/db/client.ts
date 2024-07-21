import { PrismaClient } from '@prisma/client'
import { EventSchemas, Inngest, InngestMiddleware } from 'inngest'

import { env } from '@/src/env/server.mjs'
import { z } from 'zod'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

const globals = globalThis as unknown as {
	prisma: PrismaClient | undefined
}

export const Event__New = z.object({
	id: z.string()
})

export const Event__Reminder = z.object({
	id: z.string()
})

export const Event__ReminderEmail = z.object({
	user: z.object({
		email: z.string(),
		name: z.string()
	}),
	id: z.string()
})

export const Event__PaymentReminderEmail = z.object({
	user: z.object({
		email: z.string(),
		name: z.string()
	}),
	id: z.string()
})

export const Event__NewEmail = z.object({
	user: z.object({
		email: z.string(),
		name: z.string()
	}),
	id: z.string(),
	days: z.number()
})
const prismaMiddleware = new InngestMiddleware({
	name: 'Prisma Middleware',
	init() {
		const prisma = new PrismaClient()

		return {
			onFunctionRun(ctx) {
				return {
					...ctx,
					transformInput(ctx) {
						return {
							// Anything passed via `ctx` will be merged with the function's arguments
							ctx: {
								...ctx,
								prisma
							}
						}
					}
				}
			}
		}
	}
})

export const inngest = new Inngest({
	name: 'Event-Wizard',
	eventKey: process.env.INNGEST_EVENT_KEY ?? '',
	schemas: new EventSchemas().fromZod({
		'event/newEmail': {
			data: Event__NewEmail
		},
		'event/reminder': {
			data: Event__Reminder
		},
		'event/reminderEmail': {
			data: Event__ReminderEmail
		},
		'event/paymentReminderEmail': {
			data: Event__PaymentReminderEmail
		},
		'event/new': {
			data: Event__New
		}
	}),
	middleware: [prismaMiddleware]
})

export const prisma = globals.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globals.prisma = prisma

if (env.NODE_ENV !== 'production') {
	globals.prisma = prisma
}
