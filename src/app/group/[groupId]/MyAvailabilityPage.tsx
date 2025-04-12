"use client"

import type { TimeSlot } from "@prisma/client"
import { MyAvailability } from "./availability/components/MyAvailability"

interface MyAvailabilityPageProps {
	groupId: string
	generalTimeSlots: TimeSlot[]
	weekendTimeSlots: TimeSlot[]
	daySpecificTimeSlots: TimeSlot[]
}

export default function MyAvailabilityPage({
	groupId,
	generalTimeSlots,
	weekendTimeSlots,
	daySpecificTimeSlots,
}: MyAvailabilityPageProps) {
	return (
		<div className="py-6">
			<MyAvailability
				groupId={groupId}
				initialWeekdaySlots={generalTimeSlots}
				initialWeekendSlots={weekendTimeSlots}
				initialDaySpecificSlots={daySpecificTimeSlots}
			/>
		</div>
	)
}
