import type React from 'react'
import FAQItem from './FAQItem'

const faqData = [
	{
		question: "What's included in the free plan?",
		answer:
			"The free plan includes basic features to get you started, such as limited users, basic analytics, and standard support. It's perfect for individuals or small teams looking to explore our platform.",
	},
	{
		question: 'Can I upgrade or downgrade my plan anytime?',
		answer:
			"Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will be applied at the start of your next billing cycle.",
	},
	{
		question: 'Do you offer custom enterprise solutions?',
		answer:
			"Absolutely! Our Enterprise plan is flexible and can be tailored to your organization's specific needs. Contact our sales team for a custom quote and to discuss your requirements in detail.",
	},
	{
		question: 'Is there a discount for annual billing?',
		answer:
			'Yes, we offer a 20% discount on all plans when you choose annual billing instead of monthly. This helps you save while enjoying our services for the entire year.',
	},
	{
		question: 'How secure is my data on your platform?',
		answer:
			'Security is our top priority. We use industry-standard encryption, regular security audits, and strict access controls. All data is stored in secure, compliant data centers, and we never share your information with third parties.',
	},
]

const FAQSection: React.FC = () => {
	return (
		<div className='mt-24 max-w-3xl mx-auto'>
			<h2 className='text-3xl font-bold text-white text-center mb-12'>
				Frequently Asked Questions
			</h2>
			<div className='space-y-1'>
				{faqData.map((faq, index) => (
					<FAQItem key={index} question={faq.question} answer={faq.answer} />
				))}
			</div>
		</div>
	)
}

export default FAQSection
