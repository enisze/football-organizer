'use client'
import { NotificationBubble } from '@/src/components/NotificationBubble'
import { Label } from '@radix-ui/react-label'
import { InfoIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import React, { useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'
import type { InputProps } from './input'
import { Input } from './input'

type TextFieldProps = InputProps & {
	text: string
	label: string
	infoContent?: ReactNode
	withBubble?: boolean
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
	({ label, text, infoContent, withBubble, ...props }, ref) => {
		const [showInfo, setShowInfo] = useState(false)

		return (
			<div
				className={`grid w-full max-w-sm items-center gap-1.5 ${props.className}`}
			>
				<div className='flex items-center gap-x-1'>
					<Label>{label}</Label>
					{infoContent && (
						<HoverCard>
							<HoverCardTrigger>
								<InfoIcon
									className='h-4 w-4 flex-none'
									onClick={() => {
										if (window.innerHeight < 768) {
											setShowInfo(!showInfo)
										}
									}}
									tabIndex={0}
								/>
							</HoverCardTrigger>
							<HoverCardContent>{infoContent}</HoverCardContent>
						</HoverCard>
					)}
				</div>
				<div className='relative'>
					<Input ref={ref} {...props} />
					{withBubble && <NotificationBubble className='right-2 top-3' />}
				</div>
				<p className='text-sm text-red-500/90'>{text}</p>
			</div>
		)
	}
)

TextField.displayName = 'Input'

export { TextField }
