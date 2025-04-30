'use client'

import {
	deleteTimeSlotAction,
	updateTimeSlotAction,
} from '@/src/app/group/[groupId]/availability/actions'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import { Switch } from '@/ui/switch'
import type { TimeSlot, TimeSlotType } from '@prisma/client'
import { useTour } from '@reactour/tour'
import { Plus, X } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useCallback, useMemo, useState } from 'react'
import { revalidateTagAction } from '../app/group/[groupId]/actions'

interface AvailabilityEditorProps {
	date?: Date
	day?: number
	timeSlots: TimeSlot[]
	groupId: string
	type: TimeSlotType
	allowExceptions?: boolean
}

interface TimeRange {
	startTime: string
	endTime: string
}

const generateTimeOptions = (isWeekend: boolean) => {
	const slots = []
	const startHour = isWeekend ? 10 : 18
	const endHour = 23

	for (let hour = startHour; hour <= endHour; hour++) {
		for (const minute of [0, 30]) {
			const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
			slots.push(time)
		}
	}

	return slots
}

export function AvailabilityEditor({
	date,
	day,
	type,
	timeSlots,
	groupId,
	allowExceptions = false,
}: AvailabilityEditorProps) {
	const { execute: updateTimeSlot } = useAction(updateTimeSlotAction)
	const { execute: deleteTimeSlot } = useAction(deleteTimeSlotAction)
	const [isAdding, setIsAdding] = useState(false)
	const [newSlot, setNewSlot] = useState<Partial<TimeRange>>({})

	const isWeekend =
		type === 'WEEKEND' || (type === 'DAY_SPECIFIC' && (day === 6 || day === 0))
	const timeOptions = useMemo(
		() =>
			generateTimeOptions(
				isWeekend || type === 'DAY_SPECIFIC' || type === 'DATE_SPECIFIC',
			),
		[isWeekend, type],
	)

	const { setCurrentStep } = useTour()

	// If allowExceptions is true, check if there is an exception slot
	const exceptionSlot = allowExceptions
		? timeSlots.find((slot) => slot.isException)
		: undefined

	const handleAddException = useCallback(() => {
		updateTimeSlot({
			startTime: '00:00',
			endTime: '23:59',
			type,
			date: type === 'DATE_SPECIFIC' ? date : undefined,
			day: type === 'DAY_SPECIFIC' ? day : undefined,
			groupId,
			isException: true,
		})
	}, [type, date, day, groupId, updateTimeSlot])

	const handleAddSlot = useCallback(async () => {
		if (!newSlot.startTime || !newSlot.endTime) return

		updateTimeSlot({
			startTime: newSlot.startTime,
			endTime: newSlot.endTime,
			type,
			date: type === 'DATE_SPECIFIC' ? date : undefined,
			day: type === 'DAY_SPECIFIC' ? day : undefined,
			groupId,
		})

		setCurrentStep((prev) => prev + 1)

		setNewSlot({})
		setIsAdding(false)
		await revalidateTagAction({
			tagId: 'myAvailability',
		})
	}, [newSlot, type, date, day, groupId, updateTimeSlot, setCurrentStep])

	return (
		<div>
			{allowExceptions && (
				<div className='flex items-center gap-3 mb-2'>
					<Switch
						onCheckedChange={(checked) => {
							if (exceptionSlot && !checked) {
								deleteTimeSlot({ id: exceptionSlot.id })
							} else {
								handleAddException()
							}
						}}
						id='exception-switch'
					/>
					<label htmlFor='exception-switch' className='text-white/80 text-sm'>
						Tag als komplett nicht verfügbar markieren
					</label>
				</div>
			)}
			{allowExceptions && exceptionSlot ? (
				<div className='text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
					Du bist an diesem Tag <b>nicht verfügbar</b>.
				</div>
			) : (
				<div className='select-none space-y-3'>
					<div className='space-y-2' data-tour='time-slots'>
						{timeSlots
							.filter((slot) => !slot.isException)
							.map((slot) => (
								<div
									key={slot.id}
									className='flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl'
								>
									<span className='text-sm sm:text-base'>
										{slot.startTime} - {slot.endTime}
									</span>
									<Button
										variant='ghost'
										size='icon'
										onClick={async () => {
											deleteTimeSlot({ id: slot.id })
											await revalidateTagAction({
												tagId: 'myAvailability',
											})
										}}
										className='p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors'
										aria-label='Delete time slot'
									>
										<X className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/70' />
									</Button>
								</div>
							))}

						{isAdding ? (
							<div className='space-y-3 sm:space-y-4 bg-white/5 rounded-xl p-3 sm:p-4'>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
									<div
										className='space-y-1.5 sm:space-y-2'
										data-tour='start-time'
										onClick={() => {
											setCurrentStep((prev) => prev + 1)
										}}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												setCurrentStep((prev) => prev + 1)
											}
										}}
									>
										<Label className='text-sm text-white/70'>Start</Label>
										<Select
											value={newSlot.startTime || ''}
											onValueChange={(value) => {
												setNewSlot((prev) => ({
													...prev,
													startTime: value,
												}))
											}}
										>
											<SelectTrigger className='bg-white/5 border-white/10 text-sm h-9 sm:h-10'>
												<SelectValue placeholder='Zeit auswählen' />
											</SelectTrigger>
											<SelectContent
												className='overflow-y-auto max-h-[40vh]'
												data-tour='start-time-content'
											>
												{timeOptions.map((time) => (
													<SelectItem
														key={time}
														value={time}
														className='text-sm'
													>
														{time}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div
										className='space-y-1.5 sm:space-y-2'
										data-tour='end-time'
										onClick={() => {
											setCurrentStep((prev) => prev + 1)
										}}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												setCurrentStep((prev) => prev + 1)
											}
										}}
									>
										<Label className='text-sm text-white/70'>Ende</Label>
										<Select
											value={newSlot.endTime || ''}
											onValueChange={(value) => {
												setNewSlot((prev) => ({
													...prev,
													endTime: value,
												}))
											}}
											disabled={!newSlot.startTime}
										>
											<SelectTrigger className='bg-white/5 border-white/10 text-sm h-9 sm:h-10'>
												<SelectValue placeholder='Zeit auswählen' />
											</SelectTrigger>
											<SelectContent
												className='overflow-y-auto max-h-[40vh]'
												data-tour='end-time-content'
											>
												{timeOptions
													.filter((time) => time > (newSlot.startTime || ''))
													.map((time) => (
														<SelectItem
															key={time}
															value={time}
															className='text-sm'
														>
															{time}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className='flex justify-end gap-2'>
									<Button
										variant='ghost'
										onClick={() => {
											setNewSlot({})
											setIsAdding(false)
										}}
										className='text-sm text-white/70 hover:bg-white/10 px-3 h-9'
									>
										Abbrechen
									</Button>
									<Button
										onClick={handleAddSlot}
										disabled={!newSlot.startTime || !newSlot.endTime}
										variant='purple'
										className='text-sm px-3 h-9'
										data-tour='save-time-slot'
									>
										Speichern
									</Button>
								</div>
							</div>
						) : (
							<Button
								variant='purple'
								onClick={() => {
									setIsAdding(true)
									setCurrentStep((prev) => prev + 1)
								}}
								className='w-full sm:w-auto text-sm h-9 sm:h-10'
								data-tour='add-time-slot'
							>
								<Plus className='h-4 w-4 mr-1.5' />
								<span>Neues Zeitfenster</span>
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
