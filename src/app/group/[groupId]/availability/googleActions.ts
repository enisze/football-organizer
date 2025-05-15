'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { SCOPES, oAuth2Client } from '@/src/server/google'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const refreshGoogleTokenAction = authedActionClient
	.schema(
		z.object({
			type: z.enum(['calendar', 'email']),
		}),
	)
	.action(async ({ parsedInput, ctx: { userId } }) => {
		const { type } = parsedInput

		const token = await prisma.tokens.findFirst({
			where: {
				ownerId: userId,
				type: type === 'calendar' ? 'calendar' : 'email',
			},
		})

		if (!token?.refresh_token) {
			const link = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: SCOPES[type],
				prompt: 'consent',
				redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
			})

			return { redirect: link }
		}

		oAuth2Client.setCredentials({
			refresh_token: token.refresh_token,
		})

		try {
			const { credentials } = await oAuth2Client.refreshAccessToken()

			// Update the tokens in the database
			await prisma.tokens.update({
				where: {
					id: token.id,
				},
				data: {
					access_token: credentials.access_token ?? '',
					refresh_token: credentials.refresh_token ?? token.refresh_token,
					expiry_date: credentials.expiry_date
						? new Date(credentials.expiry_date)
						: undefined,
				},
			})

			revalidateTag('api-overview')

			return { success: true }
		} catch (error) {
			console.error('Error refreshing token:', error)
			const link = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: SCOPES[type],
				prompt: 'consent',
				redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
			})

			return { redirect: link }
		}
	})
