import { prisma } from '@/src/server/db/client'
import { MyAvailability } from './availability/components/MyAvailability'

interface MyAvailabilityPageProps {
	groupId: string
	date: string | undefined
	userId: string
}

export async function MyAvailabilityPage({
	groupId,
	date,
	userId,
}: MyAvailabilityPageProps) {
	'use cache'

	const [generalTimeSlots, weekendTimeSlots, daySpecificTimeSlots] =
		await Promise.all([
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groupId,
					type: 'GENERAL',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					groupId,
					type: 'WEEKEND',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: userId },
					date: date ? new Date(date) : new Date(),
					groupId,
					type: 'DAY_SPECIFIC',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
		])

	return (
		<div className='mb-3 animate-in fade-in duration-500'>
			<MyAvailability
				groupId={groupId}
				initialWeekdaySlots={generalTimeSlots}
				initialWeekendSlots={weekendTimeSlots}
				initialDaySpecificSlots={daySpecificTimeSlots}
			/>
		</div>
	)
}
