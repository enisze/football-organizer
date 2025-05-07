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
	user,
}: {
	user: User | undefined
}) => {
	const pathname = usePathname()
	const showNavigation = pathname.includes('home') || pathname === '/'

	return (
		<header className='sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0c1021]/80 backdrop-blur-sm'>
			<div className='px-4 flex h-16 items-center justify-between'>
				<Heading size='sm' />
				<div className='flex items-center gap-4'>
					<div className='flex gap-x-1 items-center cursor-pointer'>
						{!user && (
							<Link href={routes.signIn()}>
								<Button variant='outline'>Anmelden</Button>
							</Link>
						)}
						<Suspense>
							<DashboardLink />
						</Suspense>

						<UserAvatar name={user?.name ?? ''} />
					</div>
				</div>
			</div>
		</header>
	)
}
