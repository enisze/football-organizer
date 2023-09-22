import { EventSchemas, Inngest } from 'inngest'
import { PrismaClient } from '../../../prisma/generated/client/index.js'

import { env } from '@/src/env/server.mjs'
import Redis, { type Redis as RedisClient } from 'ioredis'
import { z } from 'zod'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
  // eslint-disable-next-line no-var
  var redis: RedisClient
}

const globals = globalThis as unknown as {
  redis: RedisClient
  prisma: PrismaClient | undefined
}

export const Event__New = z.object({
  id: z.string(),
})

export const Event__Reminder = z.object({
  id: z.string(),
})

export const Event__ReminderEmail = z.object({
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
  id: z.string(),
  participantsAmount: z.number(),
})

export const Event__PaymentReminderEmail = z.object({
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
  id: z.string(),
})

export const Event__NewEmail = z.object({
  user: z.object({
    email: z.string(),
    name: z.string(),
  }),
  id: z.string(),
  days: z.number(),
})

export const inngest = new Inngest({
  name: 'Event-Wizard',
  eventKey: process.env.INNGEST_EVENT_KEY ?? '',
  schemas: new EventSchemas().fromZod({
    'event/newEmail': {
      data: Event__NewEmail,
    },
    'event/reminder': {
      data: Event__Reminder,
    },
    'event/reminderEmail': {
      data: Event__ReminderEmail,
    },
    'event/paymentReminderEmail': {
      data: Event__PaymentReminderEmail,
    },
    'event/new': {
      data: Event__New,
    },
  }),
})

export const prisma = globals.prisma ?? new PrismaClient()

export const redis =
  globals.redis ??
  new Redis({
    host: process.env.REDIS_HOST,
    port: 16734,
    password: process.env.REDIS_PASSWORD,
  })

if (process.env.NODE_ENV !== 'production') globals.prisma = prisma

// export const inngest =
//   global.inngest ||
//   new Inngest<Events>({
//     name: 'Event Wizard',
//     eventKey: process.env.INNGEST_EVENT_KEY,
//   })

if (env.NODE_ENV !== 'production') {
  globals.prisma = prisma
}
