import { Button } from '@/ui/button'
import type { TimeSlot } from '@prisma/client'
import { X } from 'lucide-react'
import { useState } from 'react'
import { TimeRangePicker } from './TimeRangePicker'

interface SimpleTimeSlotCreatorProps {
	initialData?: Partial<TimeSlot>
	onSaveAction: (slot: { startTime: string; endTime: string }) => void
	onCancelAction: () => void
	onDeleteAction?: () => void
}

export function SimpleTimeSlotCreator({
	initialData,
	onSaveAction,
	onCancelAction,
	onDeleteAction,
}: SimpleTimeSlotCreatorProps) {
	const [slot, setSlot] = useState<{ startTime: string; endTime: string }>({
		startTime: initialData?.startTime || '09:00',
		endTime: initialData?.endTime || '10:00',
	})

	const handleTimeChange = (start: string, end?: string) => {
		setSlot({ startTime: start, endTime: end || start })
	}

	const handleSave = () => {
		if (!slot.startTime || !slot.endTime) return
		onSaveAction(slot)
	}

	const handleQuickSelect = (start: string, end: string) => {
		setSlot({ startTime: start, endTime: end })
	}

	return (
		<div className='fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4'>
			<div className='bg-slate-800 rounded-lg w-full max-w-md'>
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

				<div className='p-4 space-y-4'>
					<div className='space-y-2'>
						<TimeRangePicker
							startTime={slot.startTime}
							endTime={slot.endTime}
							onChangeAction={handleTimeChange}
							minTime='08:00'
							maxTime='23:00'
							interval={30}
							showPresets
						/>
					</div>

					<div className='flex gap-2 pt-2'>
						{initialData?.id && onDeleteAction && (
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
							disabled={!slot.startTime || !slot.endTime}
						>
							Speichern
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
