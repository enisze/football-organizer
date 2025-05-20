'use client'

import { cn } from '@/lib/utils/cn'
import { EventDialog } from '@/src/app/settings/groups/[groupId]/EventDialog'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { Button } from '@/ui/button'
import { Card } from '@/ui/card'
import { Input } from '@/ui/input'
import { useChat } from '@ai-sdk/react'
import { Calendar, Clock, Send, X } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import type { ProcessedTimeSlot } from '../../availability/processAvailability'

interface AiSlotFinderProps {
	groupId: string
}

export const AiSlotFinder = ({ groupId }: AiSlotFinderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedSlot, setSelectedSlot] = useState<Omit<
		ProcessedTimeSlot,
		'availableUsers'
	> | null>(null)
	const [currentDate, setCurrentDate] = useState<Date | null>(null)
	const [showEventDialog, setShowEventDialog] = useState(false)

	const { messages, input, handleInputChange, handleSubmit } = useChat({
		maxSteps: 5,
		api: '/api/ai/chat',
		body: {
			groupId,
		},
		onToolCall: ({ toolCall }) => {
			if (toolCall.toolName === 'openEventDialog') {
				const { startTime, endTime, date } = z
					.object({
						startTime: z.string(),
						endTime: z.string(),
						date: z.string(),
					})
					.parse(toolCall.args)

				setSelectedSlot({
					startTime,
					endTime,
				})
				setCurrentDate(new Date(date))
				setShowEventDialog(true)
				return 'Dialog geöffnet'
			}
		},
	})

	return (
		<div className='fixed bottom-4 right-4 z-50'>
			{isOpen ? (
				<Card className='w-full max-w-md h-[450px] flex flex-col bg-gray-900 border-gray-800 shadow-xl rounded-lg overflow-hidden'>
					{/* Header */}
					<div className='flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900'>
						<div className='flex items-center space-x-2'>
							<Calendar className='h-5 w-5 text-purple-400' />
							<h2 className='text-xl font-semibold text-white'>
								Availability Chat
							</h2>
						</div>
						<Button
							variant='ghost'
							size='icon'
							onClick={() => setIsOpen(false)}
							className='text-gray-400 hover:text-white hover:bg-gray-800 rounded-full'
						>
							<X className='h-5 w-5' />
							<span className='sr-only'>Close</span>
						</Button>
					</div>

					{/* Chat content */}
					<div className='flex-1 overflow-y-auto p-4 space-y-4'>
						<div className='flex flex-col gap-4'>
							{messages.map((message) => (
								<div
									key={message.id}
									className={cn(
										'flex',
										message.role === 'assistant'
											? 'justify-start'
											: 'justify-end',
									)}
								>
									<div
										className={cn(
											'max-w-[85%] rounded-lg p-3',
											message.role === 'assistant'
												? 'bg-gray-800 text-gray-100'
												: 'bg-purple-600 text-white',
										)}
									>
										{message.parts.map((part, index) => {
											if (part.type === 'text') {
												return (
													<p key={index} className='text-sm'>
														{part.text}
													</p>
												)
											}
											if (part.type === 'tool-invocation') {
												if (part.toolInvocation.state === 'call') {
													return (
														<div
															key={index}
															className='text-sm text-gray-400 flex items-center gap-2'
														>
															<Clock className='h-3 w-3 animate-spin' />
															<span>Checking availability...</span>
														</div>
													)
												}
												if (
													part.toolInvocation.toolName ===
													'fetchDateSlotsForGroup'
												)
													return (
														<div className='bg-gray-800 rounded-lg overflow-hidden mt-2'>
															<Accordion
																type='single'
																collapsible
																className='w-full'
															>
																<AccordionItem
																	value='available-slots'
																	className='border-none'
																>
																	<AccordionTrigger className='p-2 text-white hover:no-underline bg-gray-700 mb-2 rounded-md'>
																		<h3 className='text-lg font-medium'>
																			Available Slots
																		</h3>
																	</AccordionTrigger>
																	<AccordionContent>
																		<div className='flex flex-col gap-1 text-sm text-gray-300 whitespace-pre-line'>
																			{part.toolInvocation.state === 'result' &&
																				part.toolInvocation.result
																					.split('\n')
																					.filter(
																						(l: string) => l.trim() !== '',
																					)
																					.map((line: string, i: number) => (
																						<div
																							key={i}
																							className='p-3 rounded-md border-l-4 border-gray-700 bg-gray-800 hover:bg-gray-700'
																						>
																							{line}
																						</div>
																					))}
																		</div>
																	</AccordionContent>
																</AccordionItem>
															</Accordion>
														</div>
													)
											}
										})}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Input area */}
					<div className='p-4 border-t border-gray-800 bg-gray-900'>
						<form
							onSubmit={handleSubmit}
							className='flex items-center space-x-2'
						>
							<Input
								value={input}
								onChange={handleInputChange}
								placeholder='Ask about availability...'
								className='flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500'
							/>
							<Button type='submit' size='icon' variant='purple'>
								<Send className='h-5 w-5' />
								<span className='sr-only'>Send</span>
							</Button>
						</form>
					</div>
				</Card>
			) : (
				<Button
					onClick={() => setIsOpen(true)}
					variant='purple'
					className='absolute bottom-[70px] right-0 w-fit'
				>
					<Calendar className='h-6 w-6' />
				</Button>
			)}

			<EventDialog
				open={showEventDialog}
				onOpenChange={setShowEventDialog}
				templates={[]}
				initialTime={
					selectedSlot && currentDate
						? {
								startTime: selectedSlot.startTime,
								endTime: selectedSlot.endTime,
								date: currentDate.toISOString().split('T').at(0) ?? '',
							}
						: undefined
				}
			/>
		</div>
	)
}
