import type { ProviderType } from '@prisma/client'
import { googleProvider } from './google-provider'
import { microsoftProvider } from './microsoft-provider'
import type { AuthProviderFunctions } from './types'

export const getProvider = (provider: ProviderType): AuthProviderFunctions => {
	switch (provider) {
		case 'google':
			return googleProvider
		case 'microsoft':
			return microsoftProvider
		default:
			throw new Error(`Unsupported provider: ${provider}`)
	}
}
