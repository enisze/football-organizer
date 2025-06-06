import { auth } from '@/src/lib/auth'
import { headers } from 'next/headers'

export async function serverAuth() {
	const headersList = await headers()

	return auth.api.getSession({ headers: headersList })
}

export async function serverSignOut() {
	const headersList = await headers()

	return auth.api.signOut({ headers: headersList })
}
