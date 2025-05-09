'use client'

import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { CardDescription, CardTitle } from '@/ui/card'
import type { TimeSlot } from '@prisma/client'
import { Clock, Plus } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { revalidateTagAction } from '../app/group/[groupId]/actions'
import { SimpleTimeSlotCreator } from '../app/group/[groupId]/availability/components/SimpleTimeSlotCreator'
import { TimelineView } from '../app/group/[groupId]/availability/components/TimeLineView'
import { getUTCDate } from '../app/group/[groupId]/availability/utils/getUTCDate'

interface DateSpecificEditorProps {
	initialDaySpecificSlots: Array<TimeSlot>
	groupId: string
}

export function DateSpecificEditor({
	initialDaySpecificSlots,
	groupId,
}: DateSpecificEditorProps) {
	const [showTimeSlotCreator, setShowTimeSlotCreator] = useState(false)
	const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
		null,
	)
	const [date, setDate] = useQueryState('selectedDate', {
		defaultValue: new Date().toISOString(),
	})

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (newDate) {
			const utcDate = getUTCDate(newDate)
			await setDate(utcDate.toISOString())
			await revalidateTagAction({
				tagId: 'myAvailability',
			})
			await revalidateTagAction({
				tagId: 'groupAvailability',
			})
		}
	}

	return (
		<>
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
					disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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

			{showTimeSlotCreator && (
				<SimpleTimeSlotCreator
					initialData={selectedTimeSlot ?? undefined}
					onCancelAction={() => {
						setShowTimeSlotCreator(false)
						setSelectedTimeSlot(null)
					}}
					groupId={groupId}
				/>
			)}
		</>
	)
}
