import { Button, buttonVariants } from '@/ui/button'
import { ArrowLeft, Users, X } from 'lucide-react'
import { DeleteGroupForm } from './DeleteGroupForm'

import { cn } from '@/lib/utils/cn'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import type { Group } from '@prisma/client'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ClipboardButton } from './ClipboardButton'
import { ClipboardCode } from './ClipboardCode'
import { NameChange } from './NameChange'
import { UpdateInvitationCodeButton } from './UpdateInvitationCodeButton'
import { deleteUserFromGroup } from './actions'

interface PageProps {
	params: Promise<unknown>
}

const GroupSettings = async ({ params }: PageProps) => {
	const resolvedParams = await params
	const { groupId } = routes.groupSettingsDetails.$parseParams(resolvedParams)

	const session = await serverAuth()
	const userId = session?.user?.id

	const groupData = await prisma.group.findFirst({
		where: { id: groupId, ownerId: userId },
		include: { users: true },
	})

	const groupName = groupData?.name

	if (!userId || !groupId) {
		redirect('/')
	}

	return (
		<div className='min-h-screen flex flex-col items-center px-8'>
			<div className='w-full max-w-3xl space-y-6'>
				<Link
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						'self-start mt-4',
					)}
					href={routes.groupSettings()}
				>
					<ArrowLeft className='w-4 h-4 mr-2 flex-none' />
					Gruppenübersicht
				</Link>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-white'>
						Einstellungen für Gruppe {groupName}
					</h1>
				</div>

				<div className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-6'>
					<div className='space-y-2'>
						<NameChange groupName={groupName ?? ''} />
					</div>

					<div className='space-y-4'>
						<h2 className=''>Neue Mitglieder hinzufügen</h2>
						<div className='flex flex-col gap-4'>
							{groupData?.code && (
								<>
									<ClipboardButton code={groupData?.code} />
									<div className='flex items-center gap-4'>
										<ClipboardCode code={groupData.code} />
										<UpdateInvitationCodeButton groupId={groupId} />
									</div>
								</>
							)}
						</div>

						<p className='text-white/70'>
							Mitglieder {groupData?.users.length}/
							{getPricingInfos(groupData)?.maximalMembers}
						</p>

						<div className='space-y-2'>
							{groupData?.users?.map(async (userInGroup, idx) => {
								const user = await prisma.user.findUnique({
									where: { id: userInGroup?.id },
									select: { name: true },
								})

								return (
									<div
										key={idx}
										className='flex items-center justify-between p-3 bg-white/5 rounded-xl'
									>
										<div className='flex items-center gap-3'>
											<Users className='w-5 h-5 text-white/70' />
											<span className='text-white'>{user?.name}</span>
										</div>
										<div className='flex items-center gap-4'>
											<span className='text-sm text-white/50'>
												{
													groupData.users.find(
														(groupUser) => groupUser.id === userInGroup?.id,
													)?.role
												}
											</span>
											{userInGroup?.id === groupData.ownerId && (
												<Button
													variant='ghost'
													type='submit'
													className='p-1.5 hover:bg-white/10 rounded-lg transition-colors'
													formAction={async () => {
														'use server'
														const res = await deleteUserFromGroup({
															groupId,
															userId: userInGroup.id,
														})
														if (res?.data?.groupDeleted) {
															redirect('/settings/groups')
														}
													}}
												>
													<X className='w-4 h-4 text-white/70' />
												</Button>
											)}
										</div>
									</div>
								)
							})}
						</div>
					</div>

					<DeleteGroupForm groupName={groupName ?? ''} groupId={groupId} />
				</div>
			</div>
		</div>
	)
}

export default GroupSettings

const getPricingInfos = (group: Group | null | undefined) => {
	if (!group) return { maximalMembers: 0 }
	switch (group.pricingModel) {
		case 'FREE':
			return { maximalMembers: 15 }
		case 'SUPPORTER':
			return { maximalMembers: 30 }
	}
}
