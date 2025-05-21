import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { createSlotTool } from '@/src/app/group/createSlot.tool'
import { fetchDateSlotsForGroup } from '@/src/app/group/fetchDataSlotsForGroup.tool'
import { getSlotTool } from '@/src/app/group/getSlot.tool'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'
import { z } from 'zod'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req: Request) {
	const { messages, groupId } = await req.json()

	const session = await serverAuth()
	if (!session?.user?.id) {
		return new Response('Unauthorized', { status: 401 })
	}

	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return new Response('Not in group', { status: 403 })
	}

	const result = streamText({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		messages,
		system: `The groupId is ${groupId}. The current date is ${new Date()} Fill in the information using this date. You are a helpful assistant that helps the user find available time slots for their group. You can ask the user for more information if needed. If the user asks for a specific date, you can use the tool to fetch available time slots. If the user asks for a specific time, you can use the tool to fetch available time slots. If the user asks for a specific duration, you can use the tool to fetch available time slots. If the user asks for a specific day of the week, you can use the tool to fetch available time slots.`,
		tools: {
			fetchDateSlotsForGroup,
			createSlotTool,
			getSlotTool,
			openEventDialog: {
				description:
					'Open the event dialog with the given start time, end time, and date based on the previous messages',
				parameters: z.object({
					startTime: z.string(),
					endTime: z.string(),
					date: z.string(),
				}),
			},
		},
		maxSteps: 5,
		toolCallStreaming: true,
	})

	return result.toDataStreamResponse({
		getErrorMessage: (error) => {
			console.error('Error in chat:', error)
			return 'An error occurred while processing your request'
		},
	})
}
