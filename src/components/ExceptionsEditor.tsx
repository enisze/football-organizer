import {
	copyTimeSlotToAllGroupsAction,
	updateExceptionSlotsAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { CardDescription, CardTitle } from '@/ui/card'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'
import type { TimeSlot } from '@prisma/client'
import { Clock, Save } from 'lucide-react'
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
	const [currentMonth, setCurrentMonth] = useState(new Date())
	const [isGlobalSlot, setIsGlobalSlot] = useState(false)

	// Find initial exception dates
	const exceptionDates = exceptionSlots.map((slot) => slot.date as Date)
	const [selectedDates, setSelectedDates] = useState<Date[]>(exceptionDates)
	const { execute: copyToAllGroups } = useAction(copyTimeSlotToAllGroupsAction)

	const handleSelect = (days: Date[] | undefined) => {
		if (!days) return
		setSelectedDates(days)
	}

	const handleSaveChanges = async () => {
		const dateOperations: DateOperation[] = []

		// Find dates to add
		for (const date of selectedDates) {
			if (
				!exceptionDates.find(
					(exDate) =>
						exDate.toISOString().split('T')[0] ===
						date.toISOString().split('T')[0],
				)
			) {
				dateOperations.push({ date, operation: 'add' })
			}
		}

		// Find dates to remove
		for (const date of exceptionDates) {
			if (
				!selectedDates.find(
					(selDate) =>
						selDate.toISOString().split('T')[0] ===
						date.toISOString().split('T')[0],
				)
			) {
				dateOperations.push({ date, operation: 'remove' })
			}
		}

		if (dateOperations.length > 0) {
			updateExceptionSlots({
				dates: dateOperations,
				groupId,
				areGlobalExceptions: isGlobalSlot,
			})
		}
	}

	const handleCopyToAllGroups = async () => {
		for (const date of selectedDates) {
			const slot = exceptionSlots.find(
				(slot) =>
					slot.date?.toISOString().split('T')[0] ===
					date.toISOString().split('T')[0],
			)
			if (slot?.id) {
				copyToAllGroups({ timeSlotId: slot.id })
			}
		}
	}

	const hasChanges =
		selectedDates.length !== exceptionDates.length ||
		selectedDates.some(
			(date) =>
				!exceptionDates.find(
					(exDate) =>
						exDate.toISOString().split('T')[0] ===
						date.toISOString().split('T')[0],
				),
		)

	const newExceptionsCount = selectedDates.filter(
		(date) =>
			!exceptionDates.find(
				(exDate) =>
					exDate.toISOString().split('T')[0] ===
					date.toISOString().split('T')[0],
			),
	).length

	const deselectedDates = exceptionDates.filter(
		(date) =>
			!selectedDates.find(
				(selDate) =>
					selDate.toISOString().split('T')[0] ===
					date.toISOString().split('T')[0],
			),
	)

	const removedExceptionsCount = deselectedDates.length

	const hasExistingSlots = selectedDates.length > 0

	return (
		<div className='flex flex-col gap-2 px-4'>
			<CardTitle className='flex text-lg items-center gap-2'>
				<Clock className='h-6 w-6' />
				<span className=''>Ausnahmetage verwalten</span>
			</CardTitle>
			<CardDescription className='text-slate-400'>
				Wähle Tage aus, an denen du nicht verfügbar bist.
			</CardDescription>
			<div className='bg-white/5 rounded-lg p-4 flex flex-col gap-4'>
				<Calendar
					mode='multiple'
					selected={selectedDates}
					onSelect={handleSelect}
					defaultMonth={currentMonth}
					onMonthChange={setCurrentMonth}
					weekStartsOn={1}
					modifiersStyles={{
						selected: {
							backgroundColor: 'rgb(127 29 29 / 0.7)',
							color: 'rgb(254 202 202)',
						},
						deselected: {
							backgroundColor: 'rgb(22 163 74 / 0.7)',
							color: 'rgb(187 247 208)',
						},
					}}
					modifiers={{
						selected: selectedDates,
						deselected: deselectedDates,
					}}
				/>

				<div className='flex items-center space-x-2'>
					<Checkbox
						id='isGlobalSlot'
						checked={isGlobalSlot}
						onCheckedChange={(checked) => setIsGlobalSlot(checked === true)}
					/>
					<Label htmlFor='isGlobalSlot'>Für alle meine Gruppen nutzen</Label>
				</div>
			</div>

			<div className='bg-white/5 rounded-lg p-4 flex items-center justify-between'>
				<div className='flex gap-1 text-xs'>
					{hasChanges ? (
						<>
							<span className=''>Ausnahmen:</span>
							{newExceptionsCount > 0 && (
								<span className='text-red-400 font-medium'>
									{newExceptionsCount} neue
								</span>
							)}
							{newExceptionsCount > 0 && removedExceptionsCount > 0 && (
								<span className=''>•</span>
							)}
							{removedExceptionsCount > 0 && (
								<span className='text-green-400 font-medium'>
									{removedExceptionsCount} entfernt
								</span>
							)}
						</>
					) : (
						<span className='text-slate-400'>Keine Änderungen</span>
					)}
				</div>
				<div className='flex items-center gap-3'>
					{newExceptionsCount > 0 && (
						<div className='flex items-center gap-1'>
							<div className='w-3 h-3 rounded-full bg-red-500' />
							<span className='text-sm text-slate-300'>
								{newExceptionsCount}
							</span>
						</div>
					)}
					{removedExceptionsCount > 0 && (
						<div className='flex items-center gap-1'>
							<div className='w-3 h-3 rounded-full bg-green-500' />
							<span className='text-sm text-slate-300'>
								{removedExceptionsCount}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<Button
					onClick={handleSaveChanges}
					disabled={!hasChanges}
					className='ml-auto w-full max-w-xs flex items-center justify-center gap-2'
				>
					<Save className='h-5 w-5' />
					<span>Änderungen speichern</span>
				</Button>
			</div>
		</div>
	)
}
