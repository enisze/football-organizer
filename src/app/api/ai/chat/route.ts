import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { fetchDateSlotsForGroup } from '@/src/app/group/fetchDataSlotsForGroup.tool'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { type CoreMessage, streamText } from 'ai'
import { z } from 'zod'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req: Request) {
	const { messages, groupId } = await req.json()

	const typedMessages = messages as CoreMessage[]

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

	const query = typedMessages.at(0)?.content

	const adjustedMessages: CoreMessage[] = [
		{
			role: 'system',
			content: `GruppenId: ${groupId}`,
			providerOptions: {},
		},
		...typedMessages,
	]

	const result = streamText({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		messages: adjustedMessages,
		tools: {
			fetchDateSlotsForGroup,
			openEventDialog: {
				description:
					'Get the user location. Always ask for confirmation before using this tool.',
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
