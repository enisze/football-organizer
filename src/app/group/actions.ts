'use server'

import { authedActionClient } from '@/src/lib/actionClient'
import { prisma } from '@/src/server/db/client'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateText } from 'ai'
import { z } from 'zod'
import { OPEN_ROUTER_MODEL } from './constants'
import { fetchDateSlotsForGroup } from './fetchDataSlotsForGroup.tool'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

export const findBestSlotAction = authedActionClient
	.schema(
		z.object({
			query: z.string(),
			groupId: z.string(),
		}),
	)
	.action(async ({ parsedInput: { query, groupId }, ctx: { userId } }) => {
		// Get user's group membership
		const userInGroup = await prisma.userOnGroups.findFirst({
			where: {
				user: { id: userId },
				groupId,
			},
		})

		if (!userInGroup) {
			throw new Error('User not in group')
		}

		try {
			const response = await generateText({
				model: openrouter.chat(OPEN_ROUTER_MODEL),
				prompt: `${query} Nutze GruppenId ${groupId} um die Verfügbarkeit zu prüfen. Gib mir die besten Zeitfenster zurück, die für alle Spieler passen. Gib mir nur die Zeitfenster zurück, keine weiteren Erklärungen.`,
				tools: {
					fetchDateSlotsForGroup,
				},
			})

			return {
				text: response.text,
				timeSlots: response.toolResults.at(0)?.result,
			}
		} catch (error) {
			console.error('Error fetching slots:', error)
			throw new Error('Failed to fetch available slots')
		}
	})
