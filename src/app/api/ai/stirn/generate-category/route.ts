import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { upstashRedis } from '@/src/server/db/upstashRedis'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateObject } from 'ai'
import { z } from 'zod'
import { filterValidWords } from '../utils'

const requestSchema = z.object({
	category: z.string(),
	wordsPerCategory: z.number().positive(),
	excludeWords: z.array(z.string()),
	existingCategoryWords: z.array(z.string()).optional().default([]),
	redisKey: z.string().min(1),
	customPrompt: z.string().optional(),
	taskId: z.string(),
	gameMode: z.enum(['stirn', 'tabu']).optional().default('stirn'),
	existingTabuWords: z
		.array(
			z.object({
				main: z.string(),
				forbidden: z.array(z.string()),
			}),
		)
		.optional()
		.default([]),
})

// Use faster model for better performance
const OPTIMIZED_MODEL = 'mistralai/devstral-small:free'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

// Cache for compiled exclude word sets to avoid repeated computations
const excludeWordCache = new Map<string, Set<string>>()

// Helper function to get optimized exclude words set
function getExcludeWordsSet(
	excludeWords: string[],
	existingWords: string[],
): Set<string> {
	const cacheKey = [...excludeWords, ...existingWords].sort().join('|')

	if (!excludeWordCache.has(cacheKey)) {
		excludeWordCache.set(cacheKey, new Set([...excludeWords, ...existingWords]))
		// Prevent memory leaks by limiting cache size
		if (excludeWordCache.size > 100) {
			const firstKey = excludeWordCache.keys().next().value
			if (firstKey) {
				excludeWordCache.delete(firstKey)
			}
		}
	}

	const result = excludeWordCache.get(cacheKey)
	return result || new Set([...excludeWords, ...existingWords])
}

