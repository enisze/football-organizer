import Redis, { type Redis as RedisClient } from 'ioredis'

const globals = globalThis as unknown as {
  redis: RedisClient
}
export const redis =
  globals.redis ??
  new Redis({
    host: process.env.REDIS_HOST,
    port: 16734,
    password: process.env.REDIS_PASSWORD,
  })
