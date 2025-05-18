import { getProvider } from '@/src/server/auth/providers'
import type { ProviderType } from '@/src/server/auth/providers/types'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { buttonVariants } from '@/ui/button'
import { redirect } from 'next/navigation'
import { GoToRecentGroup } from './GoToRecentGroup'

interface PageProps {
	searchParams: Promise<
		unknown & {
			state: string
		}
	>
}

const OAuthCallbackPage = async ({ searchParams }: PageProps) => {
	const session = await serverAuth()
	if (!session?.user?.id) {
		return redirect(routes.signIn())
	}

	const resolvedSearchParams = await searchParams

	const parsedState = JSON.parse(resolvedSearchParams.state)

	const { code, state } = routes.oauth2callback.$parseSearchParams({
		...resolvedSearchParams,
		state: parsedState,
	})

	if (!code || !state) {
		throw new Error('Missing code or state parameter')
	}

	const { providerScope: tokenType, provider } = state

	if (!tokenType || !provider) {
		throw new Error('Missing provider or scope in state')
	}

	const authProvider = getProvider(provider as ProviderType)
	const tokens = await authProvider.getToken(code, tokenType)
	const { expiry_date, access_token, refresh_token } = tokens

	if (!expiry_date || !refresh_token || !access_token) {
		throw new Error('Missing required token information')
	}

	// Update any existing tokens for this user and scope
	await prisma.tokens.deleteMany({
		where: {
			ownerId: session.user.id,
			type: tokenType,
			provider,
		},
	})

	// Create new token
	await prisma.tokens.create({
		data: {
			expiry_date: new Date(expiry_date),
			access_token,
			refresh_token,
			ownerId: session.user.id,
			type: tokenType,
			provider,
		},
	})

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center space-y-4'>
				<h1 className='text-2xl font-bold'>Erfolgreich verbunden!</h1>
				<p>
					Du kannst dieses Fenster jetzt schließen und zur Hauptseite
					zurückkehren.
				</p>
				<OrganizerLink
					href={routes.home()}
					className={buttonVariants({ variant: 'outline' })}
				>
					Zurück zum Dashboard
				</OrganizerLink>
				<GoToRecentGroup />
			</div>
		</div>
	)
}

export default OAuthCallbackPage
