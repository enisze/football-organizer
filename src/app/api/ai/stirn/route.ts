import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { Client } from '@upstash/qstash'
import { Ratelimit } from '@upstash/ratelimit'
import { generateObject } from 'ai'
import { nanoid } from 'nanoid'
import { z } from 'zod'

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
	const startTime = Date.now()
	console.log(
		`[Parallel Generation] Started at ${new Date().toISOString()} for ${categories.length} categories`,
	)

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

		console.log(
			`[Parallel Generation] Category "${category}": ${availableCategoryWords.length} available cached words`,
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
		console.log(
			`[Parallel Generation] Dispatching ${categoriesToGenerate.length} category tasks via QStash`,
		)

		const taskIds: string[] = []
		const qstashStartTime = Date.now()

		// Dispatch parallel tasks via QStash
		for (const category of categoriesToGenerate) {
			const categoryCacheKey = `${redisKey}:category:${category}`
			const existingCategoryWords: string[] =
				(await upstashRedis.get(categoryCacheKey)) || []

			const taskId = nanoid()
			taskIds.push(taskId)

			const baseUrl = process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: process.env.NODE_ENV === 'development'
					? 'http://localhost:3000'
					: 'https://your-production-domain.com' // Replace with your actual domain

			console.log('baseUrl', baseUrl)
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
				console.log(
					`[Parallel Generation] Dispatched task ${taskId} for category: ${category}`,
				)
			} catch (error) {
				console.error(
					`[Parallel Generation] Failed to dispatch task for category ${category}:`,
					error,
				)
			}
		}

		const qstashDispatchTime = Date.now() - qstashStartTime
		console.log(
			`[Parallel Generation] QStash dispatch took ${qstashDispatchTime}ms`,
		)

		// Wait for all tasks to complete with polling
		const pollStartTime = Date.now()
		const maxWaitTime = 30000 // 30 seconds max wait
		const pollInterval = 500 // Poll every 500ms

		let completedTasks = 0
		const taskResults: Array<{ category: string; words: string[] }> = []

		while (
			completedTasks < taskIds.length &&
			Date.now() - pollStartTime < maxWaitTime
		) {
			for (const taskId of taskIds) {
				const taskResult = (await upstashRedis.get(
					`${redisKey}:task:${taskId}`,
				)) as TaskResult | null

				if (
					taskResult?.completed &&
					!taskResults.find((r) => r.category === taskResult.category)
				) {
					taskResults.push({
						category: taskResult.category,
						words: taskResult.words,
					})
					completedTasks++
					console.log(
						`[Parallel Generation] Task ${taskId} completed for category: ${taskResult.category} (${taskResult.runtime}ms)`,
					)

					// Clean up task result
					await upstashRedis.del(`${redisKey}:task:${taskId}`)
				}
			}

			if (completedTasks < taskIds.length) {
				await new Promise((resolve) => setTimeout(resolve, pollInterval))
			}
		}

		const pollTime = Date.now() - pollStartTime
		console.log(
			`[Parallel Generation] Polling took ${pollTime}ms, completed ${completedTasks}/${taskIds.length} tasks`,
		)

		// Add newly generated words to the result
		for (const taskResult of taskResults) {
			allWords.push(...taskResult.words)
		}

		// Log any incomplete tasks
		if (completedTasks < taskIds.length) {
			console.warn(
				`[Parallel Generation] ${taskIds.length - completedTasks} tasks did not complete within timeout`,
			)
		}
	}

	const totalTime = Date.now() - startTime
	console.log(`[Parallel Generation] Total execution time: ${totalTime}ms`)

	return { words: allWords, categories }
}

async function validateAndBalanceWords(
	words: string[],
	categories: string[],
	targetWordsPerCategory: number,
): Promise<{ words: string[]; isBalanced: boolean; suggestions?: string[] }> {
	const startTime = Date.now()
	console.log(
		`[Word Validation] Starting validation for ${words.length} words across ${categories.length} categories`,
	)

	const result = await generateObject({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		system:
			'Du bist ein Experte für Wortspiele und Kategorisierung. Analysiere die gegebenen Wörter und prüfe, ob sie gleichmäßig auf die Kategorien verteilt sind.',
		prompt: `Analysiere diese Wörter und prüfe, ob sie gleichmäßig auf die Kategorien ${categories.join(', ')} verteilt sind:
			
			Wörter: ${words.join(', ')}
			
			Ziel: ${targetWordsPerCategory} Wörter pro Kategorie
			Kategorien: ${categories.join(', ')}
			
			Überprüfe:
			1. Gehören die Wörter zu den richtigen Kategorien?
			2. Ist die Verteilung ausgewogen (ca. ${targetWordsPerCategory} Wörter pro Kategorie)?
			3. Sind alle Wörter zum Erraten geeignet?
			
			Falls nötig, schlage bessere/fehlende Wörter vor, um die Balance zu verbessern.`,
		schema: z.object({
			isBalanced: z.boolean(),
			categoryDistribution: z.record(z.array(z.string())),
			suggestions: z.array(z.string()).optional(),
			issues: z.array(z.string()).optional(),
		}),
	})

	const validationTime = Date.now() - startTime
	console.log(
		`[Word Validation] Completed in ${validationTime}ms - Balanced: ${result.object?.isBalanced}`,
	)

	return {
		words,
		isBalanced: result.object?.isBalanced || false,
		suggestions: result.object?.suggestions,
	}
}

