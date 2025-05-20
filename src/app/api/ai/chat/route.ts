import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { fetchDateSlotsForGroup } from '@/src/app/group/fetchDataSlotsForGroup.tool'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

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
		tools: {
			fetchDateSlotsForGroup,
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
