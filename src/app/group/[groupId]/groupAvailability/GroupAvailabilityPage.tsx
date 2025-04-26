import { GroupAvailabilityView } from '@/src/components/GroupAvailability'
import { prisma } from '@/src/server/db/client'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { uniqueBy } from 'remeda'
import { processGroupAvailability } from '../availability/processAvailability'

interface GroupAvailabilityPageProps {
	groupId: string
	date: Date
	minUsers: number
	duration: '60min' | '90min' | '120min' | undefined
}

export async function GroupAvailabilityPage({
	groupId,
	date,
	minUsers,
	duration,
}: GroupAvailabilityPageProps) {
	'use cache'

	cacheTag('groupAvailability')

	const timeslots = await prisma.timeSlot.findMany({
		where: {
			OR: [
				{ type: 'DATE_SPECIFIC', date },
				{ type: 'DAY_SPECIFIC', day: date.getDay() },
				{ type: 'GENERAL' },
				{ type: 'WEEKEND' },
			],
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
	})

	if (!timeslots.length) return null

	// Deduplicate users by ID and keep the first occurrence of each user
	const uniqueUsers = uniqueBy(
		timeslots.map((slot) => slot.user),
		(user) => user.id,
	)

	const groupAvailability = processGroupAvailability({
		date,
		users: uniqueUsers,
		timeslots,
		duration,
	})

	const filteredAvailability = groupAvailability.filter(
		(slot) => slot.availableUsers.length >= minUsers,
	)

	return (
		<div className='mb-3 animate-in fade-in duration-500'>
			<GroupAvailabilityView
				users={uniqueUsers}
				date={date}
				processedSlots={filteredAvailability}
				groupId={groupId}
			/>
		</div>
	)
}
