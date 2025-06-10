// Test file to verify the parallel STIRN API implementation
// Run with: npx tsx src/app/api/ai/stirn/test-parallel.ts

import { config } from 'dotenv-flow'

// Load environment variables
config()

async function testStirNParallelAPI() {
	const baseUrl = 'http://localhost:3000'

	const testRequest = {
		guessedWords: ['Hund', 'Katze'],
		wordsNeeded: 20,
		redisKey: 'test-parallel-api',
		apiKey: process.env.STIRN_QUIZ_API_KEY,
		categories: ['Tiere', 'Essen', 'Sport'],
		prompt: 'Erstelle einfache deutsche Wörter',
	}

	console.log('Testing parallel STIRN API...')
	console.log('Request:', JSON.stringify(testRequest, null, 2))

	const startTime = Date.now()

	try {
		const response = await fetch(`${baseUrl}/api/ai/stirn`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(testRequest),
		})

		const result = await response.json()
		const totalTime = Date.now() - startTime

		console.log(`\nResponse received in ${totalTime}ms:`)
		console.log('Status:', response.status)
		console.log('Result:', JSON.stringify(result, null, 2))

		if (result.words) {
			console.log(`\nReceived ${result.words.length} words:`)
			result.words.forEach((word: string, index: number) => {
				console.log(`${index + 1}. ${word}`)
			})
		}
	} catch (error) {
		console.error('Error testing API:', error)
	}
}

// Run the test
testStirNParallelAPI()
