import { FloatingDock } from '@/src/components/ui/floating-dock'
import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { IconCalendar, IconUserCircle, IconUsers } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CurrentEventsPage } from './CurrentEventsPage'
import { GroupAvailabilityPage } from './GroupAvailabilityPage'
import { MyAvailabilityPage } from './MyAvailabilityPage'

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function MainPage({ params, searchParams }: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())
	const resolvedParams = await params
	const resolvedSearchParams = await searchParams
	const { groupId } = routes.groupDetails.$parseParams(resolvedParams)
	const res = routes.groupDetails.$parseSearchParams(resolvedSearchParams ?? {})

	const date = res?.date ? new Date(res.date) : new Date()
	const selectedDate = res?.selectedDate
		? res.selectedDate
		: new Date().toISOString()
	const duration = res?.duration ?? '60min'
	const minUsers = res?.minUsers ?? 0
	const tab = res?.tab ?? 'events'

	const isOwner = await isOwnerOfGroup(groupId)

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

	const navigationItems = [
		{
			title: 'Events',
			icon: <IconCalendar className="h-full w-full" />,
			href: routes.groupDetails({ groupId, search: { tab: 'events' } }),
		},
		{
			title: 'Zeiten',
			icon: <IconUserCircle className="h-full w-full" />,
			href: routes.groupDetails({
				groupId,
				search: { tab: 'myAvailability', selectedDate },
			}),
		},
		{
			title: 'Gruppenzeiten',
			icon: <IconUsers className="h-full w-full" />,
			href: routes.groupDetails({
				groupId,
				search: {
					tab: 'groupAvailability',
					duration,
					minUsers,
					date: date.toISOString(),
				},
			}),
		},
	]

	return (
		<div className="flex flex-col pb-2">
			<div className="flex-1">
				{tab === 'events' && (
					<Suspense fallback={<div>Loading events...</div>}>
						<CurrentEventsPage
							groupId={groupId}
							isOwner={isOwner}
							userId={session.user.id}
						/>
					</Suspense>
				)}

				{tab === 'myAvailability' && (
					<Suspense fallback={<div>Loading your availability...</div>}>
						<MyAvailabilityPage
							groupId={groupId}
							date={selectedDate}
							userId={session.user.id}
						/>
					</Suspense>
				)}

				{tab === 'groupAvailability' && (
					<Suspense fallback={<div>Loading availability...</div>}>
						<GroupAvailabilityPage
							groupId={groupId}
							date={date}
							minUsers={minUsers}
							duration={duration}
						/>
					</Suspense>
				)}
			</div>

			<FloatingDock items={navigationItems} />
		</div>
	)
}
