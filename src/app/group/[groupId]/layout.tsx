import { FloatingDock } from '@/src/components/ui/floating-dock'
import { serverAuth } from '@/src/server/auth/session'
import { routes } from '@/src/shared/navigation'
import { getNavigationItems } from '@/src/shared/navigationItems'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { HelpSideEffect } from '../../settings/HelpSideEffect'
import { LastUsedGroupSideEffect } from '../LastUsedGroupAtom'

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

	const parsedParams = routes.groupDetails.$parseParams(resolvedParams)

	const navigationItems = getNavigationItems({
		groupId: parsedParams.groupId,
		duration: '90min',
		date: new Date().toISOString(),
		minUsers: 8,
		maxUsers: 10,
	})

	return (
		<div className='flex flex-col pb-2'>
			<div className='flex-1'>
				<HelpSideEffect />
				<LastUsedGroupSideEffect groupId={parsedParams.groupId} />
				{children}

				<Suspense>
					<FloatingDock items={navigationItems} />
				</Suspense>
			</div>
		</div>
	)
}
