import type { Events } from '@/inngest/__generated__/types.js'
import { Inngest } from 'inngest'
import { PrismaClient } from '../../../prisma/generated/client/index.js'
import { env } from '../../env/server.mjs'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined

  // eslint-disable-next-line no-var
  var inngest: Inngest<Events> | undefined
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const inngest =
  global.inngest ||
  new Inngest<Events>({
    name: 'Event Wizard',
    eventKey: process.env.INNGEST_EVENT_KEY,
  })

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
