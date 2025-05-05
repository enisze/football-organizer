import { cn } from '@/lib/utils/cn'
import type React from 'react'

interface PricingToggleProps {
	isAnnual: boolean
	onToggle: () => void
}

const PricingToggle: React.FC<PricingToggleProps> = ({
	isAnnual,
	onToggle,
}) => {
	return (
		<div className='flex items-center justify-center space-x-3'>
			<span
				className={cn(
					'text-sm font-medium',
					!isAnnual ? 'text-white' : 'text-gray-400',
				)}
			>
				Monthly
			</span>
			<button
				onClick={onToggle}
				className='relative inline-flex h-6 w-11 items-center rounded-full'
				type='button'
			>
				<span className='sr-only'>Toggle billing frequency</span>
				<span
					className={cn(
						isAnnual ? 'bg-indigo-600' : 'bg-gray-700',
						'absolute h-6 w-11 mx-auto rounded-full transition-colors duration-300 ease-in-out',
					)}
				/>
				<span
					className={cn(
						isAnnual ? 'translate-x-6' : 'translate-x-1',
						'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out',
					)}
				/>
			</button>
			<span
				className={cn(
					'text-sm font-medium',
					isAnnual ? 'text-white' : 'text-gray-400',
				)}
			>
				Annual <span className='text-emerald-400 ml-1'>-20%</span>
			</span>
		</div>
	)
}

export default PricingToggle
