import { Button } from '@/ui/button'
import { ThemeToggle } from '@/ui/theme-toggle'
import Link from 'next/link'
import { Heading } from '../Heading'
import { DashboardLink } from './DashboardLink'
import { OrganizerServerMenu } from './OrganizerServerMenu'

import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'

export const Navbar = async () => {
	const session = await serverAuth()

	const group = await prisma.group.findFirst({
		where: { users: { some: { id: session?.user?.id } } },
		select: { id: true },
	})

	return (
		<header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
			<nav className="flex items-center justify-between p-2">
				<Heading size="sm" />

				<div className="flex gap-x-1 items-center cursor-pointer">
					<OrganizerServerMenu groupId={group?.id} />

					{!session?.user && (
						<Link href={routes.signIn()}>
							<Button variant="outline">Login / Registrieren</Button>
						</Link>
					)}
					<DashboardLink groupId={group?.id} />

					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}
