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

const free_model = 'mistralai/devstral-small:free'

async function generateWordsByCategory(
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

		console.log(
			`Category "${category}": ${availableCategoryWords.length} available cached words`,
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

	// Generate words only for categories that need more words
	if (categoriesToGenerate.length > 0) {
		const customPromptInstruction = customPrompt
			? `Zusätzliche Anweisungen: ${customPrompt}`
			: ''

		const categoryPromises = categoriesToGenerate.map(async (category) => {
			const categoryCacheKey = `${redisKey}:category:${category}`
			const existingCategoryWords: string[] =
				(await upstashRedis.get(categoryCacheKey)) || []

			// Calculate how many words we still need for this category
			const availableForCategory = existingCategoryWords.filter(
				(word) => !excludeWords.includes(word),
			)
			const wordsNeededForCategory =
				wordsPerCategory - availableForCategory.length

			// Skip API call if no words are needed for this category
			if (wordsNeededForCategory <= 0) {
				console.log(
					`Category "${category}": No new words needed, skipping API call`,
				)
				return {
					category,
					words: [],
				}
			}

			console.log(
				`Category "${category}": Generating ${wordsNeededForCategory} new words`,
			)

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
					${customPromptInstruction ? `\n					- ${customPromptInstruction}` : ''}`,
				schema: z.object({
					words: z.array(z.string()),
				}),
			})

			// Update category cache with new words
			const updatedCategoryWords = [
				...existingCategoryWords,
				...result.object.words,
			]
			await upstashRedis.set(categoryCacheKey, updatedCategoryWords)

			return {
				category,
				words: result.object.words,
			}
		})

		// Wait for all category word generations to complete
		const categoryResults = await Promise.all(categoryPromises)

		// Add newly generated words to the result
		for (const categoryResult of categoryResults) {
			allWords.push(...categoryResult.words)
		}
	}

	return { words: allWords, categories }
}

async function validateAndBalanceWords(
	words: string[],
	categories: string[],
	targetWordsPerCategory: number,
): Promise<{ words: string[]; isBalanced: boolean; suggestions?: string[] }> {
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

	return {
		words,
		isBalanced: result.object.isBalanced,
		suggestions: result.object.suggestions,
	}
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

		console.log(cachedWords, ' cachedWords for categories:', sortedCategories)

		// Filter out already guessed words
		let availableWords = cachedWords.filter(
			(word) => !guessedWords.includes(word),
		)

		// If we don't have enough words, generate more with AI
		if (availableWords.length < wordsNeeded) {
			let newWords: string[] = []

			if (categories && categories.length > 0) {
				// Use the new two-step approach for categorized word generation
				const wordsPerCategory = Math.ceil(
					Math.max(100, wordsNeeded) / categories.length,
				)

				console.log(
					`Generating ${wordsPerCategory} words per category for:`,
					categories,
				)

				// Step 1: Generate words by category using free model
				const categoryResult = await generateWordsByCategory(
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

				console.log('Word balance validation:', {
					isBalanced: validationResult.isBalanced,
					totalWords: validationResult.words.length,
					suggestions: validationResult.suggestions?.length || 0,
				})

				// Use validated words, add suggestions if needed
				newWords = validationResult.words
				if (!validationResult.isBalanced && validationResult.suggestions) {
					newWords = [...newWords, ...validationResult.suggestions]
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

				newWords = result.object.words
			}
			// Add new words to cache with categories
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
