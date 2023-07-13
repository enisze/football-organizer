'use client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../server/trpc/router/_app'

import type { inferRouterMeta } from '@trpc/server'

export const trpc = createTRPCReact<AppRouter>()

/**
 * Inference helpers
 * @example type HelloOutput = RouterTypes['example']['hello']['output']
 **/
export type RouterTypes = inferRouterMeta<AppRouter>
