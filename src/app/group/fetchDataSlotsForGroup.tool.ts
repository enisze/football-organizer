import { prisma } from '@/src/server/db/client'
import { openrouter } from '@openrouter/ai-sdk-provider'
import { generateText, tool } from 'ai'
import { z } from 'zod'
import {
	type TimeSlotDuration,
	processGroupAvailability,
} from './[groupId]/availability/processAvailability'
import { getUTCDate } from './[groupId]/availability/utils/getUTCDate'
import { OPEN_ROUTER_MODEL } from './constants'

export const fetchDateSlotsForGroup = tool({
	description:
		'Fetches available time slots for a group based on natural language request',
	parameters: z.object({
		request: z.string(),
		groupId: z.string(),
		dayOfWeek: z.number().min(0).max(6).optional(),
		month: z.number().optional(),
		day: z.number().optional(),
		year: z.number().optional(),
		desiredDuration: z.enum(['60min', '90min', '120min']).optional(),
		preferredStartTime: z.string().optional(),
		preferredEndTime: z.string().optional(),
	}),
	execute: async ({
		request,
		groupId,
		month,
		day,
		year,
		dayOfWeek,
		desiredDuration,
		preferredEndTime,
		preferredStartTime,
	}: {
		request: string
		groupId: string
		dayOfWeek?: number
		month?: number
		day?: number
		year?: number
		desiredDuration?: string
		preferredStartTime?: string
		preferredEndTime?: string
	}) => {
		const targetDate = new Date(`${year}-${month}-${day}`)
		const localDayOfWeek = new Date(targetDate).getDay()
		const utcDate = getUTCDate(targetDate)

		const timeslots = await prisma.timeSlot.findMany({
			where: {
				OR: [
					{ type: 'DATE_SPECIFIC', date: utcDate },
					{ type: 'DAY_SPECIFIC', day: localDayOfWeek },
				],
				groups: {
					some: {
						id: groupId,
					},
				},
			},
			include: {
				user: true,
			},
		})

		const uniqueUsers = [...new Set(timeslots.map((slot) => slot.user))]

		const slots = processGroupAvailability({
			date: targetDate,
			users: uniqueUsers,
			timeslots,
			duration: (desiredDuration as TimeSlotDuration) ?? '60min',
			startHour: preferredStartTime
				? Number.parseInt(preferredStartTime.split(':')[0], 10)
				: 8,
			endHour: preferredEndTime
				? Number.parseInt(preferredEndTime.split(':')[0], 10)
				: 23,
		})

		const res = await generateText({
			model: openrouter.chat(OPEN_ROUTER_MODEL),
			prompt: `Hier sind die besten Zeitfenster für die Gruppe ${groupId}:\n${slots
				.map(
					(slot) =>
						`- ${slot.startTime} bis ${slot.endTime} (${slot.availableUsers.length} Spieler verfügbar
					Spieler: ${slot.availableUsers.map((user) => `(${user.name})`).join(', ')}
					)`,
				)
				.join('\n')}
				 Das ist die Anfrage: ${request}. Gib mir die besten Zeitfenster und das Datum zurück, die für alle Spieler passen. Gib mir die Zeitfenster zurück und die Anzahl der Teilnehmer, keine weiteren Erklärungen. Beschränke das Ergebnis, wenn in der Anfrage verlangt.
				`,
		})

		return res.text
	},
})
