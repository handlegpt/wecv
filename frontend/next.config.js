/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable standalone output for Docker
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  }
}

module.exports = nextConfig 