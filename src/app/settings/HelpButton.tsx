'use client'

import { Button } from '@/ui/button'
import { useTour } from '@reactour/tour'
import { HelpCircle } from 'lucide-react'

export function HelpButton() {
	const { setIsOpen } = useTour()

	return (
		<Button
			variant='ghost'
			size='icon'
			className='help-button'
			onClick={() => setIsOpen(true)}
		>
			<HelpCircle className='h-5 w-5' />
			<span className='sr-only'>Help</span>
		</Button>
	)
}
