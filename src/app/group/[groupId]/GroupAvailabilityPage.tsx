import { GroupAvailabilityView } from '@/src/components/GroupAvailability'
import { prisma } from '@/src/server/db/client'
import { Suspense } from 'react'
import { processGroupAvailability } from './availability/processAvailability'

interface GroupAvailabilityPageProps {
	groupId: string
	date: Date
	minUsers: number
	duration: '60min' | '90min' | '120min'
}

async function GroupAvailabilityData({
	groupId,
	date,
	minUsers,
	duration,
}: GroupAvailabilityPageProps) {
	const group = await prisma.group.findUnique({
		where: { id: groupId },
		include: {
			users: {
				include: {
					user: true,
				},
			},
		},
	})

	if (!group) return null

	const users = group.users.map((u) => u.user)
	const [daySpecificSlots, generalSlots, weekendSlots] = await Promise.all([
		// Get day-specific slots for this date
		prisma.timeSlot.findMany({
			where: {
				type: 'DAY_SPECIFIC',
				date,
				groupId,
				user: {
					groups: {
						some: {
							groupId,
						},
					},
				},
			},
			include: {
				user: true,
			},
		}),
		// Get general slots
		prisma.timeSlot.findMany({
			where: {
				type: 'GENERAL',
				groupId,
				user: {
					groups: {
						some: {
							groupId,
						},
					},
				},
			},
			include: {
				user: true,
			},
		}),
		// Get weekend slots
		prisma.timeSlot.findMany({
			where: {
				type: 'WEEKEND',
				groupId,
				user: {
					groups: {
						some: {
							groupId,
						},
					},
				},
			},
			include: {
				user: true,
			},
		}),
	])

	const groupAvailability = processGroupAvailability({
		date,
		users,
		daySpecificSlots: daySpecificSlots ?? [],
		regularSlots: generalSlots ?? [],
		weekendSlots: weekendSlots ?? [],
		duration,
	})

	const filteredAvailability = groupAvailability.filter(
		(slot) => slot.availableUsers.length >= minUsers,
	)

	return (
		<GroupAvailabilityView
			users={users}
			date={date}
			processedSlots={filteredAvailability}
			groupId={groupId}
		/>
	)
}

export default function GroupAvailabilityPage(
	props: GroupAvailabilityPageProps,
) {
	return (
		<Suspense fallback={<div>Loading availability...</div>}>
			<GroupAvailabilityData {...props} />
		</Suspense>
	)
}
