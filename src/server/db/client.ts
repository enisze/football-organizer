import { Inngest } from 'inngest'
import { PrismaClient } from '../../../prisma/generated/client/index.js'
import { env } from '../../env/server.mjs'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined

  // eslint-disable-next-line no-var
  var inngest: Inngest | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // log:
    //   env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

export const innget = global.inngest || new Inngest({ name: 'Event Wizard' })

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
