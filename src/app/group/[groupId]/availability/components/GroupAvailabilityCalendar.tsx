'use client'
import { cn } from '@/lib/utils/cn'
import { Calendar } from '@/ui/calendar'
import { getMonth } from 'date-fns'
import { useSetAtom } from 'jotai'
import { useAction } from 'next-safe-action/hooks'
import { useQueryState } from 'nuqs'
import { useCallback, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { revalidateTagNextAction } from '../../actions'
import { getUTCDate } from '../utils/getUTCDate'
import { loadingAvailabilityAtom } from './GroupAvailability'

interface GroupAvailabilityCalendarProps {
	monthlyAvailability: Map<number, number>
	initialMonth?: number
}

export function GroupAvailabilityCalendar({
	monthlyAvailability,
	initialMonth,
}: GroupAvailabilityCalendarProps) {
	const [date, setDate] = useQueryState('date', {
		shallow: true,
	})

	const [maxUsers] = useQueryState('maxUsers', {
		defaultValue: 0,
		parse: (value) => Number(value),
		shallow: true,
	})

	const [month, setMonth] = useQueryState('month', {
		defaultValue: initialMonth,
		parse: (value) => Number(value),
		shallow: true,
	})

	const { execute: revalidateT, isPending: revalidateTLoading } = useAction(
		revalidateTagNextAction,
	)

	const {
		execute: revalidateTInternal,
		isPending: revalidateTInternalLoading,
	} = useAction(revalidateTagNextAction)

	const setAvailabilityLoading = useSetAtom(loadingAvailabilityAtom)

	useEffect(() => {
		if (revalidateTLoading) {
			setAvailabilityLoading(true)
		} else {
			setAvailabilityLoading(false)
		}
	}, [revalidateTLoading, setAvailabilityLoading])

	const refresh = useDebouncedCallback(() => {
		revalidateT({ tagId: 'monthlyAvailability' })
	}, 300)

	const handleDateChange = useCallback(
		async (newDate: Date | undefined) => {
			if (!newDate) return

			const utcDate = getUTCDate(newDate)
			setDate(utcDate.toISOString())
			refresh()
		},
		[setDate, refresh],
	)

	return (
		<div className='bg-white/5 rounded-xl p-4'>
			<Calendar
				id='date-picker'
				mode='single'
				selected={date ? new Date(date) : undefined}
				onSelect={handleDateChange}
				className='mx-auto'
				weekStartsOn={1}
				onMonthChange={(month) => {
					setMonth(getMonth(month))
					revalidateTInternal({ tagId: 'monthlyAvailability' })
				}}
				disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
				modifiers={{
					below50: (date: Date) => {
						if (date.getMonth() !== month) return false
						const userCount = monthlyAvailability.get(date.getDate())
						if (!userCount) return false
						const percentage = (userCount / maxUsers) * 100
						return percentage < 50
					},
					below75: (date: Date) => {
						if (date.getMonth() !== month) return false
						const userCount = monthlyAvailability.get(date.getDate())
						if (!userCount) return false
						const percentage = (userCount / maxUsers) * 100
						return percentage >= 50 && percentage < 90
					},
					hundred: (date: Date) => {
						if (date.getMonth() !== month) return false
						const userCount = monthlyAvailability.get(date.getDate())
						if (!userCount) return false
						const percentage = (userCount / maxUsers) * 100
						return percentage >= 90
					},
				}}
				modifiersClassNames={{
					below50: cn(
						'relative after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2',
						!revalidateTInternalLoading
							? 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-red-500'
							: 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-red-500/30 after:blur-[2px]',
					),
					below75: cn(
						'relative after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2',
						!revalidateTInternalLoading
							? 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-yellow-500'
							: 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-yellow-500/30 after:blur-[2px]',
					),
					hundred: cn(
						'relative after:absolute after:bottom-[2px] after:left-1/2 after:-translate-x-1/2',
						!revalidateTInternalLoading
							? 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-green-500'
							: 'after:content-[""] after:w-1 after:h-1 after:rounded-full after:bg-green-500/30 after:blur-[2px]',
					),
				}}
			/>
		</div>
	)
}
