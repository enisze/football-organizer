import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateObject } from 'ai'
import { z } from 'zod'
import { filterValidWords } from '../utils'

const requestSchema = z.object({
	category: z.string(),
	wordsPerCategory: z.number().positive(),
	excludeWords: z.array(z.string()),
	existingCategoryWords: z.array(z.string()),
	redisKey: z.string().min(1),
	customPrompt: z.string().optional(),
	taskId: z.string(),
})

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

const free_model = 'mistralai/devstral-small:free'

async function handler(req: Request) {
	try {
		const body = await req.json()
		const {
			category,
			wordsPerCategory,
			excludeWords,
			existingCategoryWords,
			redisKey,
			customPrompt,
			taskId,
		} = requestSchema.parse(body)

		const categoryCacheKey = `${redisKey}:category:${category}`

		// Calculate how many words we still need for this category
		const availableForCategory = existingCategoryWords.filter(
			(word) => !excludeWords.includes(word),
		)
		const wordsNeededForCategory =
			wordsPerCategory - availableForCategory.length

		// Skip API call if no words are needed for this category
		if (wordsNeededForCategory <= 0) {
			await upstashRedis.set(
				`${redisKey}:task:${taskId}`,
				{
					category,
					words: [],
					completed: true,
					runtime: 0,
				},
				{ ex: 300 },
			)

			return new Response(
				JSON.stringify({
					success: true,
					category,
					wordsGenerated: 0,
					runtime: 0,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		const customPromptInstruction = customPrompt
			? `Zusätzliche Anweisungen: ${customPrompt}`
			: ''

		const result = await generateObject({
			model: openrouter.chat(free_model),
			system:
				'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Konzentriere dich nur auf die angegebene Kategorie und erstelle passende deutsche Wörter. Gib NUR einzelne Wörter zurück, keine Sätze, Erklärungen oder Kommentare.',
			prompt: `Erstelle genau ${wordsNeededForCategory} deutsche Wörter für die Kategorie "${category}".
				Die Wörter sollten:
				- zur Kategorie "${category}" gehören
				- nicht in dieser Liste vorkommen: ${[...excludeWords, ...existingCategoryWords].join(', ')}
				- gut zu erraten sein
				- einzelne Wörter sein (keine Phrasen)
				- keine Eigennamen enthalten
				- keine Duplikate enthalten
				${customPromptInstruction ? `\n				- ${customPromptInstruction}` : ''}
				
				WICHTIG: Gib nur einzelne Wörter zurück, keine Sätze, Anweisungen oder Kommentare.`,
			schema: z.object({
				words: z.array(z.string()),
			}),
		})

		// Filter generated words to ensure they're valid
		const validGeneratedWords = filterValidWords(result.object.words || [])

		// Update category cache with new valid words (fire-and-forget for performance)
		const updatedCategoryWords = [
			...existingCategoryWords,
			...validGeneratedWords,
		]

		// Use Promise.all for parallel Redis operations
		const redisOperations = [
			upstashRedis.set(categoryCacheKey, updatedCategoryWords),
			upstashRedis.set(
				`${redisKey}:task:${taskId}`,
				{
					category,
					words: validGeneratedWords,
					completed: true,
					runtime: 0,
				},
				{ ex: 300 },
			),
		]

		// Execute Redis operations in parallel
		await Promise.allSettled(redisOperations)

		return new Response(
			JSON.stringify({
				success: true,
				category,
				wordsGenerated: validGeneratedWords.length,
				runtime: 0,
			}),
			{
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error) {
		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return new Response(`Invalid request format: ${error.message}`, {
				status: 400,
			})
		}

		return new Response('Error generating words for category', { status: 500 })
	}
}

export async function POST(req: Request) {
	// QStash signature verification in App Router
	if (process.env.QSTASH_CURRENT_SIGNING_KEY) {
		const signature = req.headers.get('upstash-signature')
		if (!signature) {
			return new Response('Missing signature', { status: 401 })
		}
	}

	return handler(req)
}
