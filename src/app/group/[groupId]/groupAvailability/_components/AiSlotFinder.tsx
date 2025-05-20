'use client'

import { Button } from '@/ui/button'
import { ScrollArea } from '@/ui/scroll-area'
import { MessageCircle } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { findBestSlotAction } from '../../../actions'

interface AiSlotFinderProps {
	groupId: string
}

export const AiSlotFinder = ({ groupId }: AiSlotFinderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [response, setResponse] = useState<string | null>(null)

	const { execute: findBestSlot, status } = useAction(findBestSlotAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setResponse(data.text)
			}
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		findBestSlot({
			groupId,
			query,
		})
	}

	return (
		<div className='fixed bottom-14 right-4 z-50'>
			{isOpen ? (
				<div className='bg-background border rounded-lg shadow-lg p-4 w-80'>
					<div className='flex flex-col gap-4'>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<textarea
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Wann möchtest du spielen? z.B. 'Nächsten Dienstag abend' oder 'Diese Woche 90 min'"
								className='w-full h-24 p-2 text-sm rounded-md bg-white/5 border-white/10'
							/>
							<Button
								type='submit'
								disabled={status === 'executing'}
								className='w-full'
							>
								{status === 'executing' ? 'Suche...' : 'Nach Slots suchen'}
							</Button>
						</form>

						{response && (
							<div className='relative bg-white/5 rounded-md'>
								<ScrollArea className='h-60 w-full'>
									<div className='p-2 space-y-2'>
										<p className='text-sm text-muted-foreground mb-2'>
											{response}
										</p>
									</div>
								</ScrollArea>
							</div>
						)}

						<Button
							variant='ghost'
							size='sm'
							onClick={() => setIsOpen(false)}
							className='self-end'
						>
							Schließen
						</Button>
					</div>
				</div>
			) : (
				<Button
					onClick={() => setIsOpen(true)}
					className='rounded-full h-12 w-12 p-0'
				>
					<MessageCircle className='h-6 w-6' />
				</Button>
			)}
		</div>
	)
}
