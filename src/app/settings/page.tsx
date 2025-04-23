import { FloatingDock } from '@/src/components/ui/floating-dock'
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
import { ThemeToggleArea } from '@/ui/theme-toggle'
import { IconCalendar, IconUserCircle, IconUsers } from '@tabler/icons-react'
import { Settings, User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { HelpButton } from './HelpButton'
import { SignOutButton } from './SignOutButton'

interface PageProps {
	searchParams: Promise<unknown>
}

export default async function MainPage({ searchParams }: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())
	const resolvedSearchParams = await searchParams
	const res = routes.settings.$parseSearchParams(resolvedSearchParams ?? {})

	const groupId = res?.groupId

	const userId = session?.user?.id

	if (!userId || !groupId) {
		return null
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
	})

	const navigationItems = [
		{
			title: 'Events',
			icon: <IconCalendar className='h-full w-full' />,
			href: routes.groupDetails({ groupId, search: { tab: 'events' } }),
			id: 'events',
		},
		{
			title: 'Zeiten',
			icon: <IconUserCircle className='h-full w-full' />,
			href: routes.groupDetails({
				groupId,
				search: { tab: 'myAvailability' },
			}),
			id: 'myAvailability',
		},
		{
			title: 'Gruppe',
			icon: <IconUsers className='h-full w-full' />,
			href: routes.groupDetails({
				groupId,
				search: {
					tab: 'groupAvailability',
				},
			}),
			id: 'groupAvailability',
		},
		{
			title: 'Einstellungen',
			icon: <Settings className='h-full w-full' />,
			href: routes.settings({
				search: {
					groupId,
				},
			}),
			id: 'settings',
		},
	]

	return (
		<div className='min-h-screen flex flex-col items-center p-4'>
			<div className='w-full space-y-6'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-white'>Einstellungen</h1>
					<HelpButton />
				</div>

				<div className='grid gap-4'>
					<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div className='space-y-1'>
									<CardTitle className='text-lg text-white'>
										Erscheinungsbild
									</CardTitle>
									<CardDescription className='text-white/70'>
										Passe das Erscheinungsbild der App an
									</CardDescription>
								</div>
							</div>
							<ThemeToggleArea />
						</CardHeader>
					</Card>

					<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div className='space-y-1'>
									<CardTitle className='text-lg text-white'>
										Benutzerprofil
									</CardTitle>
									<CardDescription className='text-white/70'>
										{user?.name}
									</CardDescription>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className='grid gap-4'>
								<Link
									href={routes.userSettings()}
									className='flex items-center gap-2 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors'
								>
									<User className='h-4 w-4 text-blue-400 flex-none' />
									<div className='text-sm'>
										<p className='text-white'>Profil bearbeiten</p>
									</div>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>

				<Link href={routes.groupSettings()} className='block w-full'>
					<Card className='bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors'>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div className='space-y-1'>
									<CardTitle className='text-lg text-white'>
										Gruppen verwalten
									</CardTitle>
									<CardDescription className='text-white/70'>
										Verwalte deine Gruppen und Mitgliedschaften
									</CardDescription>
								</div>
							</div>
						</CardHeader>
					</Card>
				</Link>

				<SignOutButton />
			</div>

			<FloatingDock items={navigationItems} />
		</div>
	)
}
