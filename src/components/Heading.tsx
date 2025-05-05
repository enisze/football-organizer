import { cn } from '@/lib/utils/cn'
import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { Phone } from './Phone'

export const Heading: FunctionComponent<{
	size?: 'sm' | 'md' | 'lg'
}> = ({ size = 'lg' }) => {
	const fontSize =
		size === 'lg'
			? 'text-[80px]'
			: size === 'md'
				? 'text-[48px]'
				: 'text-[20px]'

	return (
		<Link href={'/home'}>
			<div className='text-center'>
				<span
					className={cn(
						'cursor-pointer font-extrabold leading-normal bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent dark:from-blue-800 dark:to-slate-800',
						fontSize,
					)}
				>
					Event
					<span className='text-slate-900 dark:text-slate-100'> Wizard</span>
				</span>
			</div>
		</Link>
	)
}

export const Hero: FunctionComponent = () => {
	return (
		<>
			<span className=' md:text-2xl font-bold mx-auto text-center py-3 px-5'>
				Erstelle eine Verknüpfung zur Website, um sie schneller zu nutzen:
			</span>
			<Phone />
		</>
	)
}
