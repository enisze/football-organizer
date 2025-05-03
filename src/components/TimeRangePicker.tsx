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
import { useState } from 'react'

interface TimeRangePickerProps {
	startTime: string
	endTime: string
	onChangeAction: (start: string, end: string) => void
}

export function TimeRangePicker({
	startTime,
	endTime,
	onChangeAction,
}: TimeRangePickerProps) {
	const [start, setStart] = useState(startTime)
	const [end, setEnd] = useState(endTime)

	// Generate time options in 30-minute increments from 8:00 to 00:00
	const timeOptions = []
	for (let hour = 8; hour <= 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			// Skip the 24:30 option
			if (hour === 24 && minute > 0) continue

			const formattedHour =
				hour === 24 ? '00' : hour.toString().padStart(2, '0')
			const formattedMinute = minute.toString().padStart(2, '0')
			timeOptions.push(`${formattedHour}:${formattedMinute}`)
		}
	}

	// Common time presets within our 8:00-00:00 range
	const presets = [
		{ label: 'Morgens', start: '08:00', end: '12:00' },
		{ label: 'Mittags', start: '12:00', end: '14:00' },
		{ label: 'Nachmittags', start: '14:00', end: '18:00' },
		{ label: 'Abends', start: '18:00', end: '22:00' },
	]

	const handleStartChange = (value: string) => {
		setStart(value)
		onChangeAction(value, end)
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

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='space-y-2'>
					<Label htmlFor='start-time' className='text-xs text-slate-400'>
						Startzeit
					</Label>
					<Select
						// id='start-time'
						value={start}
						onValueChange={handleStartChange}
					>
						<SelectTrigger className='bg-slate-700 border-slate-600'>
							<SelectValue placeholder='Startzeit' />
						</SelectTrigger>
						<SelectContent className='bg-slate-800 border-slate-700 max-h-[300px]'>
							{timeOptions.map((time) => (
								<SelectItem key={`start-${time}`} value={time}>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='end-time' className='text-xs text-slate-400'>
						Endzeit
					</Label>
					<Select value={end} onValueChange={handleEndChange}>
						<SelectTrigger className='bg-slate-700 border-slate-600'>
							<SelectValue placeholder='Endzeit' />
						</SelectTrigger>
						<SelectContent className='bg-slate-800 border-slate-700 max-h-[300px]'>
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
			</div>

			<div className='space-y-2'>
				<Label htmlFor='presets' className='text-xs text-slate-400'>
					Schnellauswahl Zeiten
				</Label>
				<div id='presets' className='flex flex-wrap gap-2'>
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
		</div>
	)
}
