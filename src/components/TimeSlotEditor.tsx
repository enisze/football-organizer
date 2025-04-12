import type { TimeSlot } from "@prisma/client"
import { z } from "zod"
import { AvailabilityEditor } from "./AvailabilityEditor"

const timeSlotSchema = z.object({
	timeSlots: z.array(
		z.object({
			startTime: z.string(),
			endTime: z.string(),
		}),
	),
})

type TimeSlotFormData = z.infer<typeof timeSlotSchema>

interface TimeSlotEditorProps {
	timeSlots: Array<Pick<TimeSlot, "startTime" | "endTime">>
	maxSlots?: number
	isWeekend?: boolean
	groupId: string
	date?: Date
	type: "GENERAL" | "WEEKEND" | "DAY_SPECIFIC"
}

export function TimeSlotEditor({
	timeSlots,
	maxSlots = 2,
	groupId,
	date,
	type,
}: TimeSlotEditorProps) {
	const formattedTimeSlots: TimeSlot[] = timeSlots.map((slot) => ({
		id: "", // These fields are only used for display/deletion
		startTime: slot.startTime,
		endTime: slot.endTime,
		userId: "",
		groupId: groupId,
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
