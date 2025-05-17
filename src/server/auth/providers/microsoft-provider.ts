import {
	type AuthorizationUrlRequest,
	ConfidentialClientApplication,
	type Configuration,
} from '@azure/msal-node'
import { Client } from '@microsoft/microsoft-graph-client'
import type { AuthProviderFunctions, AuthToken, AuthType } from './types'

// Initialize MSAL application
const msalConfig: Configuration = {
	auth: {
		clientId: process.env.MICROSOFT_CLIENT_ID as string,
		clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
		authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
	},
}

const msalClient = new ConfidentialClientApplication(msalConfig)

const SCOPES = {
	calendar: ['https://graph.microsoft.com/Calendars.Read'] as string[],
	email: ['https://graph.microsoft.com/Mail.Read'] as string[],
	all: [
		'https://graph.microsoft.com/Calendars.Read',
		'https://graph.microsoft.com/Mail.Read',
	] as string[],
}

const getAuthUrl = async (type: AuthType): Promise<string> => {
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

const refreshToken = async (refresh_token: string): Promise<AuthToken> => {
	try {
		const tokenRequest = {
			refreshToken: refresh_token,
			scopes: SCOPES.all,
		}

		const response = await msalClient.acquireTokenByRefreshToken(tokenRequest)
		if (!response?.accessToken || !response?.expiresOn) {
			throw new Error('Failed to refresh token')
		}

		return {
			access_token: response.accessToken,
			refresh_token: response.account?.homeAccountId,
			expiry_date: response.expiresOn,
		}
	} catch (error) {
		console.error('Error refreshing token:', error)
		throw error
	}
}

const getToken = async (
	code: string,
	tokenType?: AuthType,
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

	return {
		access_token: response.accessToken,
		refresh_token: response.account?.homeAccountId,
		expiry_date: response.expiresOn,
	}
}

const getGraphClient = (token: AuthToken) => {
	return Client.init({
		authProvider: (done) => done(null, token.access_token),
	})
}

const getCalendarEvents = async (
	token: AuthToken,
	timeMin: string,
	timeMax: string,
) => {
	const client = getGraphClient(token)

	try {
		const response = await client
			.api('/me/calendar/events')
			.select('subject,start,end,isAllDay')
			.filter(`start/dateTime ge '${timeMin}' and end/dateTime le '${timeMax}'`)
			.orderby('start/dateTime')
			.get()

		return response.value || []
	} catch (error) {
		console.error('Error fetching calendar events:', error)
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
