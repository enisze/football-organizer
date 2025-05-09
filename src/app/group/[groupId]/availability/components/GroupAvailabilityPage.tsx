import { GroupAvailabilityView } from '@/src/app/group/[groupId]/availability/components/GroupAvailability'
import { prisma } from '@/src/server/db/client'
import { endOfMonth, startOfMonth } from 'date-fns'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { uniqueBy } from 'remeda'
import { processGroupAvailability } from '../processAvailability'
import { getUTCDate } from '../utils/getUTCDate'

interface GroupAvailabilityPageProps {
	groupId: string
	date: Date
	minUsers: number
	duration: '60min' | '90min' | '120min' | undefined
	startTime?: string
	endTime?: string
}

async function getMonthlyAvailability(groupId: string) {
	const monthDate = new Date()

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

	const daysInMonth = new Map<number, number>()

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
			daysInMonth.set(day, maxUsers)
		}
	}

	return daysInMonth
}

export async function GroupAvailabilityPage({
	groupId,
	date,
	minUsers,
	duration,
	startTime,
	endTime,
}: GroupAvailabilityPageProps) {
	'use cache'

	cacheTag('groupAvailability')

	const utcDate = getUTCDate(date)
	const localDayOfWeek = date.getDay()

	const [timeslots, monthlyAvailability] = await Promise.all([
		prisma.timeSlot.findMany({
			where: {
				OR: [
					{ type: 'DATE_SPECIFIC', date: utcDate },
					{ type: 'DAY_SPECIFIC', day: localDayOfWeek },
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
		}),
		getMonthlyAvailability(groupId),
	])

	const uniqueUsers = uniqueBy(
		timeslots.map((slot) => slot.user),
		(user) => user.id,
	)

	const startHour = startTime?.split(':').at(0)
	const endHour = endTime?.split(':').at(0)

	const groupAvailability = processGroupAvailability({
		date,
		users: uniqueUsers,
		timeslots,
		duration,
		startHour: startHour ? Number.parseInt(startHour) : undefined,
		endHour: endHour ? Number.parseInt(endHour) : undefined,
	})

	const filteredAvailability = groupAvailability.filter(
		(slot) => slot.availableUsers.length >= minUsers,
	)

	const filteredSlots = filteredAvailability.filter((slot) => {
		if (!startTime || !endTime) return true
		const slotStart = slot.startTime
		const slotEnd = slot.endTime
		return slotStart >= startTime && slotEnd <= endTime
	})

	return (
		<div className='mb-3 animate-in fade-in duration-500'>
			<GroupAvailabilityView
				date={date}
				processedSlots={filteredSlots}
				groupId={groupId}
				monthlyAvailability={monthlyAvailability}
			/>
		</div>
	)
}
