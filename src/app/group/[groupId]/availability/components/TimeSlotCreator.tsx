'use client'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'
import { useTour } from '@reactour/tour'
import { X } from 'lucide-react'
import { useState } from 'react'
import { TimeRangePicker } from './TimeRangePicker'

type Day = {
	id: string
	name: string
	fullName: string
}

type TimeSlot = {
	id?: string
	start: string
	end: string
	days: string[]
	isGlobalSlot: boolean
	weekNumber?: 1 | 2
}

interface TimeSlotCreatorProps {
	selectedDay?: number
	selectedWeek?: 1 | 2
	isBiWeeklyMode?: boolean
	days: Day[]
	initialData?: TimeSlot
	onSaveAction: (slot: TimeSlot) => void
	onCancelAction: () => void
	onDeleteAction?: () => void
}

export function TimeSlotCreator({
	selectedDay,
	selectedWeek,
	isBiWeeklyMode = false,
	days,
	initialData,
	onSaveAction,
	onCancelAction,
	onDeleteAction,
}: TimeSlotCreatorProps) {
	const [slot, setSlot] = useState<TimeSlot>({
		id: initialData?.id,
		start: initialData?.start || '09:00',
		end: initialData?.end || '10:00',
		days:
			(initialData?.days ?? selectedDay)
				? [(selectedDay ?? '').toString()]
				: [],
		isGlobalSlot: initialData?.isGlobalSlot || true,
		weekNumber: isBiWeeklyMode
			? initialData?.weekNumber || selectedWeek || 1
			: 1, // Always default to week 1, even in non-bi-weekly mode
	})

	const { setCurrentStep } = useTour()

	const handleTimeChange = (start: string, end: string) => {
		setSlot((prev) => ({ ...prev, start, end }))
	}

	const toggleDay = (dayId: string) => {
		setSlot((prev) => ({
			...prev,
			days: prev.days.includes(dayId)
				? prev.days.filter((id) => id !== dayId)
				: [...prev.days, dayId],
		}))
		setCurrentStep((prev) => prev + 1)
	}

	const selectWeekdays = () => {
		setSlot((prev) => ({
			...prev,
			days: ['1', '2', '3', '4', '5'],
		}))
		setCurrentStep((prev) => prev + 1)
	}

	const selectWeekend = () => {
		setSlot((prev) => ({
			...prev,
			days: ['0', '6'],
		}))
		setCurrentStep((prev) => prev + 1)
	}

	const selectAll = () => {
		setSlot((prev) => ({
			...prev,
			days: days.map((day) => day.id),
		}))
		setCurrentStep((prev) => prev + 1)
	}

	const clearAll = () => {
		setSlot((prev) => ({
			...prev,
			days: [],
		}))
	}

	const handleSave = () => {
		if (slot.days.length === 0) {
			return
		}
		onSaveAction(slot)
		setCurrentStep((prev) => prev + 1)
	}

	return (
		<div className='fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4'>
			<div className='bg-slate-800 rounded-lg w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-auto'>
				<div className='p-3 sm:p-4 border-b border-slate-700 flex items-center justify-between'>
					<h2 className='font-medium text-base sm:text-lg'>
						{initialData ? 'Zeitfenster bearbeiten' : 'Neues Zeitfenster'}
					</h2>
					<button
						type='button'
						onClick={onCancelAction}
						className='text-slate-400 hover:text-white touch-manipulation'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				<div className='p-3 sm:p-4 space-y-3 sm:space-y-2'>
					<div className='space-y-2'>
						<div id='time-range'>
							<TimeRangePicker
								startTime={slot.start}
								endTime={slot.end}
								onChangeAction={(start, end) =>
									handleTimeChange(start, end ?? '')
								}
								showPresets
							/>
						</div>
					</div>

					{isBiWeeklyMode && (
						<div className='space-y-2'>
							<Label
								htmlFor='week-selection'
								className='text-xs sm:text-sm font-medium'
							>
								Woche auswählen
							</Label>
							<div id='week-selection' className='grid grid-cols-2 gap-2'>
								<Button
									size='sm'
									variant={slot.weekNumber === 1 ? 'default' : 'outline'}
									onClick={() =>
										setSlot((prev) => ({ ...prev, weekNumber: 1 }))
									}
									className={`text-xs sm:text-sm touch-manipulation ${
										slot.weekNumber === 1
											? 'bg-purple-600 hover:bg-purple-700'
											: 'bg-slate-700 border-slate-600 hover:bg-slate-600'
									}`}
								>
									Woche 1
								</Button>
								<Button
									size='sm'
									variant={slot.weekNumber === 2 ? 'default' : 'outline'}
									onClick={() =>
										setSlot((prev) => ({ ...prev, weekNumber: 2 }))
									}
									className={`text-xs sm:text-sm touch-manipulation ${
										slot.weekNumber === 2
											? 'bg-purple-600 hover:bg-purple-700'
											: 'bg-slate-700 border-slate-600 hover:bg-slate-600'
									}`}
								>
									Woche 2
								</Button>
							</div>
						</div>
					)}

					<div className='space-y-2' data-tour='quick-select'>
						<Label
							htmlFor='quick-select'
							className='text-xs sm:text-sm font-medium'
						>
							Schnellauswahl
						</Label>
						<div id='quick-select' className='grid grid-cols-2 gap-2'>
							<Button
								size='sm'
								variant='outline'
								onClick={selectWeekdays}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs sm:text-sm touch-manipulation'
							>
								Wochentage
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={selectWeekend}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs sm:text-sm touch-manipulation'
							>
								Wochenende
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={selectAll}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs sm:text-sm touch-manipulation'
							>
								Alle Tage
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={clearAll}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs sm:text-sm touch-manipulation'
							>
								Zurücksetzen
							</Button>
						</div>
					</div>

					<div className='space-y-2' data-tour='day-selection'>
						<Label
							htmlFor='day-selection'
							className='text-xs sm:text-sm font-medium'
						>
							Tage auswählen
						</Label>
						<div
							id='day-selection'
							className='grid grid-cols-1 sm:grid-cols-2 gap-2'
						>
							{days.map((day) => (
								<div
									key={day.id}
									className='flex items-center space-x-2 touch-manipulation'
								>
									<Checkbox
										id={`day-${day.id}`}
										checked={slot.days.includes(day.id)}
										onCheckedChange={() => toggleDay(day.id)}
									/>
									<Label
										htmlFor={`day-${day.id}`}
										className='text-xs sm:text-sm font-normal'
									>
										{day.fullName}
									</Label>
								</div>
							))}
						</div>
					</div>

					<div className='flex items-center space-x-2 mt-3 sm:mt-4 touch-manipulation'>
						<Checkbox
							id='isGlobalSlot'
							checked={slot.isGlobalSlot}
							onCheckedChange={(checked) =>
								setSlot((prev) => ({ ...prev, isGlobalSlot: checked === true }))
							}
						/>
						<Label htmlFor='isGlobalSlot' className='text-xs sm:text-sm'>
							Für alle meine Gruppen anwenden
						</Label>
					</div>

					<div className='flex flex-col sm:flex-row gap-2 pt-3 sm:pt-2'>
						{initialData && onDeleteAction && (
							<Button
								onClick={onDeleteAction}
								variant='destructive'
								className='text-sm sm:text-base touch-manipulation'
							>
								Löschen
							</Button>
						)}
						<Button
							onClick={onCancelAction}
							variant='outline'
							className='text-sm sm:text-base touch-manipulation'
						>
							Abbrechen
						</Button>
						<Button
							onClick={handleSave}
							variant='purple'
							disabled={slot.days.length === 0}
							data-tour='save-time-slot'
							className='text-sm sm:text-base touch-manipulation'
						>
							Speichern
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
