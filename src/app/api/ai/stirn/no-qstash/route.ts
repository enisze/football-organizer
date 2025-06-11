import { upstashRedis } from '@/src/server/db/upstashRedis'
import { Ratelimit } from '@upstash/ratelimit'
import { z } from 'zod'
import { filterValidWords, validateAndBalanceWords } from '../utils'

const requestSchema = z.object({
	words: z.array(z.string()),
	guessedWords: z.array(z.string()),
	wordsNeeded: z.number().positive(),
	redisKey: z.string().min(1),
	apiKey: z.string().min(1),
	categories: z.array(z.string()).optional(),
	prompt: z.string().optional(),
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
		const fullCacheKey = `${redisKey}:categories:${categoriesKey}`

		// Filter and process the provided words
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
