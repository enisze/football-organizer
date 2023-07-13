import { appRouter } from '@/src/server/trpc/router/_app'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

// this is the server RPC API handler

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`)
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    //@ts-expect-error TODO: fix this
    createContext: function (
      opts: FetchCreateContextFnOptions,
    ): object | Promise<object> {
      // empty context

      return {}
    },
  })
}

export const GET = handler
export const POST = handler
