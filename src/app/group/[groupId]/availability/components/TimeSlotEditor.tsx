'use server'

import type { TimeSlot } from '@prisma/client'
import dynamic from 'next/dynamic'

// Import form component dynamically to avoid SSR issues
const TimeSlotEditorForm = dynamic(
	() => import('./TimeSlotEditorForm').then((mod) => mod.TimeSlotEditorForm),
	{ ssr: false },
)

interface TimeSlotEditorProps {
	timeSlots: Array<Pick<TimeSlot, 'startTime' | 'endTime'>>
	maxSlots?: number
	isWeekend?: boolean
	groupId: string
}

export function TimeSlotEditor({
	timeSlots,
	maxSlots = 2,
	isWeekend = false,
	groupId,
}: TimeSlotEditorProps) {
	return (
		<TimeSlotEditorForm
			timeSlots={timeSlots}
			maxSlots={maxSlots}
			isWeekend={isWeekend}
			groupId={groupId}
		/>
	)
}
