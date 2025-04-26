import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import { redirect } from 'next/navigation'
import { HelpSideEffect } from '../../settings/HelpSideEffect'

export default async function Page({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<unknown>
}) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params

	return (
		<div className='flex flex-col pb-2'>
			<div className='flex-1'>
				<HelpSideEffect />
				{children}
			</div>
		</div>
	)
}
