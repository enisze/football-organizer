import type { OAuth2ClientOptions } from 'google-auth-library'
import { OAuth2Client } from 'google-auth-library'

const credentials: OAuth2ClientOptions = {
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	redirectUri: process.env.GMAIL_REDIRECT_URIS
}

export const oAuth2Client = new OAuth2Client(credentials)

export const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
