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
	transpilePackages: ['@trpc/next-layout'],
	experimental: {
		useCache: true,
		// dynamicIO: true,
	},
}

export default plugins.reduce((config, plugin) => plugin(config), config)
