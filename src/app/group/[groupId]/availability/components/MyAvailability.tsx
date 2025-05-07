'use client'

import { ExceptionsEditor } from '@/src/components/ExceptionsEditor'
import { SimpleTimeSlotCreator } from '@/src/components/SimpleTimeSlotCreator'
import { TimelineView } from '@/src/components/TimeLineView'
import { WeeklyAvailabilityEditor } from '@/src/components/WeeklyAvailabilityEditor'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { CardDescription, CardTitle } from '@/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import type { TimeSlot } from '@prisma/client'
import { useTour } from '@reactour/tour'
import { Clock, Plus } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { groupBy } from 'remeda'
import { revalidateTagAction } from '../../actions'
import { deleteTimeSlotAction, updateTimeSlotAction } from '../actions'

interface MyAvailabilityProps {
	groupId: string
	initialDaySpecificSlots: Array<TimeSlot>
	initialWeeklySlots: Array<TimeSlot>
	exceptionSlots: Array<TimeSlot>
	tab: string
}

export function MyAvailability({
	groupId,
	initialDaySpecificSlots,
	initialWeeklySlots,
	exceptionSlots,
	tab,
}: MyAvailabilityProps) {
	const [date, setDate] = useQueryState('selectedDate', {
		defaultValue: new Date().toISOString(),
	})

	const [selectedTab, setSelectedTab] = useQueryState('tab', {
		defaultValue: tab,
	})

	const [showTimeSlotCreator, setShowTimeSlotCreator] = useState(false)
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
		null,
	)

	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (newDate) {
			await setDate(newDate.toISOString())
			await revalidateTagAction({
				tagId: 'myAvailability',
			})
			await revalidateTagAction({
				tagId: 'groupAvailability',
			})
		}
	}

	const handleSaveTimeSlot = async (slot: {
		startTime: string
		endTime: string
	}) => {
		if (!date) return

		updateTimeSlot({
			id: selectedTimeSlot?.id ?? '',
			startTime: slot.startTime,
			endTime: slot.endTime,
			type: 'DATE_SPECIFIC',
			date: new Date(date),
			groupId,
		})

		setShowTimeSlotCreator(false)
		setSelectedTimeSlot(null)
	}

	const handleDeleteTimeSlot = async () => {
		if (selectedTimeSlot?.id) {
			deleteTimeSlot({ id: selectedTimeSlot.id })
			setShowTimeSlotCreator(false)
			setSelectedTimeSlot(null)
		}
	}

	const weeklySlotsByDay = groupBy(
		initialWeeklySlots.filter(
			(slot): slot is TimeSlot & { day: number } => slot.day !== null,
		),
		(slot) => slot.day,
	)

	const { setCurrentStep } = useTour()

	return (
		<div className='container px-4 mx-auto space-y-8 pt-2'>
			<Tabs
				defaultValue={selectedTab}
				onValueChange={setSelectedTab}
				className='w-full flex flex-col'
			>
				<TabsList className='inline-flex rounded-xl bg-white/5 p-1 self-center'>
					<TabsTrigger
						value='date'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='date'
					>
						Täglich
					</TabsTrigger>
					<TabsTrigger
						value='weekly'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='weekly'
						onClick={() => {
							setCurrentStep((prev) => prev + 1)
						}}
					>
						Wöchentlich
					</TabsTrigger>
					<TabsTrigger
						value='exception'
						className='px-4 py-2 rounded-lg transition-colors data-[state=active]:bg-white/10 hover:bg-white/5'
						data-tour='exception'
					>
						Ausnahmen
					</TabsTrigger>
				</TabsList>

				<TabsContent value='weekly' className='space-y-4'>
					<WeeklyAvailabilityEditor
						timeSlots={weeklySlotsByDay}
						groupId={groupId}
					/>
				</TabsContent>

				<TabsContent value='exception' className='space-y-4'>
					<ExceptionsEditor groupId={groupId} exceptionSlots={exceptionSlots} />
				</TabsContent>

				<TabsContent value='date' className='space-y-2 pb-20'>
					<CardTitle className='flex text-lg items-center gap-2'>
						<Clock className='h-6 w-6 flex-none' />
						Datumsspezifische Verfügbarkeit
					</CardTitle>
					<CardDescription className='text-white/70'>
						Lege deine Verfügbarkeit für bestimmte Tage fest
					</CardDescription>
					<div className='bg-white/5 rounded-xl p-4'>
						<Calendar
							mode='single'
							selected={date ? new Date(date) : undefined}
							onSelect={handleDateSelect}
							className='mx-auto'
							weekStartsOn={1}
						/>
					</div>

					{date ? (
						<div className='flex flex-col gap-2'>
							<h3 className='text-lg font-medium'>
								{new Date(date).toLocaleDateString('de-DE', {
									weekday: 'long',
									month: 'long',
									day: 'numeric',
								})}
							</h3>

							<TimelineView
								slots={initialDaySpecificSlots ?? []}
								onSlotClick={(slot) => {
									setSelectedTimeSlot(slot as TimeSlot)
									setShowTimeSlotCreator(true)
								}}
								singleLine
							/>
							<Button
								variant='purple'
								size='sm'
								onClick={() => setShowTimeSlotCreator(true)}
							>
								<Plus className='h-4 w-4 mr-1.5' />
								Neues Zeitfenster
							</Button>
						</div>
					) : (
						<div className='flex items-center justify-center text-white/70'>
							Wähle ein Datum aus, um die spezifische Verfügbarkeit festzulegen
						</div>
					)}
				</TabsContent>
			</Tabs>

			{showTimeSlotCreator && (
				<SimpleTimeSlotCreator
					initialData={selectedTimeSlot ?? undefined}
					onSaveAction={handleSaveTimeSlot}
					onCancelAction={() => {
						setShowTimeSlotCreator(false)
						setSelectedTimeSlot(null)
					}}
					onDeleteAction={selectedTimeSlot ? handleDeleteTimeSlot : undefined}
				/>
			)}
		</div>
	)
}
