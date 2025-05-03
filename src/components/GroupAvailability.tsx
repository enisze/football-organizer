'use client'

import { cn } from '@/lib/utils/cn'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
import type { User } from '@prisma/client'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import {
	revalidateGroupAction,
	revalidateTagAction,
} from '../app/group/[groupId]/actions'
import type {
	ProcessedTimeSlot,
	TimeSlotDuration,
} from '../app/group/[groupId]/availability/processAvailability'
import { UserCountInput } from './ui/UserCountInput'

interface GroupAvailabilityViewProps {
	users: User[]
	date: Date
	processedSlots: ProcessedTimeSlot[]
	groupId: string
}

export function GroupAvailabilityView({
	date: initialDate,
	users,
	processedSlots,
	groupId,
}: GroupAvailabilityViewProps) {
	const [date, setDate] = useQueryState('date', {
		shallow: true,
	})
	const [duration, setDuration] = useQueryState('duration', {
		parse: (value) => value as TimeSlotDuration,
		shallow: true,
	})
	const [minUsers, setMinUsers] = useQueryState('minUsers', {
		defaultValue: 0,
		parse: (value) => Number(value),
		shallow: true,
	})

	const [maxUsers, setMaxUsers] = useQueryState('maxUsers', {
		defaultValue: 0,
		parse: (value) => Number(value),
		shallow: true,
	})
	const [calendarOpen, setCalendarOpen] = useState(false)

	const refresh = useDebouncedCallback(() => {
		revalidateTagAction({ tagId: 'groupAvailability' })
		revalidateGroupAction({
			groupId,
			date: date,
			duration,
			minUsers: minUsers,
		})
	}, 300)

	const handleDateChange = useCallback(
		async (newDate: Date | undefined) => {
			if (!newDate) return
			setDate(newDate.toISOString())
			setCalendarOpen(false)
			refresh()
		},
		[setDate, refresh],
	)

	const currentDate = date ? new Date(date) : initialDate

	return (
		<div className='container p-0 mx-auto space-y-4 pt-2 pb-16 px-4 sm:px-6 md:space-y-8 md:pb-24'>
			<h2 className='text-2xl font-bold'>Gruppenslots</h2>
			<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
				<CardHeader className='p-4 pb-0 md:p-6 md:pb-0'>
					<CardTitle className='text-xl md:text-2xl'>
						{currentDate.toLocaleDateString('de-DE', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
						})}
					</CardTitle>
					<CardDescription className='text-sm md:text-base text-white/70'>
						<div>Gruppenverfügbarkeit</div>
						<div className='text-xs'>(Gruppengröße: {users.length})</div>
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4 p-4 md:space-y-6 md:p-6'>
					<div className='grid gap-4 md:gap-6'>
						<div>
							<h3 className='text-base md:text-lg font-semibold mb-2'>Datum</h3>
							<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
								<PopoverTrigger asChild>
									<Button
										variant='outline'
										className={cn(
											'w-full justify-start text-left font-normal text-sm md:text-base hover:bg-slate-700',
											!date && 'text-muted-foreground',
										)}
									>
										<CalendarIcon className='mr-2 h-4 w-4 md:h-5 md:w-5' />
										{date ? (
											format(date, 'PPP', { locale: de })
										) : (
											<span>Datum auswählen</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0'>
									<Calendar
										id='date-picker'
										mode='single'
										selected={currentDate}
										onSelect={handleDateChange}
										className='mx-auto'
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className='space-y-2'>
							<h3 className='font-bold text-lg md:text-xl'>Teilnehmer</h3>
							<div className='grid gap-4 grid-cols-2'>
								<UserCountInput
									label='Mindestanzahl'
									value={minUsers}
									onChange={(value) => {
										setMinUsers(value)
										refresh()
									}}
									min={1}
									max={10}
								/>
								<UserCountInput
									label='Maximalanzahl'
									value={maxUsers}
									onChange={(value) => {
										setMaxUsers(value)
										refresh()
									}}
									min={1}
									max={10}
								/>
							</div>
						</div>
					</div>

					<div className='border-t border-white/10 pt-4 md:pt-6'>
						<Tabs
							value={duration ?? undefined}
							onValueChange={async (value) => {
								setDuration(value as TimeSlotDuration)
								refresh()
							}}
							className='w-full'
						>
							<TabsList className='w-full flex rounded-xl bg-white/5 p-1'>
								<TabsTrigger
									value='60min'
									className='flex-1 px-2 py-1.5 text-sm md:text-base rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
								>
									1h
								</TabsTrigger>
								<TabsTrigger
									value='90min'
									className='flex-1 px-2 py-1.5 text-sm md:text-base rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
								>
									90m
								</TabsTrigger>
								<TabsTrigger
									value='120min'
									className='flex-1 px-2 py-1.5 text-sm md:text-base rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
								>
									2h
								</TabsTrigger>
							</TabsList>
						</Tabs>

						<div className='grid gap-2 grid-cols-1 mt-4 md:mt-6'>
							{processedSlots.map((slot, index) => {
								const availableCount = slot.availableUsers.length
								const percentage = (availableCount / maxUsers) * 100

								return (
									<div
										key={index}
										className='relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl border border-white/10'
									>
										<div className='p-3 md:p-4 relative z-10'>
											<div className='text-xs md:text-sm font-medium flex justify-between items-center'>
												<span>
													{slot.startTime} - {slot.endTime}
												</span>
												<Badge
													variant='secondary'
													className='bg-white/10 text-xs'
												>
													{availableCount}/{maxUsers}
												</Badge>
											</div>

											<div className='mt-2'>
												<Accordion type='single' collapsible className='w-full'>
													<AccordionItem
														value='participants'
														className='border-none'
													>
														<AccordionTrigger className='py-1 hover:no-underline'>
															<div className='text-xs font-medium text-white/70'>
																Teilnehmer
															</div>
														</AccordionTrigger>
														<AccordionContent>
															<div className='flex flex-wrap gap-1.5'>
																{slot.availableUsers.map((user) => (
																	<div
																		key={user.id}
																		className='flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-xs'
																	>
																		<div className='h-1.5 w-1.5 rounded-full bg-white/70' />
																		{user.name}
																	</div>
																))}
															</div>
														</AccordionContent>
													</AccordionItem>
												</Accordion>
											</div>
										</div>

										<div
											className={cn(
												'absolute bottom-0 left-0 right-0 transition-all duration-200',
												percentage < 50
													? 'bg-red-500/30'
													: percentage < 75
														? 'bg-orange-500/30'
														: 'bg-emerald-500/30',
											)}
											style={{
												height: `${percentage}%`,
												opacity: percentage / 100,
											}}
										/>
									</div>
								)
							})}

							{processedSlots.length === 0 && (
								<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-4'>
									<p className='text-white/50 text-xs md:text-sm'>
										Keine Zeitfenster verfügbar
									</p>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
