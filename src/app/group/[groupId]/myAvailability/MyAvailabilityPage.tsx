import { prisma } from '@/src/server/db/client'
import { set, subDays } from 'date-fns'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { MyAvailability } from '../availability/components/MyAvailability'

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

	//TODO: This is not a good solution
	const newDate = subDays(
		set(new Date(), {
			hours: 24,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		}),
		1,
	)

	const [daySpecificTimeSlots, weeklyTimeSlots, exceptionSlots] =
		await Promise.all([
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					date: date ? new Date(date) : newDate,
					groupId,
					type: 'DATE_SPECIFIC',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groupId,
					type: 'DAY_SPECIFIC',
				},
				orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groupId,
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
