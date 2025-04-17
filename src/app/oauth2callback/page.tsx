import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { oAuth2Client } from '@/src/server/gmail'
import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'

interface PageProps {
	searchParams: Promise<unknown>
}

const OAuthCallbackPage = async ({ searchParams }: PageProps) => {
	const session = await serverAuth()
	const resolvedSearchParams = await searchParams
	const { code } =
		routes.oauth2callback.$parseSearchParams(resolvedSearchParams)

	const { tokens } = await oAuth2Client.getToken(code)
	const { expiry_date, access_token, refresh_token } = tokens

	if (!expiry_date || !refresh_token || !access_token || !session?.user?.id)
		throw new Error('INTERNAL_SERVER_ERROR' + 'Access revoked')

	await prisma.tokens.deleteMany({ where: { ownerId: session.user.id } })

	await prisma.tokens.create({
		data: {
			expiry_date: new Date(expiry_date),
			access_token,
			refresh_token,
			ownerId: session.user.id,
		},
	})

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">
				Das Token wurde erfolgreich gesetzt!
			</h1>
			<OrganizerLink href={routes.home()} className="justify-center">
				Zurück zur Startseite
			</OrganizerLink>
		</div>
	)
}

export default OAuthCallbackPage
