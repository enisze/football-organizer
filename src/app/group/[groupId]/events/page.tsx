import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { CurrentEventsPage } from './CurrentEventsPage'

interface PageProps {
	params: Promise<unknown>
}

export default async function EventsPage({ params }: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params

	const { groupId } = routes.groupEvents.$parseParams(resolvedParams)

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

	const isOwner = await isOwnerOfGroup(groupId)

	return (
		<>
			<Suspense>
				<CurrentEventsPage
					groupId={groupId}
					isOwner={isOwner}
					userId={session.user.id}
				/>
			</Suspense>
		</>
	)
}
