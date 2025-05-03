import { updateExceptionSlotsAction } from '@/src/app/group/[groupId]/availability/actions'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card'
import type { TimeSlot } from '@prisma/client'
import { CalendarIcon, Clock } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

interface ExceptionsEditorProps {
	groupId: string
	exceptionSlots: TimeSlot[]
}

type DateOperation = {
	date: Date
	operation: 'add' | 'remove'
}

export function ExceptionsEditor({
	groupId,
	exceptionSlots,
}: ExceptionsEditorProps) {
	const { execute: updateExceptionSlots } = useAction(
		updateExceptionSlotsAction,
	)

	// Find initial exception dates
	const exceptionDates = exceptionSlots.map((slot) => slot.date as Date)

	const [selectedDates, setSelectedDates] = useState<Date[]>(exceptionDates)

	const handleSaveChanges = async () => {
		// Calculate which dates to add and which to remove
		const dateOperations: DateOperation[] = []

		// Find dates to add (in selectedDates but not in exceptionDates)
		for (const date of selectedDates) {
			if (
				!exceptionDates.find(
					(exDate) => exDate.toISOString() === date.toISOString(),
				)
			) {
				dateOperations.push({ date, operation: 'add' })
			}
		}

		// Find dates to remove (in exceptionDates but not in selectedDates)
		for (const date of exceptionDates) {
			if (
				!selectedDates.find(
					(selDate) => selDate.toISOString() === date.toISOString(),
				)
			) {
				dateOperations.push({ date, operation: 'remove' })
			}
		}

		if (dateOperations.length > 0) {
			updateExceptionSlots({
				dates: dateOperations,
				groupId,
			})
		}
	}

	const hasChanges =
		selectedDates.length !== exceptionDates.length ||
		selectedDates.some(
			(date) =>
				!exceptionDates.find(
					(exDate) => exDate.toISOString() === date.toISOString(),
				),
		)

	// Calculate added and removed exceptions
	const addedDates = selectedDates.filter(
		(date) =>
			!exceptionDates.find(
				(exDate) => exDate.toISOString() === date.toISOString(),
			),
	)
	const removedDates = exceptionDates.filter(
		(date) =>
			!selectedDates.find(
				(selDate) => selDate.toISOString() === date.toISOString(),
			),
	)

	return (
		<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
			<CardHeader>
				<CardTitle className='text-lg flex items-center gap-2'>
					<Clock className='h-4 w-4 flex-none' />
					Ausnahmetage verwalten
				</CardTitle>
				<CardDescription className='text-white/70 '>
					Wähle Tage aus, an denen du nicht verfügbar bist.{' '}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-4'>
					<Calendar
						mode='multiple'
						selected={selectedDates}
						onSelect={(dates) =>
							dates ? setSelectedDates(dates) : setSelectedDates([])
						}
						className='rounded-md bg-white/5 p-3'
						modifiersStyles={{
							selected: {
								backgroundColor: 'rgba(239, 68, 68, 0.1)',
								color: 'rgb(239, 68, 68)',
								borderColor: 'rgba(239, 68, 68, 0.2)',
								textDecoration: 'line-through',
							},
						}}
					/>
					<Card className='bg-white/5 backdrop-blur-sm border-white/10'>
						<CardContent className='py-3'>
							<div className='flex items-center gap-2'>
								{addedDates.length > 0 && (
									<span className='text-green-500'>
										{addedDates.length}{' '}
										{addedDates.length === 1 ? 'neue' : 'neue'}
									</span>
								)}
								{addedDates.length > 0 && removedDates.length > 0 && ', '}
								{removedDates.length > 0 && (
									<span className='text-red-500'>
										{removedDates.length}{' '}
										{removedDates.length === 1 ? 'gelöschte' : 'gelöschte'}
									</span>
								)}{' '}
								{hasChanges ? (
									<>
										{addedDates.length + removedDates.length > 1
											? 'Ausnahmen'
											: 'Ausnahme'}
									</>
								) : (
									<span>Keine Änderungen</span>
								)}
							</div>
						</CardContent>
					</Card>
					<Button
						onClick={handleSaveChanges}
						disabled={!hasChanges}
						className='w-fit'
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						Änderungen speichern
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
