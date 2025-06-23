import { OPEN_ROUTER_MODEL } from '@/src/app/group/constants'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { generateObject } from 'ai'
import { z } from 'zod'

const openrouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY,
})

// Optimized instruction keywords as a Set for O(1) lookup
const INSTRUCTION_KEYWORDS = new Set([
	'ersetze',
	'füge',
	'hinzu',
	'verbessern',
	'balance',
	'kategorie',
	'beispiel',
	'z.b.',
	'zum beispiel',
])

export function filterValidWords(words: string[]): string[] {
	return words.filter((word) => {
		// Quick length check first (most efficient)
		const trimmed = word.trim()
		if (trimmed.length > 30 || !trimmed) return false

		// Check for punctuation (faster than regex)
		if (
			trimmed.includes('.') ||
			trimmed.includes('!') ||
			trimmed.includes('?')
		) {
			return false
		}

		// Convert to lowercase once and check instruction keywords using Set
		const lowerWord = trimmed.toLowerCase()

		// Use some() with Set.has() for better performance
		for (const keyword of INSTRUCTION_KEYWORDS) {
			if (lowerWord.includes(keyword)) {
				return false
			}
		}

		return true
	})
}

export async function validateAndBalanceWords(
	words: string[],
	categories: string[],
	targetWordsPerCategory: number,
): Promise<{ words: string[]; isBalanced: boolean; suggestions?: string[] }> {
	const result = await generateObject({
		model: openrouter.chat(OPEN_ROUTER_MODEL),
		system:
			'Du bist ein Experte für Wortspiele und Kategorisierung. Analysiere die gegebenen Wörter und prüfe, ob sie gleichmäßig auf die Kategorien verteilt sind. Gib nur strukturierte Daten zurück, keine Kommentare oder Anweisungen in den Wörter-Arrays.',
		prompt: `Analysiere diese Wörter und prüfe, ob sie gleichmäßig auf die Kategorien ${categories.join(', ')} verteilt sind:
			
			Wörter: ${words.join(', ')}
			
			Ziel: ${targetWordsPerCategory} Wörter pro Kategorie
			Kategorien: ${categories.join(', ')}
			
			Überprüfe:
			1. Gehören die Wörter zu den richtigen Kategorien?
			2. Ist die Verteilung ausgewogen (ca. ${targetWordsPerCategory} Wörter pro Kategorie)?
			3. Sind alle Wörter zum Erraten geeignet?
			4. Keine Duplikate oder zu ähnliche Wörter. 

			
			Falls nötig, schlage nur einzelne Wörter vor (keine Sätze oder Erklärungen), um die Balance zu verbessern.
			
			WICHTIG: In "suggestions" nur einzelne Wörter angeben, keine Anweisungen oder Kommentare.`,
		schema: z.object({
			isBalanced: z.boolean(),
			categoryDistribution: z.record(z.array(z.string())),
			suggestions: z.array(z.string()).optional(),
			issues: z.array(z.string()).optional(),
		}),
	})

	return {
		words,
		isBalanced: result.object?.isBalanced || false,
		suggestions: result.object?.suggestions,
	}
}
