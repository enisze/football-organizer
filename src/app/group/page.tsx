import { GroupNavigator } from '@/src/components/Groups/GroupNavigator'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { CalendarIcon, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LastUsedGroupBadge } from './LastUsedGroupBadge'

const MainPage = async () => {
	const session = await serverAuth()

	if (!session?.user) {
		redirect(routes.signIn())
	}

	const groups = await prisma.group.findMany({
		where: { users: { some: { id: session?.user?.id } } },
		select: {
			name: true,
			id: true,
			createdAt: true,
			events: true,
			pricingModel: true,
			users: true,
		},
		orderBy: {
			events: {
				_count: 'desc',
			},
		},
	})

	if (groups.length === 1) {
		redirect(routes.groupEvents({ groupId: groups?.at(0)?.id ?? '' }))
	}

	return (
		<div className='container mx-auto p-8 space-y-2'>
			<div className='grid gap-2'>
				{groups.length > 0 && (
					<>
						<div className='flex items-center justify-between'>
							<h1 className='text-2xl font-bold text-white'>Meine Gruppen</h1>
							<Link
								href={routes.groupSettings()}
								className='p-2 text-white/70 hover:text-white transition-colors'
							>
								<Settings className='h-5 w-5' />
							</Link>
						</div>
						{groups.map((group) => (
							<Link
								key={group.id}
								href={routes.groupEvents({ groupId: group.id })}
							>
								<Card className='bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all relative'>
									<LastUsedGroupBadge groupId={group.id} />
									<CardHeader className='p-2 py-1'>
										<CardTitle className='text-lg text-white'>
											{group.name}
										</CardTitle>
										<CardDescription className='text-white/70 flex justify-between w-full'>
											<div>
												Zuletzt aktiv:{' '}
												{group.events[group.events.length - 1]?.date
													? new Date(
															group.events[group.events.length - 1]?.date ?? '',
														).toLocaleDateString('de-DE')
													: 'Noch keine Events'}
											</div>
											<Link
												href={routes.settings({ groupId: group.id })}
												className='p-1 text-white/70 hover:text-white transition-colors'
											>
												<Settings className='h-4 w-4' />
											</Link>
										</CardDescription>
									</CardHeader>
									<CardContent className='p-2'>
										<div className='grid grid-cols-1 gap-2'>
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
												<CalendarIcon className='h-4 w-4 text-emerald-400 flex-none' />
												<div className='text-sm flex gap-2'>
													<p className='text-white/70'>Events</p>
													<p className='text-white font-medium'>
														{group.events.length}
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</>
				)}

				{groups.length === 0 && (
					<>
						<div className='flex items-center justify-between'>
							<h1 className='text-2xl font-bold text-white'>
								Gruppe erstellen
							</h1>
							<Link
								href={routes.groupSettings()}
								className='p-2 text-white/70 hover:text-white transition-colors'
							>
								<Settings className='h-5 w-5' />
							</Link>
						</div>
						<GroupNavigator />
					</>
				)}
			</div>
		</div>
	)
}

export default MainPage
