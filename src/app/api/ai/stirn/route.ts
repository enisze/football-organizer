import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { Ratelimit } from '@upstash/ratelimit'
import { generateObject } from 'ai'
import { z } from 'zod'

const requestSchema = z.object({
	guessedWords: z.array(z.string()),
	wordsNeeded: z.number().positive(),
	redisKey: z.string().min(1),
	apiKey: z.string().min(1),
	categories: z.array(z.string()).optional(),
	prompt: z.string().optional(),
})

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

const rateLimit = new Ratelimit({
	redis: upstashRedis,
	limiter: Ratelimit.slidingWindow(20, '10 s'),
})

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { guessedWords, wordsNeeded, redisKey, apiKey, categories, prompt } =
			requestSchema.parse(body)

		// Check API key
		if (apiKey !== process.env.STIRN_QUIZ_API_KEY) {
			return new Response('Invalid API key', { status: 401 })
		}

		const ip =
			req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''
		const { success } = await rateLimit.limit(ip)

		if (!success) {
			return new Response('Rate limit exceeded', { status: 429 })
		}

		// Create a cache key that includes categories for proper segmentation
		const sortedCategories = categories ? [...categories].sort() : []
		const categoriesKey =
			sortedCategories.length > 0 ? sortedCategories.join('-') : 'general'
		const fullCacheKey = `${redisKey}:categories:${categoriesKey}`

		// First try to get cached data from Redis
		const cachedData: { words: string[]; categories: string[] } | null =
			await upstashRedis.get(fullCacheKey)

		// Check if cached data exists and categories match
		let cachedWords: string[] = []
		if (
			cachedData &&
			JSON.stringify(cachedData.categories?.sort()) ===
				JSON.stringify(sortedCategories)
		) {
			cachedWords = cachedData.words || []
		}

		console.log(cachedWords, ' cachedWords for categories:', sortedCategories)

		// Filter out already guessed words
		let availableWords = cachedWords.filter(
			(word) => !guessedWords.includes(word),
		)

		// If we don't have enough words, generate more with AI
		if (availableWords.length < wordsNeeded) {
			const categoryInstruction =
				categories && categories.length > 0
					? `Die Wörter sollten gleichmäßig auf die folgenden Kategorien verteilt werden: ${categories.join(', ')}. Stelle sicher, dass jede Kategorie etwa gleich viele Wörter erhält (ca. ${Math.ceil(Math.max(100, wordsNeeded) / categories.length)} Wörter pro Kategorie).`
					: 'Die Wörter sollten aus verschiedenen Kategorien stammen (wie Tiere, Essen, Sport, etc.) und gleichmäßig auf diese Kategorien verteilt werden.'

			const customPromptInstruction = prompt
				? `Zusätzliche Anweisungen: ${prompt}`
				: ''

			const result = await generateObject({
				model: openrouter.chat(OPEN_ROUTER_MODEL),
				system:
					'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Die Wörter sollten auf Deutsch sein und sich gut zum Erraten eignen. Berücksichtige die angegebenen Kategorien und zusätzlichen Anweisungen, falls welche spezifiziert wurden. Achte besonders darauf, eine gleichmäßige Verteilung der Wörter auf alle angegebenen Kategorien sicherzustellen.',
				prompt: `Erstelle eine Liste von ${Math.max(100, wordsNeeded)} neuen deutschen Wörtern für ein Ratespiel. 
                    Die Wörter sollten:
                    - nicht in dieser Liste vorkommen: ${[...guessedWords, ...cachedWords].join(', ')}
                    - gut zu erraten sein
                    - ${categoryInstruction}
                    - keine Duplikate enthalten
                    - einzelne Wörter sein (keine Phrasen)
                    - keine Eigennamen enthalten
                    ${customPromptInstruction ? `\n                    - ${customPromptInstruction}` : ''}`,
				schema: z.object({
					words: z.array(z.string()),
				}),
			})

			// Add new words to cache with categories
			const newWords = result.object.words
			cachedWords = [...new Set([...cachedWords, ...newWords])]

			// Store words with their associated categories
			const cacheData = {
				words: cachedWords,
				categories: sortedCategories,
			}
			await upstashRedis.set(fullCacheKey, cacheData)

			// Update available words
			availableWords = cachedWords.filter(
				(word) => !guessedWords.includes(word),
			)
		}

		// Return only the requested number of words
		const shuffledWords = availableWords.sort(() => Math.random() - 0.5)
		const selectedWords = shuffledWords.slice(0, wordsNeeded)

		return new Response(JSON.stringify({ words: selectedWords }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Error processing request:', error)

		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return new Response(`Invalid request format: ${error.message}`, {
				status: 400,
			})
		}

		return new Response('Error generating words', { status: 500 })
	}
}
