import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { SCOPES, oAuth2Client } from '@/src/server/google'
import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { buttonVariants } from '@/ui/button'
import { TokenType } from '@prisma/client'
import { redirect } from 'next/navigation'

interface PageProps {
	searchParams: Promise<unknown>
}

const OAuthCallbackPage = async ({ searchParams }: PageProps) => {
	const session = await serverAuth()
	if (!session?.user?.id) {
		return redirect(routes.signIn())
	}

	const resolvedSearchParams = await searchParams
	const { code, scope } =
		routes.oauth2callback.$parseSearchParams(resolvedSearchParams)

	if (!code || !scope) {
		throw new Error('Missing code or invalid scope')
	}

	const { tokens } = await oAuth2Client.getToken(code)
	const { expiry_date, access_token, refresh_token } = tokens

	if (!expiry_date || !refresh_token || !access_token) {
		throw new Error('Missing required token information')
	}

	console.log(tokens)

	const tokenType = SCOPES.calendar.includes(scope)
		? TokenType.calendar
		: SCOPES.email.includes(scope)
			? TokenType.email
			: null

	if (!tokenType) {
		throw new Error('Invalid scope type')
	}

	// Update any existing tokens for this user and scope
	await prisma.tokens.deleteMany({
		where: {
			ownerId: session.user.id,
			type: tokenType,
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
					Zurück zur Hauptseite
				</OrganizerLink>
			</div>
		</div>
	)
}

export default OAuthCallbackPage
