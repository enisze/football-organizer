import { FloatingDock } from '@/src/components/ui/floating-dock'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { getNavigationItems } from '@/src/shared/navigationItems'
import { redirect } from 'next/navigation'
import { GroupAvailabilityPage } from './GroupAvailabilityPage'

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function GroupAvailabilityRoute({
	params,
	searchParams,
}: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params
	const resolvedSearchParams = await searchParams

	const parsedSearchParams =
		routes.groupAvailability.$parseSearchParams(resolvedSearchParams)
	const { groupId } = routes.groupAvailability.$parseParams(resolvedParams)

	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

	const parsedMinUsers = parsedSearchParams?.minUsers
		? parsedSearchParams?.minUsers
		: 8
	const parsedDate = parsedSearchParams?.date
		? new Date(parsedSearchParams?.date)
		: new Date()

	const navigationItems = getNavigationItems({
		groupId,
		duration: parsedSearchParams?.duration,
		minUsers: parsedMinUsers,
		maxUsers: parsedSearchParams?.maxUsers,
		date: parsedDate.toISOString(),
	})

	return (
		<div className='flex flex-col pb-2'>
			<GroupAvailabilityPage
				groupId={groupId}
				duration={parsedSearchParams?.duration}
				minUsers={parsedMinUsers}
				date={parsedDate}
			/>

			<FloatingDock items={navigationItems} />
		</div>
	)
}
