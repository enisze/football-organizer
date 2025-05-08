import { prisma } from '@/src/server/db/client'
import type { TimeSlot } from '@prisma/client'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { groupBy } from 'remeda'
import { MyAvailability } from '../availability/components/MyAvailability'
import { getUTCDate } from '../availability/utils/getUTCDate'

interface MyAvailabilityPageProps {
	groupId: string
	date: string | undefined
	userId: string
	tab: string
}

export async function MyAvailabilityPage({
	groupId,
	date,
	userId,
	tab,
}: MyAvailabilityPageProps) {
	'use cache'

	cacheTag('myAvailability')

	// Parse date and convert to user's timezone
	const localDate = date ? new Date(date) : new Date()
	const utcDate = getUTCDate(localDate)

	const [daySpecificTimeSlots, weeklyTimeSlots, exceptionSlots] =
		await Promise.all([
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					date: utcDate,
					groups: {
						some: {
							id: groupId,
						},
					},
					type: 'DATE_SPECIFIC',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groups: {
						some: {
							id: groupId,
						},
					},
					type: 'DAY_SPECIFIC',
					day: localDate.getDay(),
				},
				orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groups: {
						some: {
							id: groupId,
						},
					},
					type: 'DATE_SPECIFIC',
					isException: true,
				},
				orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
			}),
		])

	const weeklySlotsByDay = groupBy(
		weeklyTimeSlots.filter(
			(slot): slot is TimeSlot & { day: number } => slot.day !== null,
		),
		(slot) => slot.day,
	)

	return (
		<div className='mb-3 animate-in fade-in duration-500'>
			<MyAvailability
				groupId={groupId}
				initialDaySpecificSlots={daySpecificTimeSlots}
				initialWeeklySlots={weeklySlotsByDay}
				exceptionSlots={exceptionSlots}
				tab={tab}
			/>
		</div>
	)
}
