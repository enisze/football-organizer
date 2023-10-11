import { createClient } from 'redis'

export const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: 16734,
  },
  password: process.env.REDIS_PASSWORD,
})
