import bundleAnalyzer from '@next/bundle-analyzer'

const plugins = []

plugins.push(
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  }),
)

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverActions: true,
  },
  transpilePackages: ['@trpc/next-layout'],
}

export default plugins.reduce((config, plugin) => plugin(config), config)
