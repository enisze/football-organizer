import { ChevronDown, ChevronUp } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

interface FAQItemProps {
	question: string
	answer: string
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='border-b border-gray-700 py-4'>
			<button type='button'
				className='flex w-full items-center justify-between text-left'
				onClick={() => setIsOpen(!isOpen)}
			>
				<h3 className='text-lg font-medium text-white'>{question}</h3>
				<span className='ml-6 flex-shrink-0 text-gray-400'>
					{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
				</span>
			</button>
			{isOpen && (
				<div className='mt-3 text-gray-400 pr-12 transition-all duration-300 ease-in-out'>
					<p>{answer}</p>
				</div>
			)}
		</div>
	)
}

export default FAQItem
