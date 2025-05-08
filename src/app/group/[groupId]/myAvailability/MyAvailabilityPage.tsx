import { prisma } from '@/src/server/db/client'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
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

	const utcDate = date ? getUTCDate(new Date(date)) : getUTCDate(new Date())

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

	return (
		<div className='mb-3 animate-in fade-in duration-500'>
			<MyAvailability
				groupId={groupId}
				initialDaySpecificSlots={daySpecificTimeSlots}
				initialWeeklySlots={weeklyTimeSlots}
				exceptionSlots={exceptionSlots}
				tab={tab}
			/>
		</div>
	)
}
