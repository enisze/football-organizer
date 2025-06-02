import { tool } from 'ai'
import { z } from 'zod'
import { updateTimeSlotAction } from './[groupId]/availability/actions'

export const createSlotTool = tool({
	description: 'Erstellt oder aktualisiert einen Zeitslot für eine Gruppe.',
	parameters: z.object({
		startTime: z
			.string()
			.describe('Die Startzeit des Zeitslots im Format HH:MM'),
		endTime: z.string().describe('Die Endzeit des Zeitslots im Format HH:MM'),
		id: z
			.string()
			.optional()
			.describe(
				'Eindeutige ID des Zeitslots (optional, wird bei Updates verwendet)',
			),
		type: z
			.enum(['DAY_SPECIFIC', 'DATE_SPECIFIC'])
			.describe(
				'Art des Zeitslots: DAY_SPECIFIC für wöchentliche Wiederholung oder DATE_SPECIFIC für ein bestimmtes Datum',
			),
		date: z
			.string()
			.optional()
			.describe(
				'Spezifisches Datum für DATE_SPECIFIC Slots im ISO-Format (YYYY-MM-DD)',
			),
		day: z
			.number()
			.min(0)
			.max(6)
			.optional()
			.describe(
				'Wochentag für DAY_SPECIFIC Slots (0=Sonntag, 1=Montag, ..., 6=Samstag)',
			),
		groupId: z.string().describe('ID der Gruppe, zu der der Zeitslot gehört'),
		isException: z
			.boolean()
			.optional()
			.describe(
				'Markiert den Slot als Ausnahme (z.B. Feiertag oder abgesagter Termin)',
			),
		isGlobalSlot: z
			.boolean()
			.describe(
				'Bestimmt ob der Slot für alle Gruppenmitglieder gilt (true) oder nur für bestimmte Mitglieder (false)',
			),
		weekNumber: z
			.number()
			.optional()
			.describe('Spezifische Woche, es kann nur Woche 1 oder 2 sein'),
	}),
	execute: async ({
		startTime,
		endTime,
		type,
		id,
		date,
		day,
		groupId,
		isException,
		isGlobalSlot,
		weekNumber,
	}) => {
		const result = await updateTimeSlotAction({
			id: id ?? '',
			startTime,
			endTime,
			type,
			date: date ? new Date(date) : undefined,
			day,
			groupId,
			isException,
			isGlobalSlot,
			weekNumber,
		})

		return result?.data
	},
})
