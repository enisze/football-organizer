import type { TimeSlot, TimeSlotType } from '@prisma/client'
import { AvailabilityEditor } from './AvailabilityEditor'

interface TimeSlotEditorProps {
	timeSlots: TimeSlot[]
	groupId: string
	date?: Date
	day?: number
	type: TimeSlotType
	allowExceptions?: boolean
}

export function TimeSlotEditor({
	timeSlots,
	groupId,
	date,
	day,
	type,
	allowExceptions = type === 'DATE_SPECIFIC',
}: TimeSlotEditorProps) {
	const formattedTimeSlots: TimeSlot[] = timeSlots.map((slot) => ({
		...slot,
		type: type,
		date: date ?? null,
		day: type === 'DAY_SPECIFIC' ? (day ?? null) : null,
		createdAt: new Date(),
		updatedAt: new Date(),
	}))

	return (
		<div className='bg-transparent'>
			<AvailabilityEditor
				timeSlots={formattedTimeSlots}
				type={type}
				groupId={groupId}
				date={date}
				day={day}
				allowExceptions={allowExceptions}
			/>
		</div>
	)
}
