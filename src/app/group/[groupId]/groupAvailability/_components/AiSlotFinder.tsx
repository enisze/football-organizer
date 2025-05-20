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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
import { ScrollArea } from '@/ui/scroll-area'
import { useChat } from '@ai-sdk/react'
import { Calendar, Clock, MessageCircle, Send, X } from 'lucide-react'
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

	const [showEventDialog, setShowEventDialog] = useState(false)

	return (
		<div className='fixed bottom-14 right-4 z-50'>
			{isOpen ? (
				<Card className='w-80 bg-background border-zinc-800 shadow-lg'>
					<CardHeader className='p-4 border-b border-zinc-800'>
						<CardTitle className='text-sm font-medium flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Calendar className='h-4 w-4 text-primary' />
								<span>Availability Chat</span>
							</div>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsOpen(false)}
								className='h-6 w-6'
							>
								<X className='h-4 w-4' />
								<span className='sr-only'>Close</span>
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<ScrollArea className='h-[320px] p-4'>
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
													? 'bg-zinc-800 text-zinc-100'
													: 'bg-primary text-primary-foreground',
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
																className='text-sm text-zinc-400 flex items-center gap-2'
															>
																<Clock className='h-3 w-3 animate-spin' />
																<span>Checking availability...</span>
															</div>
														)
													}
													return (
														<Card
															key={index}
															className='mt-2 bg-zinc-900 border-zinc-700'
														>
															<CardContent className='p-3'>
																<Accordion
																	type='single'
																	collapsible
																	className='w-full'
																>
																	<AccordionItem
																		value='availability'
																		className='border-zinc-700'
																	>
																		<AccordionTrigger className='text-sm py-2 text-primary no-underline'>
																			Available Slots
																		</AccordionTrigger>
																		<AccordionContent>
																			<div className='text-sm text-zinc-200 whitespace-pre-line'>
																				{part.toolInvocation.state ===
																					'result' &&
																					part.toolInvocation.result
																						.split('\n')
																						.map((line: string, i: number) => (
																							<div
																								key={i}
																								className='py-1 border-b border-zinc-700 last:border-0'
																							>
																								{line}
																							</div>
																						))}
																			</div>
																		</AccordionContent>
																	</AccordionItem>
																</Accordion>
															</CardContent>
														</Card>
													)
												}
											})}
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					</CardContent>
					<CardFooter className='p-3 border-t border-zinc-800'>
						<form onSubmit={handleSubmit} className='flex w-full gap-2'>
							<Input
								value={input}
								onChange={handleInputChange}
								placeholder='Ask about availability...'
								className='flex-1 h-9 bg-zinc-800 border-zinc-700 text-sm focus-visible:ring-primary'
							/>
							<Button type='submit' size='sm' className='h-9 px-3'>
								<Send className='h-4 w-4' />
								<span className='sr-only'>Send</span>
							</Button>
						</form>
					</CardFooter>
				</Card>
			) : (
				<Button
					onClick={() => setIsOpen(true)}
					className='rounded-full h-12 w-12 p-0'
				>
					<MessageCircle className='h-6 w-6' />
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
