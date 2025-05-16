export type AuthToken = {
	access_token: string
	refresh_token?: string
	expiry_date: Date
}

export type ProviderType = 'google' | 'microsoft'
export type AuthType = 'calendar' | 'email'

export type AuthProviderFunctions = {
	getAuthUrl: (type: AuthType) => Promise<string>
	refreshToken: (refresh_token: string) => Promise<AuthToken>
	getToken: (code: string) => Promise<AuthToken>
	getCalendarEvents: (
		token: AuthToken,
		timeMin: string,
		timeMax: string,
	) => Promise<unknown[]>
	getEmails: (token: AuthToken, query?: string) => Promise<unknown[]>
}
