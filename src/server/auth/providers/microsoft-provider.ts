import {
	type AuthorizationUrlRequest,
	ConfidentialClientApplication,
	type Configuration,
	LogLevel,
} from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'
import type { TokenType } from '@prisma/client'
import { addDays, formatISO } from 'date-fns'
import type { AuthProviderFunctions, AuthToken } from './types'

// Initialize MSAL application
const msalConfig: Configuration = {
	auth: {
		clientId: process.env.MICROSOFT_CLIENT_ID as string,
		clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
		authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel: LogLevel, message: string) {
				console.log(message)
			},
			piiLoggingEnabled: false,
			logLevel: LogLevel.Info,
		},
	},
}

const msalClient = new ConfidentialClientApplication(msalConfig)

const SCOPES = {
	calendar: [
		'Calendars.Read',
		'Calendars.ReadWrite',
		'Calendars.Read.Shared',
		'offline_access',
	] as string[],
	email: ['Mail.Read', 'offline_access'] as string[],
	all: [
		'Calendars.Read',
		'Calendars.ReadWrite',
		'Calendars.Read.Shared',
		'Mail.Read',
		'offline_access',
	] as string[],
}

const getAuthUrl = async (type: TokenType): Promise<string> => {
	const scopes = SCOPES[type]
	// Create a state parameter that includes our additional data
	const state = JSON.stringify({
		providerScope: type,
		provider: 'microsoft',
	})

	const authCodeUrlParameters: AuthorizationUrlRequest = {
		scopes: scopes,
		redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
		responseMode: 'query' as const,
		state,
	}

	return await msalClient.getAuthCodeUrl(authCodeUrlParameters)
}

const refreshToken = async (
	refresh_token: string,
	tokenType?: TokenType,
): Promise<AuthToken> => {
	try {
		const tokenRequest = {
			refreshToken: refresh_token,
			scopes: tokenType ? SCOPES[tokenType] : SCOPES.all,
		}

		const response = await msalClient.acquireTokenByRefreshToken(tokenRequest)
		if (!response?.accessToken || !response?.expiresOn) {
			throw new Error('Failed to refresh token')
		}

		return {
			access_token: response.accessToken,
			refresh_token: refresh_token, // Keep using the same refresh token
			expiry_date: response.expiresOn,
		}
	} catch (error) {
		console.error('Error refreshing token:', error)
		throw error
	}
}

const getToken = async (
	code: string,
	tokenType?: TokenType,
): Promise<AuthToken> => {
	if (!code) {
		throw new Error('Authorization code is required')
	}

	const tokenRequest = {
		code,
		redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
		scopes: tokenType ? SCOPES[tokenType] : SCOPES.all,
	}

	const response = await msalClient.acquireTokenByCode(tokenRequest)

	if (!response?.accessToken || !response?.expiresOn) {
		throw new Error('Failed to acquire token')
	}
	const tokenCache = msalClient.getTokenCache().serialize() // Synchronously serialize token cache
	const parsedCache = JSON.parse(tokenCache)
	const refreshTokenObject = parsedCache.RefreshToken

	const refresh_token = refreshTokenObject
		? //@ts-ignore TODO: Fix at some point
			refreshTokenObject[Object.keys(refreshTokenObject)[0]].secret
		: 'No refresh token found'

	console.log('TOKEN', refresh_token)

	// Raw extract of needed data for debugging
	console.log('Raw token data:', {
		accessToken: 'REDACTED',
		expiresOn: response.expiresOn,
		scope: response.scopes,
		token_type: response.tokenType,
	})

	return {
		access_token: response.accessToken,
		refresh_token,
		expiry_date: response.expiresOn,
	}
}

const getGraphClient = (token: AuthToken) => {
	return Client.init({
		authProvider: (done) => done(null, token.access_token),
		defaultVersion: 'v1.0',
		debugLogging: true,
	})
}

const getCalendarEvents = async (
	token: AuthToken,
	timeMin: string,
	timeMax: string,
) => {
	const startDateTime = timeMin || formatISO(new Date())
	const endDateTime = timeMax || formatISO(addDays(new Date(), 7))

	const client = getGraphClient(token)

	try {
		// First verify the token is working by getting user info
		try {
			const me = await client.api('/me').get()
		} catch (error) {
			console.error('Failed to get user info:', error)
			throw new Error('Token validation failed')
		}

		const response = await client
			.api('/me/calendarView')
			.header('Prefer', 'outlook.timezone="UTC"')
			.header('ConsistencyLevel', 'eventual') // Add this for better reliability
			.query({
				startDateTime,
				endDateTime,
				$top: 100, // Limit results
			})
			.select('subject,start,end,bodyPreview,location,isAllDay')
			.orderby('start/dateTime')
			.get()

		console.log('Calendar events retrieved successfully')
		return response.value || []
	} catch (error) {
		console.error('Error fetching calendar events:', {
			error,
			status: (error as { statusCode?: number })?.statusCode,
			message: (error as Error)?.message,
			response: (error as { body?: unknown })?.body,
		})
		throw error
	}
}

const getEmails = async (token: AuthToken, query?: string) => {
	const client = getGraphClient(token)

	try {
		const response = await client
			.api('/me/messages')
			.select('subject,receivedDateTime,from,body')
			.filter(query ? `contains(subject,'${query}')` : '')
			.orderby('receivedDateTime desc')
			.top(50)
			.get()

		return response.value || []
	} catch (error) {
		console.error('Error fetching emails:', error)
		throw error
	}
}

export const microsoftProvider: AuthProviderFunctions = {
	getAuthUrl,
	refreshToken,
	getToken,
	getCalendarEvents,
	getEmails,
}
