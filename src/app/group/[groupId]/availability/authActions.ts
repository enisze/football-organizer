'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { getProvider } from '@/src/server/auth/providers'
import { prisma } from '@/src/server/db/client'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const refreshAuthTokenAction = authedActionClient
	.schema(
		z.object({
			type: z.enum(['calendar', 'email']),
			provider: z.enum(['google', 'microsoft']),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { type, provider: providerName } = parsedInput
		const provider = getProvider(providerName)

		const token = await prisma.tokens.findFirst({
			where: {
				ownerId: userId,
				type,
				provider: providerName,
			},
		})

		if (!token?.refresh_token) {
			const link = await provider.getAuthUrl(type)
			return { redirect: link }
		}

		try {
			const newToken = await provider.refreshToken(token.refresh_token)

			// Update the tokens in the database
			await prisma.tokens.update({
				where: {
					id: token.id,
				},
				data: {
					access_token: newToken.access_token,
					refresh_token: newToken.refresh_token,
					expiry_date: newToken.expiry_date,
				},
			})

			revalidateTag('api-overview')

			return { success: true }
		} catch (error) {
			console.error('Error refreshing token:', error)
			const link = await provider.getAuthUrl(type)
			return { redirect: link }
		}
	})
