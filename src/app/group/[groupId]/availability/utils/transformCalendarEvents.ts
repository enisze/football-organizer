import type { TimeSlot } from '@prisma/client'
import { format, isAfter, isBefore, parse } from 'date-fns'
import { de } from 'date-fns/locale'
import type { PreviewTimeSlot } from '../types'

export interface BaseEvent {
	id?: string
	start: {
		dateTime?: string
		date?: string
	}
	end: {
		dateTime?: string
		date?: string
	}
}

export interface GoogleEvent extends BaseEvent {
	summary?: string
}

export interface MicrosoftEvent extends BaseEvent {
	subject?: string
	isAllDay: boolean
}

export type CalendarEvent = GoogleEvent | MicrosoftEvent

export function isGoogleEvent(event: CalendarEvent): event is GoogleEvent {
	return 'summary' in event
}

export function isMicrosoftEvent(
	event: CalendarEvent,
): event is MicrosoftEvent {
	return 'subject' in event
}

function transformGoogleEvent(
	event: GoogleEvent,
	daySpecificSlots: TimeSlot[],
): PreviewTimeSlot | null {
	const start = event?.start.dateTime || event.start.date
	const end = event.end.dateTime || event.end.date
	const isAllDay = !event.start.dateTime

	if (!start || !end) return null

	const startDate = new Date(start)
	const endDate = new Date(end)

	// For all-day events
	if (isAllDay) {
		return {
			id: event.id || Math.random().toString(),
			startTime: '00:00',
			endTime: '23:59',
			date: startDate,
			isAllDay: true,
			summary: event.summary || undefined,
			selected: true,
		}
	}

	// Find matching day-specific slot for this event's day
	const dayOfWeek = startDate.getDay()
	const matchingDaySlot = daySpecificSlots.find(
		(slot) => slot.day === dayOfWeek,
	)

	if (!matchingDaySlot) return null

	const eventStartTime = format(startDate, 'HH:mm', { locale: de })
	const eventEndTime = format(endDate, 'HH:mm', { locale: de })
	const eventStartDate = parse(eventStartTime, 'HH:mm', new Date())
	const eventEndDate = parse(eventEndTime, 'HH:mm', new Date())
	const slotStartDate = parse(matchingDaySlot.startTime, 'HH:mm', new Date())
	const slotEndDate = parse(matchingDaySlot.endTime, 'HH:mm', new Date())

	if (
		isBefore(eventEndDate, slotStartDate) ||
		isAfter(eventStartDate, slotEndDate)
	) {
		return null
	}

	return {
		id: event.id || Math.random().toString(),
		startTime: eventStartTime,
		endTime: eventEndTime,
		date: startDate,
		isAllDay: false,
		summary: event.summary || undefined,
		selected: true,
	}
}

function transformMicrosoftEvent(
	event: MicrosoftEvent,
	daySpecificSlots: TimeSlot[],
): PreviewTimeSlot | null {
	const start = event?.start.dateTime || event.start.date
	const end = event.end.dateTime || event.end.date
	const { isAllDay } = event

	if (!start || !end) return null

	const startDate = new Date(start)
	const endDate = new Date(end)

	// For all-day events
	if (isAllDay) {
		return {
			id: event.id || Math.random().toString(),
			startTime: '00:00',
			endTime: '23:59',
			date: startDate,
			isAllDay: true,
			summary: event.subject || undefined,
			selected: true,
		}
	}

	// Find matching day-specific slot for this event's day
	const dayOfWeek = startDate.getDay()
	const matchingDaySlot = daySpecificSlots.find(
		(slot) => slot.day === dayOfWeek,
	)

	if (!matchingDaySlot) return null

	const eventStartTime = format(startDate, 'HH:mm', { locale: de })
	const eventEndTime = format(endDate, 'HH:mm', { locale: de })
	const eventStartDate = parse(eventStartTime, 'HH:mm', new Date())
	const eventEndDate = parse(eventEndTime, 'HH:mm', new Date())
	const slotStartDate = parse(matchingDaySlot.startTime, 'HH:mm', new Date())
	const slotEndDate = parse(matchingDaySlot.endTime, 'HH:mm', new Date())

	if (
		isBefore(eventEndDate, slotStartDate) ||
		isAfter(eventStartDate, slotEndDate)
	) {
		return null
	}

	return {
		id: event.id || Math.random().toString(),
		startTime: eventStartTime,
		endTime: eventEndTime,
		date: startDate,
		isAllDay: false,
		summary: event.subject || undefined,
		selected: true,
	}
}

export function transformCalendarEvents(
	events: CalendarEvent[],
	daySpecificSlots: TimeSlot[],
	eventType: 'all' | 'fullday' | 'timed' = 'all',
): PreviewTimeSlot[] {
	const previewSlots: PreviewTimeSlot[] = []

	for (const event of events) {
		const isAllDay =
			'isAllDay' in event ? event.isAllDay : !event.start.dateTime

		// Skip events based on eventType filter
		if (eventType === 'fullday' && !isAllDay) continue
		if (eventType === 'timed' && isAllDay) continue

		const transformedEvent = isGoogleEvent(event)
			? transformGoogleEvent(event, daySpecificSlots)
			: transformMicrosoftEvent(event, daySpecificSlots)

		if (transformedEvent) {
			previewSlots.push(transformedEvent)
		}
	}

	return previewSlots
}
