'use client'

import { cn } from '@/lib/utils/cn'
import { transcribeAudioAction } from '@/src/app/actions/transcribe'
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
import { Calendar, Clock, Mic, MicOff, Send, X } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { z } from 'zod'
import { TimelineView } from '../../availability/components/TimeLineView'
import type { ProcessedTimeSlot } from '../../availability/processAvailability'

interface AiSlotFinderProps {
	groupId: string
}

export const AIChat = ({ groupId }: AiSlotFinderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isRecording, setIsRecording] = useState(false)
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
	const { executeAsync: transcribe, isPending } = useAction(
		transcribeAudioAction,
	)
	const [selectedSlot, setSelectedSlot] = useState<Omit<
		ProcessedTimeSlot,
		'availableUsers'
	> | null>(null)
	const [currentDate, setCurrentDate] = useState<Date | null>(null)
	const [showEventDialog, setShowEventDialog] = useState(false)

	const [maxUsers] = useQueryState('maxUsers', {
		defaultValue: 0,
		parse: (value) => Number(value),
		shallow: true,
	})

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
			if (toolCall.toolName === 'fetchDateSlotsForGroup') {
				const { month, day, year } = z
					.object({
						month: z.number().optional(),
						day: z.number().optional(),
						year: z.number().optional(),
					})
					.parse(toolCall.args)

				setCurrentDate(new Date(`${year}-${month}-${day}`))

				return ''
			}
		},
	})

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					channelCount: 1,
					sampleRate: 16000, // Whisper prefers 16kHz
				},
			})

			const mimeType = 'audio/webm'

			const recorder = new MediaRecorder(stream, {
				mimeType,
				audioBitsPerSecond: 128000,
			})

			const chunks: Blob[] = []

			recorder.ondataavailable = (e) => {
				if (e.data.size > 0) chunks.push(e.data)
			}

			recorder.onstop = async () => {
				const blob = new Blob(chunks, { type: mimeType })
				// Convert blob to base64
				const reader = new FileReader()
				reader.onloadend = async () => {
					const base64Audio = (reader.result as string).split(',')[1]
					if (!base64Audio) {
						console.error('Failed to get base64 audio data')
						return
					}

					const transcription = await transcribe({ audioBase64: base64Audio })

					if (transcription) {
						handleInputChange({
							target: { value: transcription.data },
						} as React.ChangeEvent<HTMLInputElement>)
					}
				}
				reader.readAsDataURL(blob)
			}

			recorder.start(1000)
			setMediaRecorder(recorder)
			setIsRecording(true)
		} catch (error) {
			console.error('Error starting recording:', error)
		}
	}

	const stopRecording = () => {
		if (mediaRecorder && mediaRecorder.state !== 'inactive') {
			mediaRecorder.stop()
			for (const track of mediaRecorder.stream.getTracks()) {
				track.stop()
			}
			setIsRecording(false)
			setMediaRecorder(null)
		}
	}

	return (
		<div className='fixed bottom-4 right-4 z-50'>
			{isOpen ? (
				<Card className='w-full w-sm h-[450px] flex flex-col bg-gray-900 border-gray-800 shadow-xl rounded-lg overflow-hidden'>
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
												: 'bg-indigo-600 text-white',
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
												) {
													const result: ProcessedTimeSlot[] =
														part.toolInvocation.state === 'result'
															? part.toolInvocation.result
															: []

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
																			<TimelineView
																				slots={result}
																				maxUsers={maxUsers}
																				singleLine={false}
																				onSlotClick={(slot) => {
																					setSelectedSlot(slot)
																					setShowEventDialog(true)
																				}}
																			/>
																		</div>
																	</AccordionContent>
																</AccordionItem>
															</Accordion>
														</div>
													)
												}
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
							<Button
								type='button'
								size='icon'
								variant='ghost'
								onClick={isRecording ? stopRecording : startRecording}
								className='text-gray-400 hover:text-white hover:bg-gray-800'
							>
								{isPending ? (
									<Clock className='h-5 w-5 animate-spin' />
								) : (
									<>
										{isRecording ? (
											<MicOff className='h-5 w-5 text-red-500' />
										) : (
											<Mic className='h-5 w-5' />
										)}
										<span className='sr-only'>
											{isRecording ? 'Stop Recording' : 'Start Recording'}
										</span>
									</>
								)}
							</Button>
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
