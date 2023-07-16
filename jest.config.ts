import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(redlock)/)'],
}

export default config
