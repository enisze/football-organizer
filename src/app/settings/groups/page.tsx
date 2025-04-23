import { NewGroup } from '@/src/components/Groups/NewGroup'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { SCOPES, oAuth2Client } from '@/src/server/gmail'
import { routes } from '@/src/shared/navigation'
import { OrganizerLink } from '@/ui/OrganizerLink'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Calendar, Settings, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'

const GroupSettings = async () => {
	const session = await serverAuth()
	const userId = session?.user?.id

	if (!userId) {
		return null
	}

	const isAdmin = session?.user?.role === 'ADMIN'

	const groups = await prisma.group.findMany({
		where: {
			ownerId: userId,
		},
		include: { users: true, events: true },
	})

	const link = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
		prompt: 'consent',
		redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2callback`,
	})

	const showNewGroup = (groups?.length ?? 0) < 1 || isAdmin

	return (
		<div className='min-h-screen flex flex-col items-center p-8'>
			<div className='w-full max-w-3xl space-y-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-white'>Meine Gruppen</h1>
				</div>

				<div className='grid gap-4'>
					{(groups?.length ?? 0) > 0 ? (
						groups?.map((group) => (
							<Card
								key={group.id}
								className='bg-white/5 backdrop-blur-sm border-white/10'
							>
								<CardHeader>
									<div className='flex items-center justify-between'>
										<div className='space-y-1'>
											<CardTitle className='text-lg text-white'>
												{group.name}
											</CardTitle>
											<CardDescription className='text-white/70'>
												Erstellt am {group.createdAt.toLocaleDateString('de')}
											</CardDescription>
										</div>
										<Badge
											variant='secondary'
											className='bg-white/10 text-white hover:bg-white/20'
										>
											{group.pricingModel}
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className='grid gap-4'>
										<div className='grid grid-cols-1 gap-4'>
											<div className='flex items-center gap-2 bg-white/5 rounded-lg p-3'>
												<Users className='h-4 w-4 text-blue-400 flex-none' />
												<div className='text-sm flex gap-2'>
													<p className='text-white/70'>Mitglieder</p>
													<p className='text-white font-medium'>
														{group.users.length}
													</p>
												</div>
											</div>
											<div className='flex items-center gap-2 bg-white/5 rounded-lg p-3'>
												<Calendar className='h-4 w-4 text-emerald-400 flex-none' />
												<div className='text-sm flex gap-2'>
													<p className='text-white/70'>Events</p>
													<p className='text-white font-medium'>
														{group.events.length}
													</p>
												</div>
											</div>
										</div>
										<div className='flex w-full'>
											<Link
												href={routes.groupSettingsDetails({
													groupId: group.id,
												})}
												className='w-full'
											>
												<Button
													variant='ghost'
													className='gap-2 text-white w-full hover:bg-white/10'
												>
													<Settings className='h-4 w-4' />
													Bearbeiten
												</Button>
											</Link>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
							<CardContent className='flex items-center justify-center p-8'>
								<p className='text-white/70'>Du hast keine Gruppen</p>
							</CardContent>
						</Card>
					)}
				</div>

				{showNewGroup && (
					<div className='pt-4 border-t border-white/10'>
						<NewGroup />
					</div>
				)}

				<OrganizerLink
					href='/group/enter'
					className='w-full max-w-md px-8 py-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 group'
				>
					<div className='flex items-center gap-4'>
						<div className='p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors'>
							<UserPlus className='w-6 h-6 text-white' />
						</div>
						<span className='text-2xl font-medium text-white'>
							Gruppe beitreten
						</span>
					</div>
				</OrganizerLink>

				<div className='pt-4 border-t border-white/10'>
					<a
						href={link}
						className='text-white/70 hover:text-white transition-colors'
					>
						Gmail Token erneuern
					</a>
				</div>
			</div>
		</div>
	)
}

export default GroupSettings
