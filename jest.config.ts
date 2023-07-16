import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
}

export default config
