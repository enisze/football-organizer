import { eventRouter } from '@/src/server/trpc/router/event'
import { gmailRouter } from '@/src/server/trpc/router/gmail'
import { groupRouter } from '@/src/server/trpc/router/group'
import { mapRouter } from '@/src/server/trpc/router/map'
import { paymentRouter } from '@/src/server/trpc/router/payment'
import { userRouter } from '@/src/server/trpc/router/user'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

const t = initTRPC.create({
  transformer: superjson,
})

export const appRouter = t.router({
  event: eventRouter,
  gmail: gmailRouter,
  payment: paymentRouter,
  user: userRouter,
  map: mapRouter,
  group: groupRouter,
})

export type AppRouter = typeof appRouter
