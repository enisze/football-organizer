// import { createTRPCStoreLimiter } from '@trpc-limiter/memory'
// import { initTRPC, TRPCError } from '@trpc/server'

// type IContext = {
//   req: Request // your request type
// }

// export const root = initTRPC.context<IContext>().create()

// const limiter = createTRPCStoreLimiter({
//   root,
//   fingerprint: (ctx, _input) =>
//     ctx.req.headers.get('x-forwarded-for') ?? '127.0.0.1', // return the ip from the request
//   windowMs: 20000,
//   // hitInfo is inferred from the return type of `isBlocked`, its a number in this case
//   message: (hitInfo) => `Too many requests, please try again later. ${hitInfo}`,
//   max: 1,
//   onLimit: (hitInfo, _ctx, fingerprint) => {
//     console.log(hitInfo, fingerprint)
//     throw new TRPCError({
//       code: 'INTERNAL_SERVER_ERROR',
//       message: 'Too many requests unique',
//     })
//   },
// })
