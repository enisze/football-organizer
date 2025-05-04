'use client'
import { Button } from '@/ui/button'
import Link from 'next/link'

import { routes } from '@/src/shared/navigation'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import type { User } from 'better-auth/types'
import { Menu } from 'lucide-react'
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
	const showNavigation = pathname.includes('home') || pathname === '/'

	return (
		<header className='sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0c1021]/80 backdrop-blur-sm'>
			<div className='container flex h-16 items-center justify-between'>
				<Heading size='sm' />
				{showNavigation && (
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
						{showNavigation && (
							<div className='md:hidden'>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant='outline'
											size='icon'
											className='bg-[#0c1021] border-gray-800 hover:bg-[#131b31]'
										>
											<Menu className='h-5 w-5' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='w-48 bg-[#0c1021] border-gray-800'>
										<DropdownMenuItem asChild>
											<Link
												href='#overview'
												className='text-gray-300 hover:text-[#5b68e3] transition-colors w-full'
											>
												Übersicht
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href='#features'
												className='text-gray-300 hover:text-[#5b68e3] transition-colors w-full'
											>
												Funktionen
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href='#testimonials'
												className='text-gray-300 hover:text-[#5b68e3] transition-colors w-full'
											>
												Erfahrungen
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem asChild>
											<Link
												href='#faq'
												className='text-gray-300 hover:text-[#5b68e3] transition-colors w-full'
											>
												FAQ
											</Link>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
