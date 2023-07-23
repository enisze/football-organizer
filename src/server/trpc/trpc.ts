import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { createTRPCStoreLimiter } from '@trpc-limiter/memory'
import { type Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed)

const limiter = createTRPCStoreLimiter({
  root: t,
  fingerprint: (ctx) =>
    (ctx.req.headers['x-forwarded-for'] as string) ?? '127.0.0.1', // return the ip from the request
  windowMs: 20000,
  // hitInfo is inferred from the return type of `isBlocked`, its a number in this case
  message: (hitInfo) => `Too many requests, please try again later. ${hitInfo}`,
  max: 1,
  onLimit: () => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Too many requests unique',
    })
  },
})

export const rateLimitedProcedure = t.procedure.use(limiter)
