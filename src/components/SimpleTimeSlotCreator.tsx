import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Label } from '@/ui/label'
import type { TimeSlot } from '@prisma/client'
import { X } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from '../app/group/[groupId]/availability/actions'
import { TimeRangePicker } from './TimeRangePicker'

interface SimpleTimeSlotCreatorProps {
	initialData?: Partial<TimeSlot>
	onCancelAction: () => void
	groupId: string
}

export function SimpleTimeSlotCreator({
	initialData,
	groupId,
	onCancelAction,
}: SimpleTimeSlotCreatorProps) {
	const [slot, setSlot] = useState<{
		startTime: string
		endTime: string
	}>({
		startTime: initialData?.startTime || '09:00',
		endTime: initialData?.endTime || '10:00',
	})

	const [isGlobal, setIsGlobal] = useState(true)

	const [date] = useQueryState('selectedDate')

	const handleTimeChange = (start: string, end?: string) => {
		setSlot((prev) => ({
			...prev,
			startTime: start,
			endTime: end || start,
		}))
	}

	const handleSave = () => {
		if (!slot.startTime || !slot.endTime) return

		if (!date) return

		updateTimeSlot({
			id: initialData?.id ?? '',
			startTime: slot.startTime,
			endTime: slot.endTime,
			type: 'DATE_SPECIFIC',
			date: new Date(date),
			groupId,
			isGlobalSlot: isGlobal,
		})

		onCancelAction()
	}

	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)

	const handleDeleteTimeSlot = async () => {
		if (initialData?.id) {
			deleteTimeSlot({ id: initialData.id })
			onCancelAction()
		}
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

					<div className='flex items-center space-x-2'>
						<Checkbox
							id='isGlobalSlot'
							checked={isGlobal}
							onCheckedChange={(checked) => {
								setIsGlobal(checked === true)
							}}
						/>
						<Label htmlFor='isGlobalSlot'>
							Für alle meine Gruppen anwenden
						</Label>
					</div>

					<div className='flex gap-2 pt-2'>
						{initialData?.id && (
							<Button onClick={handleDeleteTimeSlot} variant='destructive'>
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
