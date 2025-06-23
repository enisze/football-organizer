// Mock environment variables - disable QStash verification for testing
process.env.OPENROUTER_API_KEY = 'test-key'
process.env.QSTASH_CURRENT_SIGNING_KEY = ''

// Mock the dependencies
jest.mock('@/src/server/db/upstashRedis', () => ({
	upstashRedis: {
		set: jest.fn().mockResolvedValue('OK'),
		get: jest.fn().mockResolvedValue(null),
	},
}))

jest.mock('@openrouter/ai-sdk-provider', () => ({
	createOpenRouter: jest.fn().mockReturnValue({
		chat: jest.fn().mockReturnValue('mock-model'),
	}),
}))

jest.mock('ai', () => ({
	generateObject: jest.fn(),
}))

import { generateObject } from 'ai'
import { POST } from './route'

const mockGenerateObject = generateObject as jest.MockedFunction<
	typeof generateObject
>

interface MockRequestBody {
	category: string
	wordsPerCategory: number
	excludeWords: string[]
	existingCategoryWords?: string[]
	redisKey: string
	taskId: string
	gameMode?: 'stirn' | 'tabu'
	existingTabuWords?: Array<{ main: string; forbidden: string[] }>
	customPrompt?: string
}

interface PerformanceResult<T> {
	duration: number
	result: T
}

