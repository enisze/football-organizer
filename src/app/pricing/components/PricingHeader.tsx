import type React from 'react'

interface PricingHeaderProps {
	title: string
	subtitle: string
}

const PricingHeader: React.FC<PricingHeaderProps> = ({ title, subtitle }) => {
	return (
		<div className='text-center max-w-3xl mx-auto'>
			<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
				{title}
			</h1>
			<p className='text-xl text-gray-400'>{subtitle}</p>
		</div>
	)
}

export default PricingHeader
