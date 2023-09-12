
import { createTRPCRouter } from '@/src/server/trpc/trpc'
import { eventRouter } from './event'
import { gmailRouter } from './gmail'
import { groupRouter } from './group'
import { mapRouter } from './map'
import { paymentRouter } from './payment'
import { userRouter } from './user'

export const appRouter = createTRPCRouter({
  event: eventRouter,
  gmail: gmailRouter,
  payment: paymentRouter,
  user: userRouter,
  map: mapRouter,
  group: groupRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
