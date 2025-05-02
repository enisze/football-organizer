import { Check, X } from 'lucide-react'
import type React from 'react'

interface Feature {
	name: string
	included: boolean
}

interface PricingCardProps {
	title: string
	price: { monthly: number; annual: number }
	description: string
	features: Feature[]
	isPopular?: boolean
	isAnnual: boolean
	ctaText?: string
	accentColor?: string
}

const PricingCard: React.FC<PricingCardProps> = ({
	title,
	price,
	description,
	features,
	isPopular = false,
	isAnnual,
	ctaText = 'Get Started',
	accentColor = 'bg-indigo-600 hover:bg-indigo-700',
}) => {
	const displayPrice = isAnnual ? price.annual : price.monthly
	const borderColor = isPopular ? 'border-indigo-500' : 'border-gray-700'
	const popularBadge = isPopular && (
		<span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold py-1 px-3 rounded-full'>
			RECOMMENDED
		</span>
	)

	return (
		<div
			className={`relative flex flex-col rounded-xl border ${borderColor} bg-gray-800 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl p-6 h-full`}
		>
			{popularBadge}
			<h3 className='text-xl font-bold text-white mb-2'>{title}</h3>
			<p className='text-gray-400 mb-4 flex-grow'>{description}</p>

			<div className='mb-6'>
				<div className='flex items-baseline text-white'>
					<span className='text-3xl font-extrabold'>${displayPrice}</span>
					<span className='ml-1 text-gray-400'>
						/{isAnnual ? 'year' : 'month'}
					</span>
				</div>
			</div>

			<ul className='mb-8 space-y-3'>
				{features.map((feature, index) => (
					<li key={index} className='flex items-center'>
						{feature.included ? (
							<Check
								size={18}
								className='text-emerald-400 mr-2 flex-shrink-0'
							/>
						) : (
							<X size={18} className='text-gray-500 mr-2 flex-shrink-0' />
						)}
						<span
							className={feature.included ? 'text-gray-200' : 'text-gray-500'}
						>
							{feature.name}
						</span>
					</li>
				))}
			</ul>

			<button
				className={`mt-auto w-full rounded-lg ${accentColor} py-3 px-4 font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
			>
				{ctaText}
			</button>
		</div>
	)
}

export default PricingCard
