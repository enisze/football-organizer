import { routes } from '@/src/shared/navigation'
import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import type { auth } from './auth'

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	plugins: [inferAdditionalFields<typeof auth>()],
	redirects: {
		signIn: routes.signIn(),
		signOut: routes.home(),
		error: '/error',
	},
})

export const { useSession, signIn, signOut } = authClient
