'use client'

import { cn } from '@/lib/utils/cn'
import { EventDialog } from '@/src/app/settings/groups/[groupId]/EventDialog'
import { DrawerSlotDetails } from '@/src/components/DrawerSlotDetails'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { CardTitle } from '@/ui/card'
import { Label } from '@/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
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
import { TimeRangePicker } from './TimeRangePicker'
import { UserCountInput } from './ui/UserCountInput'

interface GroupAvailabilityViewProps {
	date: Date
	processedSlots: ProcessedTimeSlot[]
	groupId: string
}

export function GroupAvailabilityView({
	date: initialDate,
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
	const [startTime, setStartTime] = useQueryState('startTime', {
		defaultValue: '08:00',
		shallow: true,
	})
	const [endTime, setEndTime] = useQueryState('endTime', {
		defaultValue: '22:00',
		shallow: true,
	})
	const [calendarOpen, setCalendarOpen] = useState(false)
	const [selectedSlot, setSelectedSlot] = useState<ProcessedTimeSlot | null>(
		null,
	)
	const [showEventDialog, setShowEventDialog] = useState(false)

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

	const filteredSlots = processedSlots.filter((slot) => {
		const slotStart = slot.startTime
		const slotEnd = slot.endTime
		return slotStart >= startTime && slotEnd <= endTime
	})

	return (
		<div className='container p-0 mx-auto space-y-2 pt-2 pb-16 px-4'>
			<h2 className='text-2xl font-bold'>Gruppenslots</h2>
			<CardTitle className='text-xl md:text-2xl'>
				{currentDate.toLocaleDateString('de-DE', {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
				})}
			</CardTitle>
			<div className='grid gap-2'>
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
								weekStartsOn={1}
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div className='space-y-2'>
					<h3 className='font-bold text-lg md:text-xl'>Teilnehmer</h3>
					<div className='grid gap-4 grid-cols-2'>
						<UserCountInput
							label='Minimum'
							value={minUsers}
							onChange={(value) => {
								setMinUsers(value)
								refresh()
							}}
							min={1}
							max={10}
						/>
						<UserCountInput
							label='Maximum'
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
				<div className='space-y-2'>
					<h3 className='font-bold text-lg md:text-xl'>Zeitraum</h3>
					<div className='grid gap-4 grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='startTime' className='text-sm font-medium'>
								Von
							</Label>
							<TimeRangePicker
								startTime={startTime}
								onChangeAction={(start) => {
									setStartTime(start)
									refresh()
								}}
								minTime='08:00'
								maxTime='23:30'
								interval={30}
								singleTime={true}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='endTime' className='text-sm font-medium'>
								Bis
							</Label>
							<TimeRangePicker
								startTime={endTime}
								onChangeAction={(start) => {
									setEndTime(start)
									refresh()
								}}
								minTime='08:00'
								maxTime='23:30'
								interval={30}
								singleTime={true}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='pt-2'>
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

				<DrawerSlotDetails
					open={!!selectedSlot}
					onOpenChange={() => setSelectedSlot(null)}
					startTime={selectedSlot?.startTime ?? ''}
					endTime={selectedSlot?.endTime ?? ''}
					date={currentDate}
					availableUsers={selectedSlot?.availableUsers ?? []}
					maxUsers={maxUsers}
					onCreateEvent={() => {
						setShowEventDialog(true)
					}}
				/>

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

				<div className='bg-white/5 backdrop-blur-sm border-white/20 rounded-lg overflow-hidden mt-4'>
					<div className='relative'>
						<div className='flex border-b border-white/20 px-4 py-2'>
							<div className='w-5 flex-shrink-0' />
							<div className='flex-1 flex'>
								{Array.from({ length: 9 }, (_, i) =>
									String(8 + i * 2).padStart(2, '0'),
								).map((time) => (
									<div
										key={time}
										className='flex-1 text-xs text-white/80 text-center'
									>
										{time}
									</div>
								))}
							</div>
						</div>

						{filteredSlots.map((slot, index) => {
							const timeToPosition = (time: string): number => {
								const [hoursStr, minutesStr] = time.split(':')
								const hours = Number.parseInt(hoursStr || '0', 10)
								const minutes = Number.parseInt(minutesStr || '0', 10)
								const totalMinutes = hours * 60 + minutes
								const minutesSince8 = totalMinutes - 8 * 60
								const totalRangeMinutes = 16 * 60
								return (minutesSince8 / totalRangeMinutes) * 100
							}

							const startPos = timeToPosition(slot.startTime)
							const endPos = timeToPosition(slot.endTime)
							const width = endPos - startPos
							const availableCount = slot.availableUsers.length
							const percentage = (availableCount / maxUsers) * 100

							return (
								<div
									key={index}
									className='flex border-b border-white/20 px-2 py-1 relative'
								>
									<div className='w-6 flex-shrink-0 font-medium flex items-center border-r border-white/20'>
										<span className='text-slate-300 text-xs'>
											{availableCount}/{maxUsers}
										</span>
									</div>

									<div className='flex-1 relative h-8'>
										<div className='absolute inset-0 flex pointer-events-none'>
											{Array.from({ length: 8 }, (_, i) => (
												<div
													key={i}
													className={`flex-1 ${i > 0 ? 'border-l border-white/20' : ''} h-full`}
												/>
											))}
										</div>

										<button
											className={cn(
												'absolute cursor-pointer top-1 h-6 flex items-center justify-center px-2 rounded-md transition-colors',
												percentage < 50
													? 'bg-red-500/30'
													: percentage < 75
														? 'bg-orange-500/30'
														: 'bg-emerald-500/30',
											)}
											style={{
												left: `${startPos}%`,
												width: `${width}%`,
											}}
											onClick={() => {
												setSelectedSlot(slot)
											}}
											type='button'
										/>
									</div>
								</div>
							)
						})}
					</div>
				</div>

				{filteredSlots.length === 0 && (
					<div className='bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center p-4 mt-4'>
						<p className='text-white/50 text-xs md:text-sm'>
							Keine Zeitfenster verfügbar
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
