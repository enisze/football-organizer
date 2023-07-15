import NextAuth from 'next-auth'
// Prisma adapter for NextAuth, optional and can be removed

import { authOptions } from '@/src/server/auth/authOptions'

export default NextAuth(authOptions)
