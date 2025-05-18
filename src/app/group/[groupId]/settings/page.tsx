import { ClearLocalStorageButton } from '@/src/app/settings/ClearLocalStorageButton'
import { HelpButton } from '@/src/app/settings/HelpButton'
import { SignOutButton } from '@/src/app/settings/SignOutButton'
import { ApiOverview } from '@/src/components/ApiOverview'
import { GroupNavigator } from '@/src/components/Groups/GroupNavigator'
import { isOwnerOfGroup } from '@/src/helpers/isOwnerOfGroup'
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
import { User } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface PageProps {
	params: Promise<unknown>
}

export default async function MainPage({ params }: PageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) redirect(routes.signIn())

	const resolvedParams = await params
	const res = routes.settings.$parseParams(resolvedParams ?? {})

	const groupId = res?.groupId

	const userId = session?.user?.id
	const isAdmin = session.user.role === 'ADMIN'

	if (!userId || !groupId) {
		return null
	}

	const user = await prisma.user.findUnique({
		where: { id: userId },
	})

	const isOwner = await isOwnerOfGroup(groupId)

	return (
		<div className='min-h-screen flex flex-col items-center p-4 pb-24'>
			<div className='w-full space-y-4'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-white'>Einstellungen</h1>
					<div className='flex items-center gap-2'>
						{isAdmin && <ClearLocalStorageButton />}
						<HelpButton />
					</div>
				</div>

				<div className='grid gap-4'>
					{/* <Card className='bg-white/5 backdrop-blur-sm border-white/10'>
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
					</Card> */}

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

					<ApiOverview groupId={groupId} isOwner={isOwner} userId={userId} />

					<Card className='bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors'>
						<CardHeader>
							<div className='flex items-center justify-between'>
								<div className='space-y-1'>
									<CardTitle className='text-lg text-white'>
										Gruppen verwalten
									</CardTitle>
									<CardDescription className='text-white/70'>
										Verwalte deine Gruppen und Mitgliedschaften
										<Link
											href={routes.groupSettings()}
											className='flex my-4 items-center gap-2 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors'
										>
											<User className='h-4 w-4 text-blue-400 flex-none' />
											<div className='text-sm'>
												<p className='text-white'>Gruppen verwalten</p>
											</div>
										</Link>
										<GroupNavigator />
									</CardDescription>
								</div>
							</div>
						</CardHeader>
					</Card>
				</div>

				<SignOutButton />
			</div>
		</div>
	)
}
