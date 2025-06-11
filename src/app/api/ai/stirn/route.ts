import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { Client } from '@upstash/qstash'
import { Ratelimit } from '@upstash/ratelimit'
import { generateObject } from 'ai'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { filterValidWords, validateAndBalanceWords } from './utils'

interface TaskResult {
	category: string
	words: string[]
	completed: boolean
	runtime: number
	aiTime?: number
}

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

const qstash = new Client({
	token: process.env.QSTASH_TOKEN || '',
})

const rateLimit = new Ratelimit({
	redis: upstashRedis,
	limiter: Ratelimit.slidingWindow(20, '10 s'),
})

const free_model = 'mistralai/devstral-small:free'

async function generateWordsByCategoryParallel(
	categories: string[],
	wordsPerCategory: number,
	excludeWords: string[],
	cachedWords: string[],
	redisKey: string,
	customPrompt?: string,
): Promise<{ words: string[]; categories: string[] }> {
	const allWords: string[] = []
	const categoriesToGenerate: string[] = []

	// First, check cached words for each category
	for (const category of categories) {
		const categoryCacheKey = `${redisKey}:category:${category}`
		const cachedCategoryWords: string[] =
			(await upstashRedis.get(categoryCacheKey)) || []

		// Filter out already guessed words for this category
		const availableCategoryWords = cachedCategoryWords.filter(
			(word) => !excludeWords.includes(word),
		)

		if (availableCategoryWords.length >= wordsPerCategory) {
			// Use cached words if we have enough
			allWords.push(...availableCategoryWords.slice(0, wordsPerCategory))
		} else {
			// Add available cached words and mark category for generation
			allWords.push(...availableCategoryWords)
			categoriesToGenerate.push(category)
		}
	}

	// Generate words in parallel using QStash for categories that need more words
	if (categoriesToGenerate.length > 0) {
		const baseUrl = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: process.env.NODE_ENV === 'development'
				? 'http://localhost:3000'
				: 'https://your-production-domain.com'

		// Parallel task dispatch with Promise.all for better performance
		const taskPromises = categoriesToGenerate.map(async (category) => {
			const categoryCacheKey = `${redisKey}:category:${category}`
			const existingCategoryWords: string[] =
				(await upstashRedis.get(categoryCacheKey)) || []

			const taskId = nanoid()

			try {
				await qstash.publishJSON({
					url: `${baseUrl}/api/ai/stirn/generate-category`,
					body: {
						category,
						wordsPerCategory,
						excludeWords,
						existingCategoryWords,
						redisKey,
						customPrompt,
						taskId,
					},
					retries: 3,
				})
				return taskId
			} catch (error) {
				return null
			}
		})

		const taskIds = (await Promise.allSettled(taskPromises))
			.filter(
				(result) => result.status === 'fulfilled' && result.value !== null,
			)
			.map((result) => (result as PromiseFulfilledResult<string>).value)

		// Wait for all tasks to complete with polling
		const maxWaitTime = 30000 // 30 seconds max wait
		const pollInterval = 500 // Poll every 500ms

		let completedTasks = 0
		const taskResults: Array<{ category: string; words: string[] }> = []
		const pollStartTime = Date.now()

		// Use Set for faster lookup of completed categories
		const completedCategories = new Set<string>()

		while (
			completedTasks < taskIds.length &&
			Date.now() - pollStartTime < maxWaitTime
		) {
			const pendingTasks = taskIds.filter((taskId) => {
				// Skip already processed tasks
				return !completedCategories.has(taskId)
			})

			// Process pending tasks in parallel
			const taskCheckPromises = pendingTasks.map(async (taskId) => {
				const taskResult = (await upstashRedis.get(
					`${redisKey}:task:${taskId}`,
				)) as TaskResult | null

				if (
					taskResult?.completed &&
					!completedCategories.has(taskResult.category)
				) {
					completedCategories.add(taskResult.category)
					taskResults.push({
						category: taskResult.category,
						words: taskResult.words,
					})
					// Clean up task result
					await upstashRedis.del(`${redisKey}:task:${taskId}`)
					return true
				}
				return false
			})

			const completedCount = (
				await Promise.allSettled(taskCheckPromises)
			).filter(
				(result) => result.status === 'fulfilled' && result.value === true,
			).length

			completedTasks += completedCount

			if (completedTasks < taskIds.length) {
				await new Promise((resolve) => setTimeout(resolve, pollInterval))
			}
		}

		// Add newly generated words to the result
		for (const taskResult of taskResults) {
			// Filter out invalid words before adding them
			const validWords = filterValidWords(taskResult.words)
			allWords.push(...validWords)
		}
	}

	return { words: allWords, categories }
}

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

		// Filter out already guessed words
		let availableWords = cachedWords.filter(
			(word) => !guessedWords.includes(word),
		)

		// If we don't have enough words, generate more with AI
		if (availableWords.length < wordsNeeded) {
			let newWords: string[] = []

			if (categories && categories.length > 0) {
				// Use the new parallel approach for categorized word generation
				const wordsPerCategory = Math.ceil(
					Math.max(100, wordsNeeded) / categories.length,
				)

				// Step 1: Generate words by category using parallel processing
				const categoryResult = await generateWordsByCategoryParallel(
					categories,
					wordsPerCategory,
					[...guessedWords, ...cachedWords],
					cachedWords,
					redisKey,
					prompt,
				)

				// Step 2: Validate and balance using premium model
				const validationResult = await validateAndBalanceWords(
					categoryResult.words,
					categories,
					wordsPerCategory,
				)

				// Use validated words, add suggestions if needed
				newWords = validationResult.words
				if (!validationResult.isBalanced && validationResult.suggestions) {
					// Filter suggestions to ensure they're valid words
					const validSuggestions = filterValidWords(
						validationResult.suggestions,
					)
					newWords = [...newWords, ...validSuggestions]
				}
			} else {
				// Fallback to original approach for non-categorized requests
				const categoryInstruction =
					'Die Wörter sollten aus verschiedenen Kategorien stammen (wie Tiere, Essen, Sport, etc.) und gleichmäßig auf diese Kategorien verteilt werden.'

				const customPromptInstruction = prompt
					? `Zusätzliche Anweisungen: ${prompt}`
					: ''

				const result = await generateObject({
					model: openrouter.chat(OPEN_ROUTER_MODEL),
					system:
						'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Die Wörter sollten auf Deutsch sein und sich gut zum Erraten eignen. Gib NUR einzelne Wörter zurück, keine Sätze, Erklärungen oder Kommentare.',
					prompt: `Erstelle eine Liste von ${Math.max(100, wordsNeeded)} neuen deutschen Wörtern für ein Ratespiel. 
						Die Wörter sollten:
						- nicht in dieser Liste vorkommen: ${[...guessedWords, ...cachedWords].join(', ')}
						- gut zu erraten sein
						- ${categoryInstruction}
						- keine Duplikate enthalten
						- einzelne Wörter sein (keine Phrasen)
						- keine Eigennamen enthalten
						${customPromptInstruction ? `\n						- ${customPromptInstruction}` : ''}
						
						WICHTIG: Gib nur einzelne Wörter zurück, keine Sätze, Anweisungen oder Kommentare.`,
					schema: z.object({
						words: z.array(z.string()),
					}),
				})

				newWords = filterValidWords(result.object?.words || [])
			}

			// Add new words to cache with categories (use Set for deduplication performance)
			const uniqueWords = [...new Set([...cachedWords, ...newWords])]

			// Store words with their associated categories
			const cacheData = {
				words: uniqueWords,
				categories: sortedCategories,
			}

			// Use fire-and-forget for cache update to improve response time
			upstashRedis.set(fullCacheKey, cacheData).catch(() => {
				// Silently handle cache errors to not block the response
			})

			// Update available words using the unique set
			availableWords = uniqueWords.filter(
				(word) => !guessedWords.includes(word),
			)
		}

		// Return only the requested number of words
		// Simple and efficient shuffle using sort with random comparator
		const shuffledWords = availableWords.sort(() => 0.5 - Math.random())

		// Take more than needed in case filtering removes some, but limit to available words
		const selectionCount = Math.min(wordsNeeded * 2, shuffledWords.length)
		const preFilteredWords = shuffledWords.slice(0, selectionCount)

		// Final safety filter to ensure only valid words are returned
		const selectedWords = filterValidWords(preFilteredWords).slice(
			0,
			wordsNeeded,
		)

		return new Response(JSON.stringify({ words: selectedWords }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return new Response(`Invalid request format: ${error.message}`, {
				status: 400,
			})
		}

		return new Response('Error generating words', { status: 500 })
	}
}
