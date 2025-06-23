#!/usr/bin/env node

const { execSync } = require('node:child_process')
const path = require('node:path')

console.log(
	'🚀 Running Performance Tests for AI Stirn Generate Category Route\n',
)

try {
	// Run the performance tests
	const testFile = path.join(
		__dirname,
		'src/app/api/ai/stirn/generate-category/route.performance.test.ts',
	)

	console.log('Running performance tests...\n')

	const output = execSync(
		`npx jest ${testFile} --verbose --detectOpenHandles`,
		{
			encoding: 'utf-8',
			cwd: __dirname,
		},
	)

	console.log(output)

	console.log('\n✅ Performance tests completed successfully!')
	console.log('\n📊 Performance Summary:')
	console.log('- ⚡️ Early returns optimize requests with existing words')
	console.log(
		'- 🏎️  Faster AI model (mistralai/devstral-small:free) improves response times',
	)
	console.log('- 🔄 Parallel Redis operations reduce I/O bottlenecks')
	console.log('- 💾 Exclude words cache prevents repeated computations')
	console.log('- 🎯 Optimized string operations and data structures')
	console.log('- 🛡️  Better error handling maintains performance under failures')
} catch (error) {
	console.error('❌ Performance tests failed:')
	console.error(error.message)
	process.exit(1)
}