export async function POST(req: Request) {
	const startTime = Date.now()
	console.log(`[STIRN API] Request started at ${new Date().toISOString()}`)

	try {
		const body = await req.json()
		const { guessedWords, wordsNeeded, redisKey, apiKey, categories, prompt } =
			requestSchema.parse(body)

		// Check API key
		if (apiKey !== process.env.STIRN_QUIZ_API_KEY) {
			console.log('[STIRN API] Invalid API key provided')
			return new Response('Invalid API key', { status: 401 })
		}

		const ip =
			req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''
		const { success } = await rateLimit.limit(ip)

		if (!success) {
			console.log(`[STIRN API] Rate limit exceeded for IP: ${ip}`)
			return new Response('Rate limit exceeded', { status: 429 })
		}

		console.log(
			`[STIRN API] Processing request for ${wordsNeeded} words, ${categories?.length || 0} categories`,
		)

		// Create a cache key that includes categories for proper segmentation
		const sortedCategories = categories ? [...categories].sort() : []
		const categoriesKey =
			sortedCategories.length > 0 ? sortedCategories.join('-') : 'general'
		const fullCacheKey = `${redisKey}:categories:${categoriesKey}`

		// First try to get cached data from Redis
		const cacheStartTime = Date.now()
		const cachedData: { words: string[]; categories: string[] } | null =
			await upstashRedis.get(fullCacheKey)
		const cacheTime = Date.now() - cacheStartTime

		// Check if cached data exists and categories match
		let cachedWords: string[] = []
		if (
			cachedData &&
			JSON.stringify(cachedData.categories?.sort()) ===
				JSON.stringify(sortedCategories)
		) {
			cachedWords = cachedData.words || []
		}

		console.log(
			`[STIRN API] Cache lookup took ${cacheTime}ms, found ${cachedWords.length} cached words for categories:`,
			sortedCategories,
		)

		// Filter out already guessed words
		let availableWords = cachedWords.filter(
			(word) => !guessedWords.includes(word),
		)

		console.log(
			`[STIRN API] ${availableWords.length} available words after filtering guessed words`,
		)

		// If we don't have enough words, generate more with AI
		if (availableWords.length < wordsNeeded) {
			let newWords: string[] = []

			if (categories && categories.length > 0) {
				// Use the new parallel approach for categorized word generation
				const wordsPerCategory = Math.ceil(
					Math.max(100, wordsNeeded) / categories.length,
				)

				console.log(
					`[STIRN API] Using parallel generation: ${wordsPerCategory} words per category for:`,
					categories,
				)

				// Step 1: Generate words by category using parallel processing
				const parallelStartTime = Date.now()
				const categoryResult = await generateWordsByCategoryParallel(
					categories,
					wordsPerCategory,
					[...guessedWords, ...cachedWords],
					cachedWords,
					redisKey,
					prompt,
				)
				const parallelTime = Date.now() - parallelStartTime

				console.log(
					`[STIRN API] Parallel generation completed in ${parallelTime}ms`,
				)

				// Step 2: Validate and balance using premium model
				const validationStartTime = Date.now()
				const validationResult = await validateAndBalanceWords(
					categoryResult.words,
					categories,
					wordsPerCategory,
				)
				const validationTime = Date.now() - validationStartTime

				console.log(`[STIRN API] Word validation took ${validationTime}ms`, {
					isBalanced: validationResult.isBalanced,
					totalWords: validationResult.words.length,
					suggestions: validationResult.suggestions?.length || 0,
				})

				// Use validated words, add suggestions if needed
				newWords = validationResult.words
				if (!validationResult.isBalanced && validationResult.suggestions) {
					newWords = [...newWords, ...validationResult.suggestions]
					console.log(
						`[STIRN API] Added ${validationResult.suggestions.length} suggestion words due to imbalance`,
					)
				}
			} else {
				// Fallback to original approach for non-categorized requests
				console.log(
					'[STIRN API] Using fallback approach for non-categorized request',
				)

				const categoryInstruction =
					'Die Wörter sollten aus verschiedenen Kategorien stammen (wie Tiere, Essen, Sport, etc.) und gleichmäßig auf diese Kategorien verteilt werden.'

				const customPromptInstruction = prompt
					? `Zusätzliche Anweisungen: ${prompt}`
					: ''

				const fallbackStartTime = Date.now()
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
						${customPromptInstruction ? `\n						- ${customPromptInstruction}` : ''}`,
					schema: z.object({
						words: z.array(z.string()),
					}),
				})
				const fallbackTime = Date.now() - fallbackStartTime

				console.log(`[STIRN API] Fallback generation took ${fallbackTime}ms`)

				newWords = result.object?.words || []
			}

			// Add new words to cache with categories
			cachedWords = [...new Set([...cachedWords, ...newWords])]

			// Store words with their associated categories
			const cacheData = {
				words: cachedWords,
				categories: sortedCategories,
			}

			const cacheStoreStartTime = Date.now()
			await upstashRedis.set(fullCacheKey, cacheData)
			const cacheStoreTime = Date.now() - cacheStoreStartTime

			console.log(
				`[STIRN API] Cache store took ${cacheStoreTime}ms, stored ${cachedWords.length} total words`,
			)

			// Update available words
			availableWords = cachedWords.filter(
				(word) => !guessedWords.includes(word),
			)
		}

		// Return only the requested number of words
		const shuffledWords = availableWords.sort(() => Math.random() - 0.5)
		const selectedWords = shuffledWords.slice(0, wordsNeeded)

		const totalTime = Date.now() - startTime
		console.log(
			`[STIRN API] Request completed in ${totalTime}ms, returning ${selectedWords.length} words`,
		)

		return new Response(JSON.stringify({ words: selectedWords }), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		const totalTime = Date.now() - startTime
		console.error(`[STIRN API] Error after ${totalTime}ms:`, error)

		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return new Response(`Invalid request format: ${error.message}`, {
				status: 400,
			})
		}

		return new Response('Error generating words', { status: 500 })
	}
}
