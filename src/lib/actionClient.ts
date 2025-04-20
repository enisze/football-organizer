import { createSafeActionClient } from 'next-safe-action'
import { serverAuth } from '../server/auth/session'

export const actionClient = createSafeActionClient()

export const authedActionClient = actionClient.use(async ({ next }) => {
	const session = await serverAuth()

	if (!session?.user?.id) {
		throw new Error('Unauthorized')
	}

	return next({ ctx: { userId: session.user.id } })
})
