import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { redirect } from 'next/navigation'
import { MyAvailabilityPage } from './MyAvailabilityPage'

interface PageProps {
	params: Promise<unknown>
	searchParams: Promise<unknown>
}

export default async function AvailabilityPage({
	params,
	searchParams,
}: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params
	const resolvedSearchParams = await searchParams

	const { groupId } = routes.groupMyAvailability.$parseParams(resolvedParams)

	const parsedSearchParams =
		routes.groupMyAvailability.$parseSearchParams(resolvedSearchParams)

	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return <div>Du gehörst nicht zu dieser Gruppe</div>
	}

	return (
		<div className='flex flex-col pb-2'>
			<div className='flex-1'>
				<MyAvailabilityPage
					groupId={groupId}
					userId={session.user.id}
					date={parsedSearchParams?.selectedDate}
				/>
			</div>
		</div>
	)
}
