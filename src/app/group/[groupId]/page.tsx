import { FloatingDock } from '@/src/components/ui/floating-dock'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { IconCalendar, IconUserCircle, IconUsers } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import CurrentEventsPage from './CurrentEventsPage'
import GroupAvailabilityPage from './GroupAvailabilityPage'
import MyAvailabilityPage from './MyAvailabilityPage'

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
			title: 'Aktuelle Events',
			icon: <IconCalendar className="h-full w-full" />,
			href: routes.groupDetails({ groupId, search: { tab: 'events' } }),
		},
		{
			title: 'Meine Verfügbarkeit',
			icon: <IconUserCircle className="h-full w-full" />,
			href: routes.groupDetails({
				groupId,
				search: { tab: 'myAvailability', selectedDate },
			}),
		},
		{
			title: 'Gruppenverfügbarkeit',
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
		<div className="flex min-h-screen flex-col pb-2">
			<div className="flex-1">
				{tab === 'events' && <CurrentEventsPage groupId={groupId} />}

				{tab === 'myAvailability' && (
					<MyAvailabilityPage groupId={groupId} date={selectedDate} />
				)}

				{tab === 'groupAvailability' && (
					<GroupAvailabilityPage
						groupId={groupId}
						date={date}
						minUsers={minUsers}
						duration={duration}
					/>
				)}
			</div>

			<div className="fixed bottom-4 left-1/2 -translate-x-1/2">
				<FloatingDock
					items={navigationItems}
					desktopClassName="shadow-lg"
					mobileClassName="shadow-lg"
				/>
			</div>
		</div>
	)
}
