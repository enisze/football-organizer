import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { createSlotTool } from '@/src/app/group/createSlot.tool'
import { fetchDateSlotsForGroup } from '@/src/app/group/fetchDataSlotsForGroup.tool'
import { getSlotTool } from '@/src/app/group/getSlot.tool'
import { serverAuth } from '@/src/server/auth/session'
import { prisma } from '@/src/server/db/client'
import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { Ratelimit } from '@upstash/ratelimit'
import { streamText } from 'ai'
import { z } from 'zod'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

const rateLimit = new Ratelimit({
	redis: upstashRedis,
	limiter: Ratelimit.slidingWindow(20, '10 s'),
})

export async function POST(req: Request) {
	const { messages, groupId } = await req.json()

	const session = await serverAuth()
	if (!session?.user?.id) {
		return new Response('Nicht autorisiert', { status: 401 })
	}

	const userInGroup = await prisma.userOnGroups.findFirst({
		where: {
			user: { id: session.user.id },
			groupId,
		},
	})

	if (!userInGroup) {
		return new Response('Nicht in der Gruppe', { status: 403 })
	}

	const ip =
		req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''

	const { success } = await rateLimit.limit(ip)

	if (!success) {
		return new Response('Rate-Limit überschritten', { status: 429 })
	}

	const result = streamText({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		messages,
		system: `Die Gruppen-ID ist ${groupId}. Das aktuelle Datum ist ${new Date()}. Füllen Sie die Informationen mit diesem Datum aus. Sie sind ein hilfreicher Assistent, der dem Benutzer dabei hilft, verfügbare Zeitslots für ihre Gruppe zu finden. Sie können den Benutzer nach weiteren Informationen fragen, falls nötig. Wenn der Benutzer nach einem bestimmten Datum fragt, können Sie das Tool verwenden, um verfügbare Zeitslots abzurufen. Wenn der Benutzer nach einer bestimmten Zeit fragt, können Sie das Tool verwenden, um verfügbare Zeitslots abzurufen. Wenn der Benutzer nach einer bestimmten Dauer fragt, können Sie das Tool verwenden, um verfügbare Zeitslots abzurufen. Wenn der Benutzer nach einem bestimmten Wochentag fragt, können Sie das Tool verwenden, um verfügbare Zeitslots abzurufen.`,
		tools: {
			fetchDateSlotsForGroup,
			createSlotTool,
			getSlotTool,
			openEventDialog: {
				description:
					'Öffnet den Event-Dialog mit der angegebenen Startzeit, Endzeit und dem Datum basierend auf den vorherigen Nachrichten',
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
			console.error('Fehler im Chat:', error)
			return 'Ein Fehler ist beim Verarbeiten Ihrer Anfrage aufgetreten'
		},
	})
}
