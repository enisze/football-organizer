import { Events } from '@/inngest/__generated__/types.js'
import { Inngest } from 'inngest'
import { PrismaClient } from '../../../prisma/generated/client/index.js'
import { env } from '../../env/server.mjs'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined

  // eslint-disable-next-line no-var
  var inngest: Inngest<Events> | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // log:
    //   env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

export const innget =
  global.inngest ||
  new Inngest<Events>({
    name: 'Event Wizard',
    eventKey: process.env.INNGEST_EVENT_KEY,
  })

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
