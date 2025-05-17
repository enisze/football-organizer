import type { TokenType } from '@prisma/client'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import type { AuthProviderFunctions, AuthToken } from './types'

const client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GOOGLE_REDIRECT_URIS,
})

const SCOPES = {
	calendar: ['https://www.googleapis.com/auth/calendar.readonly'],
	email: ['https://www.googleapis.com/auth/gmail.readonly'],
}

const getAuthUrl = async (type: TokenType): Promise<string> => {
	const state = JSON.stringify({
		providerScope: type,
		provider: 'google',
	})

	return client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES[type],
		prompt: 'consent',
		state,
		redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
	})
}

const refreshToken = async (refresh_token: string): Promise<AuthToken> => {
	client.setCredentials({ refresh_token })
	const { credentials } = await client.refreshAccessToken()

	if (!credentials.access_token || !credentials.expiry_date) {
		throw new Error('Invalid credentials')
	}

	return {
		access_token: credentials.access_token,
		refresh_token: credentials.refresh_token || refresh_token,
		expiry_date: new Date(credentials.expiry_date),
	}
}

const getToken = async (code: string): Promise<AuthToken> => {
	const { tokens } = await client.getToken(code)
	if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
		throw new Error('Invalid tokens')
	}

	return {
		access_token: tokens.access_token,
		refresh_token: tokens.refresh_token,
		expiry_date: new Date(tokens.expiry_date),
	}
}

const getCalendarEvents = async (
	token: AuthToken,
	timeMin: string,
	timeMax: string,
) => {
	client.setCredentials({
		access_token: token.access_token,
		refresh_token: token.refresh_token,
		expiry_date: token.expiry_date.getTime(),
	})

	const calendar = google.calendar({ version: 'v3', auth: client })
	const response = await calendar.events.list({
		calendarId: 'primary',
		timeMin,
		timeMax,
		singleEvents: true,
		orderBy: 'startTime',
	})

	return response.data.items || []
}

const getEmails = async (token: AuthToken, query?: string) => {
	client.setCredentials({
		access_token: token.access_token,
		refresh_token: token.refresh_token,
		expiry_date: token.expiry_date.getTime(),
	})

	const gmail = google.gmail({ version: 'v1', auth: client })
	const response = await gmail.users.messages.list({
		userId: 'me',
		q: query,
	})

	return response.data.messages || []
}

export const googleProvider: AuthProviderFunctions = {
	getAuthUrl,
	refreshToken,
	getToken,
	getCalendarEvents,
	getEmails,
}
