import { getServerComponentAuthSession } from "@/src/server/auth/authOptions"
import { createSafeActionClient } from "next-safe-action"

export const actionClient = createSafeActionClient()

export const authedActionClient = actionClient.use(async ({ next }) => {
	const session = await getServerComponentAuthSession()

	if (!session?.user?.id) {
		throw new Error("Unauthorized")
	}

	return next({ ctx: { userId: session.user.id } })
})
