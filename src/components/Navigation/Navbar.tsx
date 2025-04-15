import { getServerComponentAuthSession } from '@/src/server/auth/authOptions'
import { Button } from '@/ui/button'
import { ThemeToggle } from '@/ui/theme-toggle'
import Link from 'next/link'
import { Heading } from '../Heading'
import { DashboardLink } from './DashboardLink'
import { OrganizerServerMenu } from './OrganizerServerMenu'

import { prisma } from '@/src/server/db/client'

export const Navbar = async () => {
	const data = await getServerComponentAuthSession()

	const group = await prisma.group.findFirst({
		where: { users: { some: { id: data?.user?.id } } },
		select: { id: true },
	})

	return (
		<header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
			<nav className="flex items-center justify-between p-2">
				<Heading size="sm" />

				<div className="flex gap-x-1 items-center cursor-pointer">
					<OrganizerServerMenu groupId={group?.id} />

					{!data?.user && (
						<Link href="/api/auth/signin">
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
