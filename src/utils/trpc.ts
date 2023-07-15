'use client'
import { createTRPCReact } from '@trpc/react-query'

import type { inferRouterMeta } from '@trpc/server'
import type { AppRouter } from '../app/api/trpc/trpc-router'

export const trpc = createTRPCReact<AppRouter>()

/**
 * Inference helpers
 * @example type HelloOutput = RouterTypes['example']['hello']['output']
 **/
export type RouterTypes = inferRouterMeta<AppRouter>
