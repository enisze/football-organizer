import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { verifyJWT } from '@/src/server/verifyJWT'
import { decode } from 'jsonwebtoken'
import { z } from 'zod'

export const addToGroupAction = authedActionClient
	.schema(z.object({ JWT: z.string() }))
	.action(async ({ parsedInput: { JWT }, ctx: { userId } }) => {
		const isValid = verifyJWT(JWT)
		if (!isValid) throw new Error('BAD_REQUEST')

		const res = decode(JWT) as {
			id: string
			groupName: string
			ownerName: string
		}

		await prisma.group.update({
			data: { users: { create: { id: userId } } },
			where: { id: res.id }
		})

		return { success: true }
	})
