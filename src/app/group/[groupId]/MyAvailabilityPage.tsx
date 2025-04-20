import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { Suspense } from 'react'
import { MyAvailability } from './availability/components/MyAvailability'

interface MyAvailabilityPageProps {
	groupId: string
	date: string | undefined
}

async function MyAvailabilityData({ groupId, date }: MyAvailabilityPageProps) {
	const session = await serverAuth()
	if (!session?.user?.id) return null

	const [generalTimeSlots, weekendTimeSlots, daySpecificTimeSlots] =
		await Promise.all([
			prisma.timeSlot.findMany({
				where: {
					user: { id: session.user.id },
					groupId,
					type: 'GENERAL',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: session.user.id },
					groupId,
					type: 'WEEKEND',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
			prisma.timeSlot.findMany({
				where: {
					user: { id: session.user.id },
					date: date ? new Date(date) : new Date(),
					groupId,
					type: 'DAY_SPECIFIC',
				},
				orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
			}),
		])

	return (
		<MyAvailability
			groupId={groupId}
			initialWeekdaySlots={generalTimeSlots}
			initialWeekendSlots={weekendTimeSlots}
			initialDaySpecificSlots={daySpecificTimeSlots}
		/>
	)
}

export default function MyAvailabilityPage({
	groupId,
	date,
}: MyAvailabilityPageProps) {
	return (
		<Suspense fallback={<div>Loading your availability...</div>}>
			<MyAvailabilityData groupId={groupId} date={date} />
		</Suspense>
	)
}
