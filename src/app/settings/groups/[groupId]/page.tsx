import { Button } from '@/ui/button'
import { Users, X } from 'lucide-react'
import { DeleteGroupForm } from './DeleteGroupForm'

import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import type { Group } from '@prisma/client'
import { sign } from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import { ClipboardButton } from './ClipboardButton'
import { ClipboardCode } from './ClipboardCode'
import { EventDialog } from './EventDialog'
import { NameChange } from './NameChange'
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

	const userName = session?.user?.name

	const token = sign(
		{ id: groupId, groupName, ownerName: userName },
		process.env.JWT_SECRET as string,
	)

	if (!userId || !groupId) {
		redirect('/')
	}

	return (
		<div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center p-8">
			<div className="w-full max-w-3xl space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold text-white">
						Einstellungen für Gruppe {groupName}
					</h1>

					<EventDialog />
				</div>

				<div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-6">
					<div className="space-y-2">
						<NameChange groupName={groupName ?? ''} />
					</div>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="text-white/70">
								Mitglieder {groupData?.users.length}/
								{getPricingInfos(groupData)?.maximalMembers}
							</p>
							<div className="flex gap-2">
								<ClipboardButton token={token} />
								<ClipboardCode code={groupData?.code ?? ''} />
							</div>
						</div>

						<div className="space-y-2">
							{groupData?.users?.map(async (userInGroup, idx) => {
								const user = await prisma.user.findUnique({
									where: { id: userInGroup?.id },
									select: { name: true },
								})

								return (
									<div
										key={idx}
										className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
									>
										<div className="flex items-center gap-3">
											<Users className="w-5 h-5 text-white/70" />
											<span className="text-white">{user?.name}</span>
										</div>
										<div className="flex items-center gap-4">
											<span className="text-sm text-white/50">
												{
													groupData.users.find(
														(groupUser) => groupUser.id === userInGroup?.id,
													)?.role
												}
											</span>
											{userInGroup?.id === groupData.ownerId && (
												<Button
													variant="ghost"
													type="submit"
													className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
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
													<X className="w-4 h-4 text-white/70" />
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