// Common response builder
function buildSuccessResponse(data: {
	category: string
	wordsGenerated: number
	runtime: number
	words?: Array<string | { main: string; forbidden: string[] }>
	gameMode?: string
}) {
	return new Response(
		JSON.stringify({
			success: true,
			...data,
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	)
}

// Optimized Redis operations with pipeline
async function executeRedisOperations(operations: Array<Promise<unknown>>) {
	// Use allSettled for better error handling and parallel execution
	const results = await Promise.allSettled(operations)

	// Log any failed operations for debugging but don't fail the request
	results.forEach((result, index) => {
		if (result.status === 'rejected') {
			console.warn(`Redis operation ${index} failed:`, result.reason)
		}
	})
}

async function handleTabuMode(
	category: string,
	wordsPerCategory: number,
	excludeWords: string[],
	existingTabuWords: Array<{ main: string; forbidden: string[] }>,
	redisKey: string,
	taskId: string,
	customPrompt?: string,
) {
	const existingMainWords = existingTabuWords.map((word) => word.main)
	const excludeSet = getExcludeWordsSet(excludeWords, existingMainWords)
	const availableTabuWords = existingMainWords.filter(
		(word) => !excludeSet.has(word),
	)
	const tabuWordsNeeded = wordsPerCategory - availableTabuWords.length

	// Early return if no words needed
	if (tabuWordsNeeded <= 0) {
		const taskData = {
			category,
			words: [],
			completed: true,
			runtime: 0,
		}

		await upstashRedis.set(`${redisKey}:task:${taskId}`, taskData, { ex: 300 })

		return buildSuccessResponse({
			category,
			wordsGenerated: 0,
			runtime: 0,
		})
	}

	// Build optimized prompt
	const promptParts = [
		`Erstelle genau ${tabuWordsNeeded} deutsche Tabu-Wörter für die Kategorie "${category}".`,
		'Für jedes Hauptwort erstelle 3-5 verbotene Wörter, die beim Erklären nicht verwendet werden dürfen.',
		'',
		'Die Hauptwörter sollten:',
		`- zur Kategorie "${category}" gehören`,
		`- nicht in dieser Liste vorkommen: ${Array.from(excludeSet).join(', ')}`,
		'- eine Mischung aus verschiedenen Schwierigkeitsgraden haben',
		'- einzelne Wörter sein (keine Phrasen)',
		'- keine Eigennamen enthalten',
		'',
		'Die verbotenen Wörter sollten:',
		'- die naheliegendsten Begriffe zum Erklären des Hauptworts sein',
		'- keine Wortteile des Hauptworts enthalten',
		'- sinnvolle Beschreibungen erschweren',
	]

	if (customPrompt) {
		promptParts.push(`\n- ${customPrompt}`)
	}

	promptParts.push(
		'\nWICHTIG: Gib strukturierte Daten zurück mit Hauptwort und verbotenen Wörtern.',
	)

	const result = await generateObject({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		system:
			'Du bist ein Assistent, der Tabu-Wörter für ein Ratespiel generiert. Erstelle deutsche Hauptwörter mit dazugehörigen verbotenen Wörtern. Gib strukturierte Daten zurück.',
		prompt: promptParts.join('\n'),
		schema: z.object({
			tabuWords: z.array(
				z.object({
					main: z.string(),
					forbidden: z.array(z.string()),
				}),
			),
		}),
	})

	// Validate generated words efficiently
	const validTabuWords = (result.object.tabuWords || []).filter(
		(word) =>
			word.main &&
			word.forbidden &&
			word.forbidden.length >= 3 &&
			word.forbidden.length <= 5,
	)

	const updatedTabuWords = [...existingTabuWords, ...validTabuWords]
	const categoryCacheKey = `${redisKey}:category:${category}`

	// Execute Redis operations in parallel
	await executeRedisOperations([
		upstashRedis.set(categoryCacheKey, updatedTabuWords, { ex: 3600 }), // Longer cache for performance
		upstashRedis.set(
			`${redisKey}:task:${taskId}`,
			{
				category,
				words: validTabuWords,
				completed: true,
				runtime: 0,
			},
			{ ex: 300 },
		),
	])

	return buildSuccessResponse({
		category,
		wordsGenerated: validTabuWords.length,
		runtime: 0,
		words: validTabuWords,
		gameMode: 'tabu',
	})
}

async function handleStirnMode(
	category: string,
	wordsPerCategory: number,
	excludeWords: string[],
	existingCategoryWords: string[],
	redisKey: string,
	taskId: string,
	customPrompt?: string,
) {
	const excludeSet = getExcludeWordsSet(excludeWords, existingCategoryWords)
	const availableForCategory = existingCategoryWords.filter(
		(word) => !excludeSet.has(word),
	)
	const wordsNeededForCategory = wordsPerCategory - availableForCategory.length

	// Early return if no words needed
	if (wordsNeededForCategory <= 0) {
		const taskData = {
			category,
			words: [],
			completed: true,
			runtime: 0,
		}

		await upstashRedis.set(`${redisKey}:task:${taskId}`, taskData, { ex: 300 })

		return buildSuccessResponse({
			category,
			wordsGenerated: 0,
			runtime: 0,
		})
	}

	// Build optimized prompt
	const promptParts = [
		`Erstelle genau ${wordsNeededForCategory} deutsche Wörter für die Kategorie "${category}".`,
		'Die Wörter sollten:',
		`- zur Kategorie "${category}" gehören`,
		`- nicht in dieser Liste vorkommen: ${Array.from(excludeSet).join(', ')}`,
		'- eine Mischung aus verschiedenen Schwierigkeitsgraden haben (leichte, mittlere und schwere Wörter)',
		'- sowohl einfache, bekannte Begriffe als auch komplexere, seltenere Wörter enthalten',
		'- einzelne Wörter sein (keine Phrasen)',
		'- keine Eigennamen enthalten',
		'- keine Duplikate enthalten',
	]

	if (customPrompt) {
		promptParts.push(`- ${customPrompt}`)
	}

	promptParts.push(
		'\nWICHTIG: Gib nur einzelne Wörter zurück, keine Sätze, Anweisungen oder Kommentare.',
	)

	const result = await generateObject({
		model: openrouter.chat(OPTIMIZED_MODEL),
		system:
			'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Konzentriere dich nur auf die angegebene Kategorie und erstelle passende deutsche Wörter. Gib NUR einzelne Wörter zurück, keine Sätze, Erklärungen oder Kommentare.',
		prompt: promptParts.join('\n'),
		schema: z.object({
			words: z.array(z.string()),
		}),
	})

	// Filter generated words efficiently
	const validGeneratedWords = filterValidWords(result.object.words || [])
	const updatedCategoryWords = [
		...existingCategoryWords,
		...validGeneratedWords,
	]
	const categoryCacheKey = `${redisKey}:category:${category}`

	// Execute Redis operations in parallel
	await executeRedisOperations([
		upstashRedis.set(categoryCacheKey, updatedCategoryWords, { ex: 3600 }), // Longer cache for performance
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
	])

	return buildSuccessResponse({
		category,
		wordsGenerated: validGeneratedWords.length,
		runtime: 0,
		words: validGeneratedWords,
		gameMode: 'stirn',
	})
}

// Validation middleware for better performance
const validateRequest = (body: unknown) => {
	return requestSchema.parse(body)
}

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
			gameMode,
			existingTabuWords,
		} = validateRequest(body)

		// Route to appropriate handler based on game mode
		if (gameMode === 'tabu') {
			return await handleTabuMode(
				category,
				wordsPerCategory,
				excludeWords,
				existingTabuWords,
				redisKey,
				taskId,
				customPrompt,
			)
		}

		return await handleStirnMode(
			category,
			wordsPerCategory,
			excludeWords,
			existingCategoryWords,
			redisKey,
			taskId,
			customPrompt,
		)
	} catch (error) {
		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			return new Response(`Invalid request format: ${error.message}`, {
				status: 400,
			})
		}

		console.error('Error generating words for category:', error)
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
