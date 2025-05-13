import { prisma } from '@/src/server/db/client'
import { endOfMonth, startOfMonth } from 'date-fns'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { uniqueBy } from 'remeda'
import { processGroupAvailability } from '../processAvailability'
import { getUTCDate } from '../utils/getUTCDate'
import { GroupAvailabilityCalendar } from './GroupAvailabilityCalendar'

interface GroupAvailabilityCalendarProps {
	groupId: string
	month?: number
}

export async function GroupAvailabilityMonthly({
	groupId,
	month,
}: GroupAvailabilityCalendarProps) {
	'use cache'

	cacheTag('monthlyAvailability')

	const monthDate = new Date()

	if (typeof month === 'number') {
		monthDate.setMonth(month)
	}

	const start = startOfMonth(monthDate)
	const end = endOfMonth(monthDate)
	const currentDate = new Date()
	currentDate.setHours(0, 0, 0, 0)

	const timeslots = await prisma.timeSlot.findMany({
		where: {
			OR: [
				{
					type: 'DATE_SPECIFIC',
					date: {
						gte: getUTCDate(start),
						lte: getUTCDate(end),
					},
				},
				{ type: 'DAY_SPECIFIC' },
			],
			groups: {
				some: {
					id: groupId,
				},
			},
		},
		include: {
			user: true,
		},
	})

	const uniqueUsers = uniqueBy(
		timeslots.map((slot) => slot.user),
		(user) => user.id,
	)

	const monthlyAvailability = new Map<number, number>()

	for (let day = start.getDate(); day <= end.getDate(); day++) {
		const currentLoopDate = new Date(
			monthDate.getFullYear(),
			monthDate.getMonth(),
			day,
		)

		if (currentLoopDate < currentDate) {
			continue
		}

		const daySlots = processGroupAvailability({
			date: currentLoopDate,
			users: uniqueUsers,
			timeslots,
			duration: undefined,
		})

		if (daySlots.length > 0) {
			const maxUsers = Math.max(
				...daySlots.map((slot) => slot.availableUsers.length),
			)
			monthlyAvailability.set(day, maxUsers)
		}
	}

	return (
		<GroupAvailabilityCalendar
			monthlyAvailability={monthlyAvailability}
			initialMonth={monthDate.getMonth()}
		/>
	)
}
