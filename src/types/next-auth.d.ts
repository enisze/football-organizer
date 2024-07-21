import type { User as PrismaUser } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

import 'next-auth/jwt'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user?: PrismaUser & DefaultSession['user']
	}

	interface User {
		role: string
		paypalName: string | null
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		role: string
		id: string
		paypalName: string | null
	}
}

//TODO: add Prettify
