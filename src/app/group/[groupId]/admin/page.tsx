import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { UserTimeSlotViewerServer } from './UserTimeSlotViewerServer'

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function AdminPage({ params, searchParams }: PageProps) {
	const session = await serverAuth()

	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params
	const resolvedSearchParams = await searchParams
	const { groupId } = routes.groupAdmin.$parseParams(resolvedParams)
	const parsedSearchParams =
		routes.groupAdmin.$parseSearchParams(resolvedSearchParams)

	// Check if user is admin or owner
	const isOwner = await isOwnerOfGroup(groupId)
	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
			role: { in: ['ADMIN', 'OWNER'] },
		},
	})

	if (!userInGroup || !isOwner) {
		return <div>You don't have permission to view this page</div>
	}

	// Get all users in the group
	const groupUsers = await prisma.userOnGroups.findMany({
		where: { groupId },
		include: {
			user: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
		},
	})

	const selectedUserId = parsedSearchParams?.userId || groupUsers[0]?.user.id

	return (
		<div className='p-6 space-y-6'>
			<h1 className='text-2xl font-bold'>Group Member Availability</h1>
			<Suspense>
				<UserTimeSlotViewerServer
					users={groupUsers.map((u) => u.user)}
					groupId={groupId}
					selectedUserId={selectedUserId ?? ''}
				/>
			</Suspense>
		</div>
	)
}
