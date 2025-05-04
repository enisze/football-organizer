'use client'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'
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
}

interface TimeSlotCreatorProps {
	days: Day[]
	initialData?: TimeSlot
	onSaveAction: (slot: TimeSlot) => void
	onCancelAction: () => void
	onDeleteAction?: () => void
}

export function TimeSlotCreator({
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
		days: initialData?.days || [],
	})

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
	}

	const selectWeekdays = () => {
		setSlot((prev) => ({
			...prev,
			days: ['1', '2', '3', '4', '5'],
		}))
	}

	const selectWeekend = () => {
		setSlot((prev) => ({
			...prev,
			days: ['0', '6'],
		}))
	}

	const selectAll = () => {
		setSlot((prev) => ({
			...prev,
			days: days.map((day) => day.id),
		}))
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
	}

	return (
		<div className='fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4'>
			<div className='bg-slate-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-auto'>
				<div className='p-4 border-b border-slate-700 flex items-center justify-between'>
					<h2 className='font-medium text-lg'>
						{initialData ? 'Zeitfenster bearbeiten' : 'Neues Zeitfenster'}
					</h2>
					<button
						type='button'
						onClick={onCancelAction}
						className='text-slate-400 hover:text-white'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				<div className='p-4 space-y-2'>
					<div className='space-y-2'>
						<div id='time-range'>
							<TimeRangePicker
								startTime={slot.start}
								endTime={slot.end}
								onChangeAction={handleTimeChange}
							/>
						</div>
					</div>

					<div className='space-y-2' data-tour='quick-select'>
						<Label htmlFor='quick-select' className='text-sm font-medium'>
							Schnellauswahl
						</Label>
						<div id='quick-select' className='grid grid-cols-2 gap-2'>
							<Button
								size='sm'
								variant='outline'
								onClick={selectWeekdays}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600'
							>
								Wochentage
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={selectWeekend}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600'
							>
								Wochenende
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={selectAll}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600'
							>
								Alle Tage
							</Button>
							<Button
								size='sm'
								variant='outline'
								onClick={clearAll}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600'
							>
								Zurücksetzen
							</Button>
						</div>
					</div>

					<div className='space-y-2' data-tour='day-selection'>
						<Label htmlFor='day-selection' className='text-sm font-medium'>
							Tage auswählen
						</Label>
						<div id='day-selection' className='grid grid-cols-2 gap-1'>
							{days.map((day) => (
								<div key={day.id} className='flex items-center space-x-2'>
									<Checkbox
										id={`day-${day.id}`}
										checked={slot.days.includes(day.id)}
										onCheckedChange={() => toggleDay(day.id)}
									/>
									<Label
										htmlFor={`day-${day.id}`}
										className='text-sm font-normal'
									>
										{day.fullName}
									</Label>
								</div>
							))}
						</div>
					</div>

					<div className='flex gap-2 pt-2'>
						{initialData && onDeleteAction && (
							<Button onClick={onDeleteAction} variant='destructive'>
								Löschen
							</Button>
						)}
						<Button onClick={onCancelAction} variant='outline'>
							Abbrechen
						</Button>
						<Button
							onClick={handleSave}
							variant='purple'
							disabled={slot.days.length === 0}
							data-tour='save-time-slot'
						>
							Speichern
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
