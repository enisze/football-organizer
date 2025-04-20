import { sendWelcomeMail } from '@/inngest/sendWelcomeMail'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '../server/db/client'

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		},
		discord: {
			clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
		},
	},
	secret: process.env.JWT_SECRET,
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					await sendWelcomeMail(user)
				},
			},
		},
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				fieldName: 'role',
			},
			paypalName: {
				type: 'string',
				fieldName: 'paypalName',
				nullable: true,
			},
		},
	},
})
