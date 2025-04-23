import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

export const OrganizerLink = ({
	children,
	className,
	href,
	...props
}: PropsWithChildren<
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		className?: string
		href: string
	}
>) => {
	return (
		<Link
			className={cn(
				'group flex w-full items-center rounded-md py-1.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800',
				className,
			)}
			href={href}
			{...props}
		>
			{children}
		</Link>
	)
}
