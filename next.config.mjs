// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 *
 */

import withBundleAnalyzer from '@next/bundle-analyzer'

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env/server.mjs'))

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: false,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: { subsets: ['latin'] },
      },
    ],
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
}

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })({
  config,
})
