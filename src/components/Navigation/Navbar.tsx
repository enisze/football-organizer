'use client'
import { Button } from '@/ui/button'
import Link from 'next/link'

import { routes } from '@/src/shared/navigation'
import type { User } from 'better-auth/types'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { Heading } from '../Heading'
import { UserAvatar } from '../UserAvatar'
import { DashboardLink } from './DashboardLink'

export const Navbar = ({
	group,
	user,
}: {
	group: { id: string } | null
	user: User | undefined
}) => {
	const pathname = usePathname()

	return (
		<header className='sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0c1021]/80 backdrop-blur-sm'>
			<div className='container flex h-16 items-center justify-between'>
				<Heading size='sm' />
				{(pathname.includes('home') || pathname === '/') && (
					<nav className='hidden md:flex items-center gap-6'>
						<Link
							href='#overview'
							className='text-sm hover:text-[#5b68e3] transition-colors'
						>
							Übersicht
						</Link>
						<Link
							href='#features'
							className='text-sm hover:text-[#5b68e3] transition-colors'
						>
							Funktionen
						</Link>
						<Link
							href='#testimonials'
							className='text-sm hover:text-[#5b68e3] transition-colors'
						>
							Erfahrungen
						</Link>
						<Link
							href='#faq'
							className='text-sm hover:text-[#5b68e3] transition-colors'
						>
							FAQ
						</Link>
					</nav>
				)}
				<div className='flex items-center gap-4'>
					<div className='flex gap-x-1 items-center cursor-pointer'>
						{!user && (
							<Link href={routes.signIn()}>
								<Button variant='outline'>Anmelden</Button>
							</Link>
						)}
						<Suspense>
							<DashboardLink groupId={group?.id ?? ''} />
						</Suspense>
						<UserAvatar name={user?.name ?? ''} />
					</div>
				</div>
			</div>
		</header>
	)
}
