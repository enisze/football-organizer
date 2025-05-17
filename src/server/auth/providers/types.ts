import type { TokenType } from '@prisma/client'

export const PROVIDERS = ['google', 'microsoft'] as const
export type ProviderType = (typeof PROVIDERS)[number]

export type AuthToken = {
	access_token: string
	refresh_token?: string
	expiry_date: Date
}

export type AuthProviderFunctions = {
	getAuthUrl: (type: TokenType) => Promise<string>
	refreshToken: (
		refresh_token: string,
		tokenType?: TokenType,
	) => Promise<AuthToken>
	getToken: (code: string, tokenType?: TokenType) => Promise<AuthToken>
	getCalendarEvents: (
		token: AuthToken,
		timeMin: string,
		timeMax: string,
	) => Promise<unknown[]>
	getEmails: (token: AuthToken, query?: string) => Promise<unknown[]>
}
