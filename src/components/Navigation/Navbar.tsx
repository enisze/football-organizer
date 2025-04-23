import { Button } from '@/ui/button'
import Link from 'next/link'
import { Heading } from '../Heading'

import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { routes } from '@/src/shared/navigation'
import { UserAvatar } from '../UserAvatar'

export const Navbar = async () => {
	const session = await serverAuth()

	const group = await prisma.group.findFirst({
		where: { users: { some: { id: session?.user?.id } } },
		select: { id: true },
	})

	return (
		<header className='sticky dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-slate-50 top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700 '>
			<nav className='flex items-center justify-between p-2'>
				<Heading size='sm' />

				<div className='flex gap-x-1 items-center cursor-pointer'>
					{!session?.user && (
						<Link href={routes.signIn()}>
							<Button variant='outline'>Login / Registrieren</Button>
						</Link>
					)}
				</div>
				<UserAvatar name={session?.user?.name ?? ''} />
			</nav>
		</header>
	)
}
