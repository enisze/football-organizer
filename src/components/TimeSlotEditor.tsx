import type { TimeSlot } from '@prisma/client'
import { AvailabilityEditor } from './AvailabilityEditor'

interface TimeSlotEditorProps {
	timeSlots: TimeSlot[]
	isWeekend?: boolean
	groupId: string
	date?: Date
	type: 'GENERAL' | 'WEEKEND' | 'DAY_SPECIFIC'
}

export function TimeSlotEditor({
	timeSlots,
	groupId,
	date,
	type,
}: TimeSlotEditorProps) {
	const formattedTimeSlots: TimeSlot[] = timeSlots.map((slot) => ({
		...slot,
		type: type,
		date: date ?? null,
		createdAt: new Date(),
		updatedAt: new Date(),
	}))

	return (
		<AvailabilityEditor
			timeSlots={formattedTimeSlots}
			type={type}
			groupId={groupId}
			date={date}
		/>
	)
}
