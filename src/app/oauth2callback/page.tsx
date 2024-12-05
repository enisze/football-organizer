import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { oAuth2Client } from '@/src/server/gmail'
import { OrganizerLink } from '@/ui/OrganizerLink'

import { prisma } from '@/src/server/db/client'

export default async function Page({
	searchParams
}: {
	searchParams?: { [key: string]: string | string[] | undefined }
}) {
	const code = searchParams?.code as string

	const session = await getServerComponentAuthSession()

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
			ownerId: session.user.id
		}
	})

	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1 className='text-2xl font-bold'>
				Das Token wurde erfolgreich gesetzt!
			</h1>
			<OrganizerLink href='/' className='justify-center'>
				<span className='text-lg'>Zurück zur Startseite</span>
			</OrganizerLink>
		</div>
	)
}
