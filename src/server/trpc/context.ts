import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '@/src/lib/auth'
import { inngest, prisma } from '../db/client'

type CreateContextOptions = {
  session: Session | null
}

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
    inngest,
  }
}

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req } = opts

  // Get the session from the server using the unstable_getServerSession wrapper function
  const session = await getServerSession(authOptions)

  const result = await createContextInner({ session })

  return {
    ...result,
    req,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
