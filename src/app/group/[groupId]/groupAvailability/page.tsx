import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { GroupAvailabilityMonthly } from '../availability/components/GroupAvailabilityMonthly'
import { GroupAvailabilityPage } from '../availability/components/GroupAvailabilityPage'
import { GroupLoading } from './GroupLoading'

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
		? new Date(parsedSearchParams.date)
		: new Date()

	return (
		<div className='flex flex-col pb-2'>
			<div className='container p-0 mx-auto space-y-2 pt-2 pb-16 px-4'>
				<h2 className='text-lg font-bold'>Gruppenslots</h2>
				<div className='grid gap-2'>
					<Suspense fallback={<GroupLoading />}>
						<GroupAvailabilityMonthly
							groupId={groupId}
							month={parsedSearchParams?.month}
						/>
					</Suspense>

					<Suspense fallback={<GroupLoading />}>
						<GroupAvailabilityPage
							groupId={groupId}
							duration={parsedSearchParams?.duration}
							minUsers={parsedMinUsers}
							date={parsedDate}
							startTime={parsedSearchParams?.startTime}
							endTime={parsedSearchParams?.endTime}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	)
}
