'use client'
import { useState } from 'react'
import ComparisonTable from './ComparisonTable'
import FAQSection from './FAQSection'
import PricingCard from './PricingCard'
import PricingHeader from './PricingHeader'
import PricingToggle from './PricingToggle'

export const PricingPage = () => {
	const [isAnnual, setIsAnnual] = useState(true)

	const plans = [
		{
			title: 'Basic',
			description:
				'Everything you need to get started with individual projects.',
			price: { monthly: 9, annual: 90 },
			features: [
				{ name: 'Up to 3 projects', included: true },
				{ name: 'Basic analytics', included: true },
				{ name: '24-hour support response time', included: true },
				{ name: 'Team collaboration', included: false },
				{ name: 'Advanced features', included: false },
				{ name: 'Priority support', included: false },
			],
			ctaText: 'Start Free Trial',
			accentColor: 'bg-gray-600 hover:bg-gray-700',
		},
		{
			title: 'Pro',
			description: 'Perfect for professionals and growing teams.',
			price: { monthly: 29, annual: 290 },
			features: [
				{ name: 'Unlimited projects', included: true },
				{ name: 'Advanced analytics', included: true },
				{ name: '6-hour support response time', included: true },
				{ name: 'Team collaboration', included: true },
				{ name: 'Advanced features', included: true },
				{ name: 'Priority support', included: false },
			],
			isPopular: true,
			ctaText: 'Get Pro',
			accentColor: 'bg-indigo-600 hover:bg-indigo-700',
		},
		{
			title: 'Enterprise',
			description: 'Custom solutions for large organizations.',
			price: { monthly: 99, annual: 990 },
			features: [
				{ name: 'Unlimited everything', included: true },
				{ name: 'White-label solution', included: true },
				{ name: '1-hour support response time', included: true },
				{ name: 'Dedicated account manager', included: true },
				{ name: 'Custom integrations', included: true },
				{ name: 'SSO Authentication', included: true },
			],
			ctaText: 'Contact Sales',
			accentColor: 'bg-purple-600 hover:bg-purple-700',
		},
	]

	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
				<PricingHeader
					title='Simple, Transparent Pricing'
					subtitle='Choose the perfect plan for your needs. All plans include a 14-day free trial.'
				/>

				<div className='mt-12'>
					<PricingToggle
						isAnnual={isAnnual}
						onToggle={() => setIsAnnual(!isAnnual)}
					/>
				</div>

				<div className='mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3'>
					{plans.map((plan, index) => (
						<PricingCard
							key={index}
							title={plan.title}
							price={plan.price}
							description={plan.description}
							features={plan.features}
							isPopular={plan.isPopular}
							isAnnual={isAnnual}
							ctaText={plan.ctaText}
							accentColor={plan.accentColor}
						/>
					))}
				</div>

				<ComparisonTable />

				<FAQSection />
			</div>
		</div>
	)
}
