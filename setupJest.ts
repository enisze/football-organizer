import dotenv from 'dotenv'
import 'jest-puppeteer'

// order does matter. The first one has precedence.
try {
	dotenv.config({
		path: require.resolve('./.env.local')
	})
} catch (error) {
	// file does not exist in staging environment
}
try {
	dotenv.config({
		path: require.resolve('./.env')
	})
} catch (error) {
	console.log('no .env file found (only on github)')
}
