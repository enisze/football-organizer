'use client'

import { cn } from '@/lib/utils/cn'
import { useSafeSearchParams } from '@/src/shared/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const FloatingDock = ({
	items,
	desktopClassName,
}: {
	items: { title: string; icon: React.ReactNode; href: string; id: string }[]
	desktopClassName?: string
}) => {
	const pathname = usePathname()

	const searchParams = useSafeSearchParams('groupDetails')

	return (
		<nav
			className={cn(
				'fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-neutral-800 px-4 py-2',
				desktopClassName,
			)}
		>
			<div className='max-w-screen-xl mx-auto'>
				<div className='grid grid-cols-4 gap-1'>
					{items.map((item) => {
						const itemLink = new URL(
							item.href,
							process.env.NEXT_PUBLIC_BASE_URL,
						)

						//@ts-ignore TODO: Fix at some point
						const merged = new URLSearchParams({
							...Object.fromEntries(itemLink.searchParams),
							...searchParams,
						})

						const url = new URL(item.href, process.env.NEXT_PUBLIC_BASE_URL)
						url.search = merged.toString()

						return (
							<Link
								key={item.title}
								href={url}
								className={cn(
									'flex flex-col items-center text-center justify-center py-2 px-3 rounded-lg transition-colors',
									pathname?.includes(item.id)
										? 'bg-gray-100 dark:bg-slate-800'
										: 'hover:bg-gray-100 dark:hover:bg-slate-800',
								)}
								data-tour={item.id}
							>
								<div className='w-6 h-6 mb-1'>{item.icon}</div>
								<span className='text-xs text-gray-600 dark:text-gray-400'>
									{item.title}
								</span>
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}
