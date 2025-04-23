'use client'

import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select'
import type { TimeSlot } from '@prisma/client'
import { PlusCircle, X } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateGeneralAvailabilityAction } from '../actions'

const timeSlotSchema = z.object({
	timeSlots: z.array(
		z.object({
			startTime: z.string(),
			endTime: z.string(),
		}),
	),
})

type TimeSlotFormData = z.infer<typeof timeSlotSchema>

interface TimeSlotEditorFormProps {
	timeSlots: Array<Pick<TimeSlot, 'startTime' | 'endTime'>>
	maxSlots?: number
	isWeekend?: boolean
	groupId: string
}

const generateTimeOptions = (intervalMinutes: number) => {
	const slots = []
	const startHour = 10
	const endHour = 22

	for (let hour = startHour; hour <= endHour; hour++) {
		for (let minute = 0; minute < 60; minute += intervalMinutes) {
			const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
			slots.push(time)
		}
	}

	return slots
}

export function TimeSlotEditorForm({
	timeSlots,
	maxSlots = 2,
	isWeekend = false,
	groupId,
}: TimeSlotEditorFormProps) {
	const { register, control, handleSubmit, formState } =
		useForm<TimeSlotFormData>({
			defaultValues: {
				timeSlots:
					timeSlots.length > 0 ? timeSlots : [{ startTime: '', endTime: '' }],
			},
		})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'timeSlots',
	})

	const timeOptions = generateTimeOptions(30) // 30-minute intervals

	const { execute: updateGeneralAvailability } = useAction(
		updateGeneralAvailabilityAction,
	)

	const handleFormSubmit = async (data: TimeSlotFormData) => {
		await updateGeneralAvailability({
			timeSlots: data.timeSlots,
			isWeekend,
			groupId,
		})
	}

	const renderSelectOptions = (times: string[]) => {
		return times.map((time) => (
			<SelectItem key={time} value={time}>
				{time}
			</SelectItem>
		))
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className='flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'
				>
					<div className='flex-1 space-y-1'>
						<Label htmlFor={`timeSlots.${index}.startTime`}>Start Time</Label>
						<Select
							{...register(`timeSlots.${index}.startTime` as const)}
							defaultValue={field.startTime}
							onValueChange={(value) => {
								const event = { target: { value } }
								register(`timeSlots.${index}.startTime`).onChange(event)
							}}
						>
							<SelectTrigger id={`timeSlots.${index}.startTime`}>
								<SelectValue placeholder='Select start time' />
							</SelectTrigger>
							<SelectContent>{renderSelectOptions(timeOptions)}</SelectContent>
						</Select>
					</div>

					<div className='flex-1 space-y-1'>
						<Label htmlFor={`timeSlots.${index}.endTime`}>End Time</Label>
						<Select
							{...register(`timeSlots.${index}.endTime` as const)}
							defaultValue={field.endTime}
							onValueChange={(value) => {
								const event = { target: { value } }
								register(`timeSlots.${index}.endTime`).onChange(event)
							}}
						>
							<SelectTrigger id={`timeSlots.${index}.endTime`}>
								<SelectValue placeholder='Select end time' />
							</SelectTrigger>
							<SelectContent>
								{renderSelectOptions(
									timeOptions.filter((time) => time > field.startTime),
								)}
							</SelectContent>
						</Select>
					</div>

					{fields.length > 1 && (
						<Button
							type='button'
							variant='ghost'
							size='icon'
							onClick={() => remove(index)}
							className='self-end'
							aria-label='Remove time slot'
						>
							<X className='h-4 w-4' />
						</Button>
					)}
				</div>
			))}

			{fields.length < maxSlots && (
				<Button
					type='button'
					variant='outline'
					size='sm'
					onClick={() => append({ startTime: '', endTime: '' })}
					className='w-full'
					aria-label='Add time slot'
				>
					<PlusCircle className='mr-2 h-4 w-4' />
					Add Time Slot
				</Button>
			)}

			<Button
				type='submit'
				className='w-full'
				disabled={!formState.isDirty}
				aria-label='Save changes'
			>
				Save Changes
			</Button>
		</form>
	)
}
