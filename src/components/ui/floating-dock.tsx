'use client'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export const FloatingDock = ({
	items,
	desktopClassName,
}: {
	items: { title: string; icon: React.ReactNode; href: string }[]
	desktopClassName?: string
}) => {
	return (
		<nav
			className={cn(
				'fixed bottom-0 left-0 right-0 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-neutral-800 px-4 py-2',
				desktopClassName,
			)}
		>
			<div className='max-w-screen-xl mx-auto'>
				<div className='grid grid-cols-3 gap-1'>
					{items.map((item) => (
						<Link
							key={item.title}
							href={item.href}
							className='flex flex-col items-center text-center justify-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors'
						>
							<div className='w-6 h-6 mb-1'>{item.icon}</div>
							<span className='text-xs text-gray-600 dark:text-gray-400'>
								{item.title}
							</span>
						</Link>
					))}
				</div>
			</div>
		</nav>
	)
}
