import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['dev-www-cms.twreporter.org'],
  },
  serverExternalPackages: ['pino', 'pino-pretty'],
  transpilePackages: ['@twreporter/react-typescript-components']
}

export default nextConfig
