import { prisma } from '@/src/server/db/client'
import type { TimeSlot } from '@prisma/client'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { Suspense } from 'react'
import { groupBy } from 'remeda'
import { UserTimeSlotViewer } from './UserTimeSlotViewer'

type TimeSlotMap = Record<number, TimeSlot[]>

export const UserTimeSlotViewerServer = async ({
	selectedUserId,
	groupId,
	users,
}: {
	selectedUserId: string
	groupId: string
	users: {
		name: string
		id: string
		email: string
	}[]
}) => {
	'use cache'

	cacheTag('userTimeslots')

	const timeslots = selectedUserId
		? await prisma.timeSlot.findMany({
				where: {
					userId: selectedUserId,
					type: 'DAY_SPECIFIC',
					groups: {
						some: {
							id: groupId,
						},
					},
				},
			})
		: []

	const timeSlotsByDay = groupBy(
		timeslots.filter(
			(slot): slot is TimeSlot & { day: number } => slot.day !== null,
		),
		(slot) => slot.day,
	)

	return (
		<Suspense>
			<UserTimeSlotViewer
				users={users}
				groupId={groupId}
				timeSlots={timeSlotsByDay}
				selectedUserId={selectedUserId}
			/>
		</Suspense>
	)
}
