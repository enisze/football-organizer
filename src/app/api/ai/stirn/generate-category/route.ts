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
			gameMode,
			existingTabuWords,
		} = requestSchema.parse(body)

		const categoryCacheKey = `${redisKey}:category:${category}`

		// Handle Tabu game mode differently
		if (gameMode === 'tabu') {
			// Calculate how many Tabu words we still need for this category
			const existingMainWords = existingTabuWords.map((word) => word.main)
			const availableTabuWords = existingMainWords.filter(
				(word) => !excludeWords.includes(word),
			)
			const tabuWordsNeeded = wordsPerCategory - availableTabuWords.length

			// Skip API call if no words are needed for this category
			if (tabuWordsNeeded <= 0) {
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
				model: openrouter.chat(OPEN_ROUTER_MODEL),
				system:
					'Du bist ein Assistent, der Tabu-Wörter für ein Ratespiel generiert. Erstelle deutsche Hauptwörter mit dazugehörigen verbotenen Wörtern. Gib strukturierte Daten zurück.',
				prompt: `Erstelle genau ${tabuWordsNeeded} deutsche Tabu-Wörter für die Kategorie "${category}".
					Für jedes Hauptwort erstelle 3-5 verbotene Wörter, die beim Erklären nicht verwendet werden dürfen.
					
					Die Hauptwörter sollten:
					- zur Kategorie "${category}" gehören
					- nicht in dieser Liste vorkommen: ${[...excludeWords, ...existingMainWords].join(', ')}
					- eine Mischung aus verschiedenen Schwierigkeitsgraden haben
					- einzelne Wörter sein (keine Phrasen)
					- keine Eigennamen enthalten
					
					Die verbotenen Wörter sollten:
					- die naheliegendsten Begriffe zum Erklären des Hauptworts sein
					- keine Wortteile des Hauptworts enthalten
					- sinnvolle Beschreibungen erschweren
					${customPromptInstruction ? `\n					- ${customPromptInstruction}` : ''}
					
					WICHTIG: Gib strukturierte Daten zurück mit Hauptwort und verbotenen Wörtern.`,
				schema: z.object({
					tabuWords: z.array(
						z.object({
							main: z.string(),
							forbidden: z.array(z.string()),
						}),
					),
				}),
			})

			// Validate the generated Tabu words
			const validTabuWords = (result.object.tabuWords || []).filter(
				(word) =>
					word.main &&
					word.forbidden &&
					word.forbidden.length >= 3 &&
					word.forbidden.length <= 5,
			)

			// Update category cache with new valid Tabu words
			const updatedTabuWords = [...existingTabuWords, ...validTabuWords]

			// Use Promise.all for parallel Redis operations
			const redisOperations = [
				upstashRedis.set(categoryCacheKey, updatedTabuWords),
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
			]

			// Execute Redis operations in parallel
			await Promise.allSettled(redisOperations)

			return new Response(
				JSON.stringify({
					success: true,
					category,
					wordsGenerated: validTabuWords.length,
					runtime: 0,
					words: validTabuWords, // Return the generated Tabu words
					gameMode: 'tabu',
				}),
				{
					headers: { 'Content-Type': 'application/json' },
				},
			)
		}

		// Default Stirn game mode (existing logic)
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
			model: openrouter.chat(OPEN_ROUTER_MODEL),
			system:
				'Du bist ein Assistent, der Wörter für ein Ratespiel generiert. Konzentriere dich nur auf die angegebene Kategorie und erstelle passende deutsche Wörter. Gib NUR einzelne Wörter zurück, keine Sätze, Erklärungen oder Kommentare.',
			prompt: `Erstelle genau ${wordsNeededForCategory} deutsche Wörter für die Kategorie "${category}".
				Die Wörter sollten:
				- zur Kategorie "${category}" gehören
				- nicht in dieser Liste vorkommen: ${[...excludeWords, ...existingCategoryWords].join(', ')}
				- eine Mischung aus verschiedenen Schwierigkeitsgraden haben (leichte, mittlere und schwere Wörter)
				- sowohl einfache, bekannte Begriffe als auch komplexere, seltenere Wörter enthalten
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
				words: validGeneratedWords, // Return the generated words
				gameMode: 'stirn',
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
