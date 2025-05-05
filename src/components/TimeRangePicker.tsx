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
import { useTour } from '@reactour/tour'
import { useState } from 'react'

interface TimeRangePickerProps {
	startTime?: string
	endTime?: string
	onChangeAction: (start: string, end?: string) => void
	minTime?: string // e.g. "08:00"
	maxTime?: string // e.g. "24:00"
	interval?: number // in minutes, default 30
	showPresets?: boolean
	singleTime?: boolean // if true, only show one time picker
	className?: string
	placeholder?: string
}

export function TimeRangePicker({
	startTime,
	endTime,
	onChangeAction,
	minTime = '08:00',
	maxTime = '24:00',
	interval = 30,
	showPresets = false,
	singleTime = false,
	className = '',
	placeholder = 'Zeit auswählen',
}: TimeRangePickerProps) {
	const [start, setStart] = useState(startTime ?? '')
	const [end, setEnd] = useState(endTime ?? '')

	// Generate time options in specified increments from minTime to maxTime
	const timeOptions = []
	const [startHour, startMinute] = minTime.split(':').map(Number)
	const [endHour, endMinute] = maxTime.split(':').map(Number)

	if (typeof startHour === 'number' && typeof endHour === 'number') {
		for (let hour = startHour; hour <= endHour; hour++) {
			for (let minute = 0; minute < 60; minute += interval) {
				// Skip invalid combinations
				if (hour === endHour && minute > 0) continue

				const formattedHour =
					hour === 24 ? '00' : hour.toString().padStart(2, '0')
				const formattedMinute = minute.toString().padStart(2, '0')
				timeOptions.push(`${formattedHour}:${formattedMinute}`)
			}
		}
	}

	// Common time presets
	const presets = [
		{ label: 'Morgens', start: '08:00', end: '12:00' },
		{ label: 'Mittags', start: '12:00', end: '14:00' },
		{ label: 'Nachmittags', start: '14:00', end: '18:00' },
		{ label: 'Abends', start: '18:00', end: '22:00' },
	]

	const handleStartChange = (value: string) => {
		setStart(value)
		if (singleTime) {
			onChangeAction(value)
		} else {
			onChangeAction(value, end)
		}
	}

	const handleEndChange = (value: string) => {
		setEnd(value)
		onChangeAction(start, value)
	}

	const applyPreset = (preset: { start: string; end: string }) => {
		setStart(preset.start)
		setEnd(preset.end)
		onChangeAction(preset.start, preset.end)
	}

	const { setCurrentStep } = useTour()

	return (
		<div className={`space-y-2 ${className}`}>
			<div
				className={`grid ${singleTime ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}
			>
				<div
					className='space-y-2'
					data-tour='start-time'
					onClick={() => setCurrentStep((prev) => prev + 1)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setCurrentStep((prev) => prev + 1)
						}
					}}
				>
					{!singleTime && (
						<Label htmlFor='start-time' className='text-xs text-slate-400'>
							Startzeit
						</Label>
					)}
					<Select value={start} onValueChange={handleStartChange}>
						<SelectTrigger className='bg-slate-700 border-slate-600'>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent
							className='bg-slate-800 border-slate-700 max-h-[300px]'
							data-tour='start-time-content'
						>
							{timeOptions.map((time) => (
								<SelectItem key={`start-${time}`} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{!singleTime && (
					<div
						className='space-y-2'
						data-tour='end-time'
						onClick={() => setCurrentStep((prev) => prev + 1)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								setCurrentStep((prev) => prev + 1)
							}
						}}
					>
						<Label htmlFor='end-time' className='text-xs text-slate-400'>
							Endzeit
						</Label>
						<Select value={end} onValueChange={handleEndChange}>
							<SelectTrigger className='bg-slate-700 border-slate-600'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent
								className='bg-slate-800 border-slate-700 max-h-[300px]'
								data-tour='end-time-content'
							>
								{timeOptions
									.filter((time) => time > start)
									.map((time) => (
										<SelectItem key={`end-${time}`} value={time}>
											{time}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>

			{showPresets && !singleTime && (
				<div className='space-y-2' data-tour='presets-time'>
					<Label htmlFor='presets' className='text-xs text-slate-400'>
						Schnellauswahl Zeiten
					</Label>
					<div id='presets' className='grid grid-cols-2 gap-2'>
						{presets.map((preset) => (
							<Button
								key={preset.label}
								size='sm'
								variant='outline'
								onClick={() => applyPreset(preset)}
								className='bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs'
							>
								{preset.label}
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
