'use client'

import { cn } from '@/lib/utils/cn'
import { EventDialog } from '@/src/app/settings/groups/[groupId]/EventDialog'
import { DrawerSlotDetails } from '@/src/components/DrawerSlotDetails'
import { Calendar } from '@/ui/calendar'
import { Label } from '@/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
import { useQueryState } from 'nuqs'
import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { UserCountInput } from '../../../../../components/ui/UserCountInput'
import { revalidateGroupAction, revalidateTagAction } from '../../actions'
import type {
	ProcessedTimeSlot,
	TimeSlotDuration,
} from '../processAvailability'
import { getUTCDate } from '../utils/getUTCDate'
import { TimelineView } from './TimeLineView'
import { TimeRangePicker } from './TimeRangePicker'

interface GroupAvailabilityViewProps {
	date: Date
	processedSlots: ProcessedTimeSlot[]
	groupId: string
	monthlyAvailability: Map<number, number>
}

export function GroupAvailabilityView({
	date: initialDate,
	processedSlots,
	groupId,
	monthlyAvailability,
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

			const utcDate = getUTCDate(newDate)
			setDate(utcDate.toISOString())
			refresh()
		},
		[setDate, refresh],
	)

	const currentDate = date ? new Date(date) : initialDate

	return (
		<div className='container p-0 mx-auto space-y-2 pt-2 pb-16 px-4'>
			<h2 className='text-lg font-bold'>Gruppenslots</h2>
			<div className='grid gap-2'>
				<div>
					<div className='bg-white/5 rounded-xl p-4'>
						<Calendar
							id='date-picker'
							mode='single'
							selected={currentDate}
							onSelect={handleDateChange}
							className='mx-auto'
							weekStartsOn={1}
							disabled={(date) =>
								date < new Date(new Date().setHours(0, 0, 0, 0))
							}
							modifiers={{
								below50: (date: Date) => {
									const userCount = monthlyAvailability.get(date.getDate())
									if (!userCount) return false
									const percentage = (userCount / maxUsers) * 100
									return percentage < 50
								},
								below75: (date: Date) => {
									const userCount = monthlyAvailability.get(date.getDate())
									if (!userCount) return false
									const percentage = (userCount / maxUsers) * 100
									return percentage >= 50 && percentage < 90
								},
								hundred: (date: Date) => {
									const userCount = monthlyAvailability.get(date.getDate())
									if (!userCount) return false
									const percentage = (userCount / maxUsers) * 100
									return percentage >= 90
								},
							}}
							modifiersClassNames={{
								below50:
									'relative after:content-[""] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-red-500',
								below75:
									'relative after:content-[""] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-yellow-500',
								hundred:
									'relative after:content-[""] after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-green-500',
							}}
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<h3 className='font-bold'>Teilnehmer</h3>
					<div className='grid gap-4 grid-cols-2'>
						<UserCountInput
							label='Min'
							value={minUsers}
							onChange={(value) => {
								setMinUsers(value)
								refresh()
							}}
							min={1}
							max={10}
						/>
						<UserCountInput
							label='Max'
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
					<h3 className='font-bold'>Zeitraum</h3>
					<div className='grid gap-4 grid-cols-2'>
						<div>
							<Label htmlFor='startTime' className='text-xs font-medium'>
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
						<div>
							<Label htmlFor='endTime' className='text-xs font-medium'>
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

				<div className={cn('pt-2')}>
					<TimelineView
						slots={processedSlots}
						maxUsers={maxUsers}
						onSlotClick={(slot) => setSelectedSlot(slot as ProcessedTimeSlot)}
					/>
				</div>
			</div>
		</div>
	)
}