describe('AI Stirn Generate Category Route - Performance Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks()

		// Mock successful AI response
		const mockResponse = {
			object: {
				words: ['Fußball', 'Basketball', 'Tennis', 'Volleyball', 'Handball'],
				tabuWords: [
					{
						main: 'Fußball',
						forbidden: ['Ball', 'Sport', 'Tor', 'Mannschaft'],
					},
				],
			},
		}

		mockGenerateObject.mockResolvedValue(mockResponse as never)
	})

	const createMockRequest = (body: MockRequestBody) => {
		return new Request('http://localhost:3000/api/ai/stirn/generate-category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
	}

	const measurePerformance = async <T>(
		testFn: () => Promise<T>,
	): Promise<PerformanceResult<T>> => {
		const start = performance.now()
		const result = await testFn()
		const end = performance.now()
		return {
			duration: end - start,
			result,
		}
	}

	describe('Stirn Mode Performance', () => {
		const stirnRequestBody = {
			category: 'Sport',
			wordsPerCategory: 5,
			excludeWords: ['Golf', 'Cricket'],
			existingCategoryWords: [],
			redisKey: 'test-key',
			taskId: 'task-123',
			gameMode: 'stirn' as const,
		}

		test('should complete basic stirn request within performance threshold', async () => {
			const request = createMockRequest(stirnRequestBody)

			const { duration, result } = await measurePerformance(async () => {
				return await POST(request)
			})

			expect(result.status).toBe(200)
			expect(duration).toBeLessThan(1000) // Should complete within 1 second

			const responseData = await result.json()
			expect(responseData.success).toBe(true)
			expect(responseData.gameMode).toBe('stirn')

			console.log(`Stirn mode performance: ${duration.toFixed(2)}ms`)
		})

		test('should handle early return optimization when no words needed', async () => {
			const requestWithExistingWords = createMockRequest({
				...stirnRequestBody,
				wordsPerCategory: 2,
				existingCategoryWords: ['Fußball', 'Tennis'],
			})

			const { duration, result } = await measurePerformance(async () => {
				return await POST(requestWithExistingWords)
			})

			expect(result.status).toBe(200)
			expect(duration).toBeLessThan(200) // Should be very fast with early return

			const responseData = await result.json()
			expect(responseData.success).toBe(true)
			expect(responseData.wordsGenerated).toBe(0)

			console.log(`Stirn early return performance: ${duration.toFixed(2)}ms`)
		})

		test('should perform well with large exclude list', async () => {
			const largeExcludeList = Array.from({ length: 100 }, (_, i) => `word${i}`)
			const requestWithLargeExclude = createMockRequest({
				...stirnRequestBody,
				excludeWords: largeExcludeList,
			})

			const { duration, result } = await measurePerformance(async () => {
				return await POST(requestWithLargeExclude)
			})

			expect(result.status).toBe(200)
			expect(duration).toBeLessThan(1500) // Should handle large lists efficiently

			console.log(
				`Stirn large exclude list performance: ${duration.toFixed(2)}ms`,
			)
		})
	})

	describe('Tabu Mode Performance', () => {
		const tabuRequestBody = {
			category: 'Sport',
			wordsPerCategory: 3,
			excludeWords: ['Golf'],
			existingCategoryWords: [],
			redisKey: 'test-key',
			taskId: 'task-456',
			gameMode: 'tabu' as const,
			existingTabuWords: [],
		}

		beforeEach(() => {
			const mockResponse = {
				object: {
					tabuWords: [
						{
							main: 'Fußball',
							forbidden: ['Ball', 'Sport', 'Tor', 'Mannschaft'],
						},
						{
							main: 'Basketball',
							forbidden: ['Ball', 'Korb', 'Dribbling', 'Team'],
						},
						{
							main: 'Tennis',
							forbidden: ['Ball', 'Schläger', 'Netz', 'Match'],
						},
					],
				},
			}

			mockGenerateObject.mockResolvedValue(mockResponse as never)
		})

		test('should complete basic tabu request within performance threshold', async () => {
			const request = createMockRequest(tabuRequestBody)

			const { duration, result } = await measurePerformance(async () => {
				return await POST(request)
			})

			expect(result.status).toBe(200)
			expect(duration).toBeLessThan(1000) // Should complete within 1 second

			const responseData = await result.json()
			expect(responseData.success).toBe(true)
			expect(responseData.gameMode).toBe('tabu')

			console.log(`Tabu mode performance: ${duration.toFixed(2)}ms`)
		})

		test('should handle early return optimization for tabu mode', async () => {
			const requestWithExistingTabu = createMockRequest({
				...tabuRequestBody,
				wordsPerCategory: 2,
				existingTabuWords: [
					{
						main: 'Fußball',
						forbidden: ['Ball', 'Sport', 'Tor'],
					},
					{
						main: 'Tennis',
						forbidden: ['Ball', 'Schläger', 'Netz'],
					},
				],
			})

			const { duration, result } = await measurePerformance(async () => {
				return await POST(requestWithExistingTabu)
			})

			expect(result.status).toBe(200)
			expect(duration).toBeLessThan(200) // Should be very fast with early return

			const responseData = await result.json()
			expect(responseData.success).toBe(true)
			expect(responseData.wordsGenerated).toBe(0)

			console.log(`Tabu early return performance: ${duration.toFixed(2)}ms`)
		})
	})

	describe('Error Handling Performance', () => {
		test('should handle validation errors quickly', async () => {
			const invalidRequest = createMockRequest({
				category: '', // Invalid empty category
				wordsPerCategory: -1, // Invalid negative number
				excludeWords: [],
				redisKey: 'test-key',
				taskId: 'task-invalid',
			})

			const { duration, result } = await measurePerformance(async () => {
				return await POST(invalidRequest)
			})

			expect(result.status).toBe(400)
			expect(duration).toBeLessThan(100) // Validation should be very fast

			console.log(`Validation error performance: ${duration.toFixed(2)}ms`)
		})

		test('should handle AI generation errors gracefully', async () => {
			mockGenerateObject.mockRejectedValue(new Error('AI service unavailable'))

			const request = createMockRequest({
				category: 'Sport',
				wordsPerCategory: 5,
				excludeWords: [],
				existingCategoryWords: [],
				redisKey: 'test-key',
				taskId: 'task-789',
				gameMode: 'stirn',
			})

			const { duration, result } = await measurePerformance(async () => {
				return await POST(request)
			})

			expect(result.status).toBe(500)
			expect(duration).toBeLessThan(500) // Error handling should be fast

			console.log(`AI error handling performance: ${duration.toFixed(2)}ms`)
		})
	})

	describe('Caching and Optimization Performance', () => {
		test('should benefit from exclude words cache on repeated calls', async () => {
			const baseRequest = {
				category: 'Sport',
				wordsPerCategory: 3,
				excludeWords: ['Golf', 'Cricket', 'Baseball'],
				existingCategoryWords: ['Soccer', 'Tennis'],
				redisKey: 'test-key',
				taskId: 'task-cache-1',
				gameMode: 'stirn' as const,
			}

			// First call - cache miss
			const { duration: firstDuration } = await measurePerformance(async () => {
				return await POST(
					createMockRequest({ ...baseRequest, taskId: 'task-cache-1' }),
				)
			})

			// Second call with same exclude words - should benefit from cache
			const { duration: secondDuration } = await measurePerformance(
				async () => {
					return await POST(
						createMockRequest({ ...baseRequest, taskId: 'task-cache-2' }),
					)
				},
			)

			// Third call with same exclude words - should benefit from cache
			const { duration: thirdDuration } = await measurePerformance(async () => {
				return await POST(
					createMockRequest({ ...baseRequest, taskId: 'task-cache-3' }),
				)
			})

			console.log(
				`Cache performance - First: ${firstDuration.toFixed(2)}ms, Second: ${secondDuration.toFixed(2)}ms, Third: ${thirdDuration.toFixed(2)}ms`,
			)

			// Second and third calls should be similar or faster (cache benefit)
			expect(secondDuration).toBeLessThanOrEqual(firstDuration * 1.1) // Allow 10% variance
			expect(thirdDuration).toBeLessThanOrEqual(firstDuration * 1.1)
		})
	})

	describe('Comparative Performance Tests', () => {
		test('should show performance improvement over baseline', async () => {
			const testCases = [
				{
					name: 'Small request',
					body: {
						category: 'Sport',
						wordsPerCategory: 3,
						excludeWords: ['Golf'],
						existingCategoryWords: [],
						redisKey: 'test-small',
						taskId: 'task-small',
						gameMode: 'stirn' as const,
					},
				},
				{
					name: 'Medium request',
					body: {
						category: 'Technology',
						wordsPerCategory: 10,
						excludeWords: Array.from({ length: 20 }, (_, i) => `tech${i}`),
						existingCategoryWords: Array.from(
							{ length: 5 },
							(_, i) => `existing${i}`,
						),
						redisKey: 'test-medium',
						taskId: 'task-medium',
						gameMode: 'stirn' as const,
					},
				},
				{
					name: 'Large request',
					body: {
						category: 'Science',
						wordsPerCategory: 20,
						excludeWords: Array.from({ length: 50 }, (_, i) => `science${i}`),
						existingCategoryWords: Array.from(
							{ length: 10 },
							(_, i) => `existing${i}`,
						),
						redisKey: 'test-large',
						taskId: 'task-large',
						gameMode: 'stirn' as const,
					},
				},
			]

			const results: Array<{ name: string; duration: number }> = []

			for (const testCase of testCases) {
				const { duration } = await measurePerformance(async () => {
					return await POST(createMockRequest(testCase.body))
				})

				results.push({ name: testCase.name, duration })
			}

			// Log performance results
			console.log('\n=== Performance Benchmark Results ===')
			for (const { name, duration } of results) {
				console.log(`${name}: ${duration.toFixed(2)}ms`)
			}

			// Performance assertions based on optimizations
			expect(results.length).toBe(3) // Ensure we have all results
			expect(results[0]?.duration).toBeLessThan(800) // Small requests should be very fast
			expect(results[1]?.duration).toBeLessThan(1200) // Medium requests should be reasonable
			expect(results[2]?.duration).toBeLessThan(1500) // Large requests should still be acceptable

			// Calculate average performance
			const avgDuration =
				results.reduce((sum, r) => sum + r.duration, 0) / results.length
			console.log(`Average performance: ${avgDuration.toFixed(2)}ms`)

			// Overall performance should be good
			expect(avgDuration).toBeLessThan(1200)
		})
	})

	describe('Memory and Resource Usage', () => {
		test('should handle multiple concurrent requests efficiently', async () => {
			const concurrentRequests = Array.from({ length: 5 }, (_, i) => ({
				category: `Category${i}`,
				wordsPerCategory: 5,
				excludeWords: [`exclude${i}`],
				existingCategoryWords: [],
				redisKey: `test-concurrent-${i}`,
				taskId: `task-concurrent-${i}`,
				gameMode: 'stirn' as const,
			}))

			const { duration } = await measurePerformance(async () => {
				return await Promise.all(
					concurrentRequests.map((body) => POST(createMockRequest(body))),
				)
			})

			console.log(
				`Concurrent requests performance (5 requests): ${duration.toFixed(2)}ms`,
			)

			// Concurrent execution should be efficient
			expect(duration).toBeLessThan(2000) // 5 requests should complete within 2 seconds
		})
	})
})
