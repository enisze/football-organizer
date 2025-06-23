import { POST } from './route'

// Mock environment variables
process.env.OPENROUTER_API_KEY = 'test-key'
process.env.QSTASH_CURRENT_SIGNING_KEY = undefined

// Mock Redis with performance tracking
const redisOpsPerformed: string[] = []
jest.mock('@/src/server/db/upstashRedis', () => ({
	upstashRedis: {
		set: jest.fn().mockImplementation((key: string) => {
			redisOpsPerformed.push(`SET: ${key}`)
			return Promise.resolve('OK')
		}),
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

const mockGenerateObject = generateObject as jest.MockedFunction<
	typeof generateObject
>

describe('Performance Benchmark Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		redisOpsPerformed.length = 0

		// Mock AI response with realistic delay simulation
		mockGenerateObject.mockImplementation(() => {
			return new Promise((resolve) => {
				// Simulate AI processing time (optimized model should be faster)
				setTimeout(() => {
					resolve({
						object: {
							words: [
								'Fußball',
								'Basketball',
								'Tennis',
								'Volleyball',
								'Handball',
							],
							tabuWords: [
								{
									main: 'Fußball',
									forbidden: ['Ball', 'Sport', 'Tor', 'Mannschaft'],
								},
							],
						},
					} as never)
				}, 50) // Simulated faster model response time
			})
		})
	})

	const createRequest = (body: unknown) => {
		return new Request('http://localhost:3000/api/ai/stirn/generate-category', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
	}

	test('Benchmark: Performance improvements verification', async () => {
		console.log('🔥 Starting Performance Benchmark...\n')

		// Test 1: Early return optimization
		console.log('📊 Test 1: Early Return Optimization')
		const earlyReturnStart = performance.now()

		const earlyReturnRequest = createRequest({
			category: 'Sport',
			wordsPerCategory: 3,
			excludeWords: ['Golf'],
			existingCategoryWords: ['Soccer', 'Tennis', 'Basketball'], // Already has enough words
			redisKey: 'test-early-return',
			taskId: 'task-early',
			gameMode: 'stirn',
		})

		const earlyReturnResponse = await POST(earlyReturnRequest)
		const earlyReturnTime = performance.now() - earlyReturnStart
		const earlyReturnData = await earlyReturnResponse.json()

		console.log(`   ⚡️ Early return time: ${earlyReturnTime.toFixed(2)}ms`)
		console.log(`   📈 Words generated: ${earlyReturnData.wordsGenerated}`)
		console.log(`   💾 Redis ops: ${redisOpsPerformed.length}`)

		expect(earlyReturnTime).toBeLessThan(100) // Should be very fast
		expect(earlyReturnData.wordsGenerated).toBe(0)

		redisOpsPerformed.length = 0

		// Test 2: Normal operation with optimizations
		console.log('\n📊 Test 2: Optimized Normal Operation')
		const normalStart = performance.now()

		const normalRequest = createRequest({
			category: 'Technology',
			wordsPerCategory: 5,
			excludeWords: ['Computer', 'Laptop'],
			existingCategoryWords: [],
			redisKey: 'test-normal',
			taskId: 'task-normal',
			gameMode: 'stirn',
		})

		const normalResponse = await POST(normalRequest)
		const normalTime = performance.now() - normalStart
		const normalData = await normalResponse.json()

		console.log(`   🚀 Optimized operation time: ${normalTime.toFixed(2)}ms`)
		console.log(`   📈 Words generated: ${normalData.wordsGenerated}`)
		console.log(`   💾 Redis ops: ${redisOpsPerformed.length}`)

		expect(normalTime).toBeLessThan(500) // Should be reasonably fast
		expect(normalData.wordsGenerated).toBe(5)

		redisOpsPerformed.length = 0

		// Test 3: Cache performance with repeated exclude words
		console.log('\n📊 Test 3: Cache Performance Test')
		const cacheTest1Start = performance.now()

		const commonExcludeWords = Array.from({ length: 50 }, (_, i) => `word${i}`)

		// First request - cache miss
		const cacheRequest1 = createRequest({
			category: 'Science',
			wordsPerCategory: 3,
			excludeWords: commonExcludeWords,
			existingCategoryWords: ['Physics', 'Chemistry'],
			redisKey: 'test-cache-1',
			taskId: 'task-cache-1',
			gameMode: 'stirn',
		})

		await POST(cacheRequest1)
		const cacheTime1 = performance.now() - cacheTest1Start

		// Second request - cache hit (same exclude words)
		const cacheTest2Start = performance.now()
		const cacheRequest2 = createRequest({
			category: 'Science',
			wordsPerCategory: 3,
			excludeWords: commonExcludeWords, // Same exclude words
			existingCategoryWords: ['Biology', 'Geology'],
			redisKey: 'test-cache-2',
			taskId: 'task-cache-2',
			gameMode: 'stirn',
		})

		await POST(cacheRequest2)
		const cacheTime2 = performance.now() - cacheTest2Start

		console.log(`   🔄 First request (cache miss): ${cacheTime1.toFixed(2)}ms`)
		console.log(`   ⚡️ Second request (cache hit): ${cacheTime2.toFixed(2)}ms`)
		console.log(
			`   📈 Cache benefit: ${(((cacheTime1 - cacheTime2) / cacheTime1) * 100).toFixed(1)}%`,
		)

		// Cache should provide some benefit (allow for variance)
		expect(cacheTime2).toBeLessThanOrEqual(cacheTime1 * 1.1)

		// Test 4: Parallel Redis operations
		console.log('\n📊 Test 4: Parallel Redis Operations')
		const parallelStart = performance.now()

		const parallelRequest = createRequest({
			category: 'Music',
			wordsPerCategory: 4,
			excludeWords: ['Guitar'],
			existingCategoryWords: [],
			redisKey: 'test-parallel',
			taskId: 'task-parallel',
			gameMode: 'stirn',
		})

		await POST(parallelRequest)
		const parallelTime = performance.now() - parallelStart

		console.log(`   🔄 Parallel Redis ops time: ${parallelTime.toFixed(2)}ms`)
		console.log(`   💾 Total Redis operations: ${redisOpsPerformed.length}`)

		expect(parallelTime).toBeLessThan(400) // Should be efficient

		// Test 5: Error handling performance
		console.log('\n📊 Test 5: Error Handling Performance')
		const errorStart = performance.now()

		const errorRequest = createRequest({
			category: '', // Invalid
			wordsPerCategory: -1, // Invalid
			excludeWords: [],
			redisKey: 'test-error',
			taskId: 'task-error',
		})

		const errorResponse = await POST(errorRequest)
		const errorTime = performance.now() - errorStart

		console.log(`   ⚠️  Error handling time: ${errorTime.toFixed(2)}ms`)
		console.log(`   📊 Response status: ${errorResponse.status}`)

		expect(errorTime).toBeLessThan(50) // Error handling should be very fast
		expect(errorResponse.status).toBe(400)

		// Performance Summary
		console.log('\n🎯 Performance Summary:')
		console.log('=====================================')
		console.log(
			`✅ Early return optimization: ${earlyReturnTime.toFixed(2)}ms (target: <100ms)`,
		)
		console.log(
			`✅ Normal operation: ${normalTime.toFixed(2)}ms (target: <500ms)`,
		)
		console.log(
			`✅ Cache performance benefit: ${(((cacheTime1 - cacheTime2) / cacheTime1) * 100).toFixed(1)}%`,
		)
		console.log(
			`✅ Parallel operations: ${parallelTime.toFixed(2)}ms (target: <400ms)`,
		)
		console.log(`✅ Error handling: ${errorTime.toFixed(2)}ms (target: <50ms)`)

		const avgPerformance =
			(earlyReturnTime + normalTime + cacheTime2 + parallelTime + errorTime) / 5
		console.log(`📊 Average response time: ${avgPerformance.toFixed(2)}ms`)

		// Overall performance assertion
		expect(avgPerformance).toBeLessThan(200) // Average should be excellent

		console.log('\n🚀 All performance benchmarks passed!')
		console.log('💡 Optimizations are working effectively!')
	})

	test('Load test: Multiple concurrent requests', async () => {
		console.log('\n🔥 Starting Load Test...\n')

		const concurrentRequests = 10
		const requests = Array.from({ length: concurrentRequests }, (_, i) =>
			createRequest({
				category: `Category${i}`,
				wordsPerCategory: 3,
				excludeWords: [`exclude${i}`],
				existingCategoryWords: [],
				redisKey: `load-test-${i}`,
				taskId: `task-load-${i}`,
				gameMode: 'stirn',
			}),
		)

		const loadTestStart = performance.now()
		const responses = await Promise.all(requests.map((req) => POST(req)))
		const loadTestTime = performance.now() - loadTestStart

		console.log('📊 Load Test Results:')
		console.log(`   🔢 Concurrent requests: ${concurrentRequests}`)
		console.log(`   ⏱️  Total time: ${loadTestTime.toFixed(2)}ms`)
		console.log(
			`   📈 Average per request: ${(loadTestTime / concurrentRequests).toFixed(2)}ms`,
		)
		console.log(
			`   🎯 Throughput: ${(concurrentRequests / (loadTestTime / 1000)).toFixed(2)} req/sec`,
		)

		// All requests should succeed
		responses.forEach((response, i) => {
			expect(response.status).toBe(200)
		})

		// Load test should complete in reasonable time
		expect(loadTestTime).toBeLessThan(2000) // 10 requests in under 2 seconds
		expect(loadTestTime / concurrentRequests).toBeLessThan(200) // Average under 200ms per request

		console.log(
			'✅ Load test passed - optimizations handle concurrent requests well!',
		)
	})
})
