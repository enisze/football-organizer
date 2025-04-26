import { FloatingDock } from '@/src/components/ui/floating-dock'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { getNavigationItems } from '@/src/shared/navigationItems'
import { redirect } from 'next/navigation'
import { HelpSideEffect } from '../../settings/HelpSideEffect'

type LayoutProps = {
	children: React.ReactNode
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function GroupLayout({
	children,
	params,
	searchParams,
}: LayoutProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params
	const resolvedSearchParams = await searchParams

	const parsedSearchParams =
		routes.groupDetails.$parseSearchParams(resolvedSearchParams)
	const { groupId } = routes.groupDetails.$parseParams(resolvedParams)

	// Just check if user belongs to group
	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

	const navigationItems = getNavigationItems({
		groupId,
		...parsedSearchParams,
	})

	return (
		<div className='flex flex-col pb-2'>
			<div className='flex-1'>
				<HelpSideEffect />
				{children}
			</div>
			<FloatingDock items={navigationItems} />
		</div>
	)
}
