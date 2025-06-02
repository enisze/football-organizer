'use client'

import { cn } from '@/lib/utils/cn'
import { EventDialog } from '@/src/app/settings/groups/[groupId]/EventDialog'
import { DrawerSlotDetails } from '@/src/components/DrawerSlotDetails'
import { Label } from '@/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs'
import { atom, useAtomValue } from 'jotai'
import { useAction } from 'next-safe-action/hooks'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { UserCountInput } from '../../../../../components/ui/UserCountInput'
import { revalidateTagNextAction } from '../../actions'
import type {
	ProcessedTimeSlot,
	TimeSlotDuration,
} from '../processAvailability'
import { TimeLineLoading } from './TimeLineLoading'
import { TimelineView } from './TimeLineView'
import { TimeRangePicker } from './TimeRangePicker'

interface GroupAvailabilityViewProps {
	processedSlots: ProcessedTimeSlot[]
}

export const loadingAvailabilityAtom = atom(false)

export function GroupAvailabilityView({
	processedSlots,
}: GroupAvailabilityViewProps) {
	const [date] = useQueryState('date', {
		shallow: true,
	})
	const [duration, setDuration] = useQueryState('duration', {
		parse: (value) => value as TimeSlotDuration,
		shallow: true,
	})
	const [minUsers, setMinUsers] = useQueryState('minUsers', {
		defaultValue: 1,
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

	const loadingAvailability = useAtomValue(loadingAvailabilityAtom)

	const { execute: revalidateT, isPending: isLoadingT } = useAction(
		revalidateTagNextAction,
	)

	const refresh = useDebouncedCallback(() => {
		revalidateT({ tagId: 'groupAvailability' })
	}, 300)

	const currentDate = date ? new Date(date) : undefined

	return (
		<>
			<div className='grid gap-2'>
				<h3 className='font-bold'>
					{date &&
						new Date(date).toLocaleDateString('de', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
				</h3>
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
							max={maxUsers}
						/>
						<UserCountInput
							label='Max'
							value={maxUsers}
							onChange={(value) => {
								setMaxUsers(value)
								refresh()
							}}
							min={1}
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
					date={currentDate ?? new Date()}
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
					{isLoadingT || loadingAvailability ? (
						<TimeLineLoading />
					) : (
						<TimelineView
							slots={processedSlots}
							maxUsers={maxUsers}
							onSlotClick={(slot) => setSelectedSlot(slot as ProcessedTimeSlot)}
						/>
					)}
				</div>
			</div>
		</>
	)
}
