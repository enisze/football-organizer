import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateObject } from 'ai'
import { z } from 'zod'

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
	const startTime = Date.now()
	console.log(
		`[Category Generation] Started processing at ${new Date().toISOString()}`,
	)

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

		console.log(
			`[Category Generation] Task ${taskId} - Processing category: ${category}`,
		)

		const categoryCacheKey = `${redisKey}:category:${category}`

		// Calculate how many words we still need for this category
		const availableForCategory = existingCategoryWords.filter(
			(word) => !excludeWords.includes(word),
		)
		const wordsNeededForCategory =
			wordsPerCategory - availableForCategory.length

		// Skip API call if no words are needed for this category
		if (wordsNeededForCategory <= 0) {
			console.log(
				`[Category Generation] Task ${taskId} - Category "${category}": No new words needed, skipping API call`,
			)

			// Store result in Redis for the main function to collect
			await upstashRedis.set(
				`${redisKey}:task:${taskId}`,
				{
					category,
					words: [],
					completed: true,
					runtime: Date.now() - startTime,
				},
				{ ex: 300 },
			) // 5 minutes expiry

			return new Response(
				JSON.stringify({
					success: true,
					category,
					wordsGenerated: 0,
					runtime: Date.now() - startTime,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		console.log(
			`[Category Generation] Task ${taskId} - Category "${category}": Generating ${wordsNeededForCategory} new words`,
		)

		const customPromptInstruction = customPrompt
			? `Zusätzliche Anweisungen: ${customPrompt}`
			: ''

		const aiStartTime = Date.now()
		const result = await generateObject({
			model: openrouter.chat(free_model),
			system:
				'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Konzentriere dich nur auf die angegebene Kategorie und erstelle passende deutsche Wörter.',
			prompt: `Erstelle genau ${wordsNeededForCategory} deutsche Wörter für die Kategorie "${category}".
				Die Wörter sollten:
				- zur Kategorie "${category}" gehören
				- nicht in dieser Liste vorkommen: ${[...excludeWords, ...existingCategoryWords].join(', ')}
				- gut zu erraten sein
				- einzelne Wörter sein (keine Phrasen)
				- keine Eigennamen enthalten
				- keine Duplikate enthalten
				${customPromptInstruction ? `\n				- ${customPromptInstruction}` : ''}`,
			schema: z.object({
				words: z.array(z.string()),
			}),
		})

		const aiTime = Date.now() - aiStartTime
		console.log(
			`[Category Generation] Task ${taskId} - AI generation took ${aiTime}ms`,
		)

		// Update category cache with new words
		const updatedCategoryWords = [
			...existingCategoryWords,
			...result.object.words,
		]
		await upstashRedis.set(categoryCacheKey, updatedCategoryWords)

		// Store result in Redis for the main function to collect
		await upstashRedis.set(
			`${redisKey}:task:${taskId}`,
			{
				category,
				words: result.object?.words || [],
				completed: true,
				runtime: Date.now() - startTime,
				aiTime,
			},
			{ ex: 300 },
		) // 5 minutes expiry

		const totalTime = Date.now() - startTime
		console.log(
			`[Category Generation] Task ${taskId} - Completed in ${totalTime}ms for category: ${category}`,
		)

		return new Response(
			JSON.stringify({
				success: true,
				category,
				wordsGenerated: result.object?.words?.length || 0,
				runtime: totalTime,
				aiTime,
			}),
			{
				headers: { 'Content-Type': 'application/json' },
			},
		)
	} catch (error) {
		const totalTime = Date.now() - startTime
		console.error(`[Category Generation] Error after ${totalTime}ms:`, error)

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
		// Note: In production, you should verify the signature properly
		// For now, we'll trust the environment setup
	}

	return handler(req)
}
