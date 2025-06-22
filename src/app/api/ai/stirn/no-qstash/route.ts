import { upstashRedis } from '@/src/server/db/upstashRedis'
import { Ratelimit } from '@upstash/ratelimit'
import { z } from 'zod'
import { filterValidWords, validateAndBalanceWords } from '../utils'

const requestSchema = z.object({
	words: z.array(z.string()), // These are generated words from the generate-category route
	guessedWords: z.array(z.string()).optional().default([]),
	wordsNeeded: z.number().positive(),
	redisKey: z.string().min(1),
	apiKey: z.string().min(1),
	categories: z.array(z.string()).optional(),
	prompt: z.string().optional(),
	gameMode: z
		.enum(['stirn', 'tabu', 'justOne', 'activity', 'impostor'])
		.optional()
		.default('stirn'),
	count: z.number().positive().optional().default(10),
	// For Tabu mode, words should be structured with main and forbidden
	tabuWords: z
		.array(
			z.object({
				main: z.string(),
				forbidden: z.array(z.string()),
			}),
		)
		.optional()
		.default([]),
})

const rateLimit = new Ratelimit({
	redis: upstashRedis,
	limiter: Ratelimit.slidingWindow(20, '10 s'),
})

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const {
			words,
			guessedWords,
			wordsNeeded,
			redisKey,
			apiKey,
			categories,
			prompt,
			gameMode,
			count,
			tabuWords,
		} = requestSchema.parse(body)

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
		const fullCacheKey = `${redisKey}:${gameMode}:categories:${categoriesKey}`

		// Handle different game modes
		if (gameMode === 'tabu') {
			// Combine provided words with generated Tabu words
			const validWords = filterValidWords(words)
			const cachedData: {
				words: Array<{ main: string; forbidden: string[] }>
				categories: string[]
			} | null = await upstashRedis.get(fullCacheKey)

			let cachedWords: Array<{ main: string; forbidden: string[] }> = []
			if (
				cachedData &&
				JSON.stringify(cachedData.categories?.sort()) ===
					JSON.stringify(sortedCategories)
			) {
				cachedWords = cachedData.words || []
			}

			// Combine cached words with newly generated Tabu words
			const allTabuWords = [...cachedWords, ...tabuWords]

			// Update cache with combined words (fire-and-forget)
			if (tabuWords.length > 0) {
				const cacheData = {
					words: allTabuWords,
					categories: sortedCategories,
				}
				upstashRedis.set(fullCacheKey, cacheData).catch(() => {})
			}

			// For Tabu, return structured words with forbidden words
			const availableTabuWords = allTabuWords.filter(
				(word) => word.main && !guessedWords.includes(word.main),
			)

			const selectedTabuWords = availableTabuWords.slice(0, count)

			return new Response(
				JSON.stringify({
					mode: 'Tabu',
					words: selectedTabuWords,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		if (gameMode === 'justOne') {
			// Use generated words for Just One game
			const validWords = filterValidWords(words)
			const availableWords = validWords.filter(
				(word) => !guessedWords.includes(word),
			)

			const wordGroups = []
			const groupsNeeded = Math.ceil(count / 5)

			for (let i = 0; i < groupsNeeded && i * 5 < availableWords.length; i++) {
				const group = availableWords.slice(i * 5, (i + 1) * 5)
				if (group.length === 5) {
					wordGroups.push(group)
				}
			}

			return new Response(
				JSON.stringify({
					mode: 'Just One Quiz',
					wordGroups,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		if (gameMode === 'activity') {
			// Use generated words for Activity game
			const validWords = filterValidWords(words)
			const availableWords = validWords.filter(
				(word) => !guessedWords.includes(word),
			)

			const activityTypes = ['Zeichnen', 'Erklären', 'Pantomime']
			const tasks = availableWords.slice(0, count).map((word, index) => ({
				word,
				type: activityTypes[index % activityTypes.length],
			}))

			return new Response(
				JSON.stringify({
					mode: 'Activity',
					tasks,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		if (gameMode === 'impostor') {
			// Use generated words for Impostor game
			const validWords = filterValidWords(words)
			const availableWords = validWords.filter(
				(word) => !guessedWords.includes(word),
			)

			if (availableWords.length === 0) {
				return new Response(
					JSON.stringify({
						mode: 'Impostor',
						word: null,
						error: 'No words available',
					}),
					{
						headers: { 'Content-Type': 'application/json' },
					},
				)
			}

			const selectedWord =
				availableWords[Math.floor(Math.random() * availableWords.length)]

			return new Response(
				JSON.stringify({
					mode: 'Impostor',
					word: selectedWord,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Default Stirn Quiz mode (existing logic)
		// Filter and process the generated words
		const validWords = filterValidWords(words)

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

		// Combine provided words with cached words
		let uniqueWords = [...new Set([...cachedWords, ...validWords])]

		// If categories are provided, validate and balance the words
		if (categories && categories.length > 0 && uniqueWords.length > 0) {
			const wordsPerCategory = Math.ceil(
				Math.max(100, wordsNeeded) / categories.length,
			)

			const validationResult = await validateAndBalanceWords(
				uniqueWords,
				categories,
				wordsPerCategory,
			)

			// Use validated words, add suggestions if needed
			if (!validationResult.isBalanced && validationResult.suggestions) {
				// Filter suggestions to ensure they're valid words
				const validSuggestions = filterValidWords(validationResult.suggestions)
				uniqueWords = [...new Set([...uniqueWords, ...validSuggestions])]
			}
		}

		// Store words with their associated categories
		const cacheData = {
			words: uniqueWords,
			categories: sortedCategories,
		}

		// Use fire-and-forget for cache update to improve response time
		upstashRedis.set(fullCacheKey, cacheData).catch(() => {
			// Silently handle cache errors to not block the response
		})

		// Filter out already guessed words
		const availableWords = uniqueWords.filter(
			(word) => !guessedWords.includes(word),
		)

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

		return new Response('Error processing words', { status: 500 })
	}
}
