import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { UserPlus, Users } from 'lucide-react'
import { GroupSelector } from './GroupSelector'

export const GroupSelectorServer = async () => {
	const session = await serverAuth()

	const id = session?.user?.id

	const groups = await prisma.userOnGroups.findMany({
		where: {
			id,
		},
		include: { group: { select: { name: true } } },
	})

	return (
		<>
			{groups.length > 0 ? (
				<GroupSelector groups={groups} />
			) : (
				<div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4 gap-6">
					<OrganizerLink
						href="/settings/groups"
						className="w-full max-w-md px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
								<Users className="w-6 h-6 text-white" />
							</div>
							<span className="text-2xl font-medium text-white">
								Gruppe erstellen
							</span>
						</div>
					</OrganizerLink>

					<OrganizerLink
						href="/group/enter"
						className="w-full max-w-md px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group"
					>
						<div className="flex items-center gap-4">
							<div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
								<UserPlus className="w-6 h-6 text-white" />
							</div>
							<span className="text-2xl font-medium text-white">
								Gruppe beitreten
							</span>
						</div>
					</OrganizerLink>
				</div>
			)}
		</>
	)
}
