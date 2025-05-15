import type { TokenType } from '@prisma/client'
import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'
import { prisma } from '../db/client'

const credentials: OAuth2ClientOptions = {
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REDIRECT_URIS,
}

export const oAuth2Client = new OAuth2Client(credentials)

// Define individual scopes for different services
export const SCOPES = {
	calendar: ['https://www.googleapis.com/auth/calendar.readonly'] as string[],
	email: ['https://www.googleapis.com/auth/gmail.readonly'] as string[],
}

// Get Authorize URL with specific scope
export function getAuthUrl(scopeType: TokenType): string {
	return oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES[scopeType],
		prompt: 'consent',
		redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback?scope=${scopeType}`,
	})
}

// Handle token refresh and update database
export async function refreshAccessToken(userId: string, scopeType: TokenType) {
	const token = await prisma.tokens.findFirst({
		where: {
			ownerId: userId,
			type: scopeType,
		},
	})

	if (!token) {
		throw new Error('No token found for user')
	}

	oAuth2Client.setCredentials({
		refresh_token: token.refresh_token,
		access_token: token.access_token,
		expiry_date: token.expiry_date.getTime(),
	})

	try {
		const { credentials } = await oAuth2Client.refreshAccessToken()
		const { access_token, expiry_date } = credentials

		if (!access_token || !expiry_date) {
			throw new Error('Invalid token response')
		}

		// Update token in database
		await prisma.tokens.update({
			where: {
				id: token.id,
			},
			data: {
				access_token,
				expiry_date: new Date(expiry_date),
			},
		})

		return credentials
	} catch (error) {
		console.error('Error refreshing access token:', error)
		throw error
	}
}
