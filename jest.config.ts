import type { Config } from 'jest'

const config: Config = {
	verbose: true,
	preset: 'jest-puppeteer',
	setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx|mjs)$': [
			'ts-jest',
			{
				babelConfig: true
			}
		]
	},
	moduleNameMapper: {
		'^@/(.*)': '<rootDir>/$1'
	}
}

export default config
