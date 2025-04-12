"use client"

import type { TimeSlot, User } from "@prisma/client"
import { MyAvailability } from "./availability/components/MyAvailability"

interface MyAvailabilityPageProps {
	groupId: string
	timeSlots: TimeSlot[]
	users: User[]
}

export default function MyAvailabilityPage({
	groupId,
	timeSlots,
	users,
}: MyAvailabilityPageProps) {
	const weekdaySlots =
		timeSlots?.filter((slot) => slot.type === "GENERAL") ?? []
	const weekendSlots =
		timeSlots?.filter((slot) => slot.type === "WEEKEND") ?? []

	return (
		<div className="py-6">
			<MyAvailability
				groupId={groupId}
				users={users}
				initialWeekdaySlots={weekdaySlots}
				initialWeekendSlots={weekendSlots}
			/>
		</div>
	)
}
