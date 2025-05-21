import { FloatingDock } from '@/src/components/ui/floating-dock'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { getNavigationItems } from '@/src/shared/navigationItems'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { HelpSideEffect } from '../../settings/HelpSideEffect'
import { LastUsedGroupSideEffect } from '../LastUsedGroupAtom'
import { AIChat } from './groupAvailability/_components/AiSlotFinder'

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

	const latestEvent = await prisma.event.findFirst({
		where: {
			groupId: parsedParams.groupId,
		},
		include: {
			participants: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	const groupMembers = await prisma.userOnGroups.findMany({
		where: {
			groupId: parsedParams.groupId,
		},
	})

	const navigationItems = getNavigationItems({
		groupId: parsedParams.groupId,
		duration: '90min',
		date: new Date().toISOString(),
		minUsers: latestEvent?.participants.length ?? 1,
		maxUsers: latestEvent?.maxParticipants ?? groupMembers.length ?? 10,
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

				<Suspense>
					<AIChat groupId={parsedParams.groupId} />
				</Suspense>
			</div>
		</div>
	)
}
