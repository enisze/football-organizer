export interface PreviewTimeSlot {
	id: string // temporary id for UI
	startTime: string
	endTime: string
	date: Date
	isAllDay: boolean
	summary?: string
	selected: boolean
}

export interface CalendarPreviewData {
	slots: PreviewTimeSlot[]
}
