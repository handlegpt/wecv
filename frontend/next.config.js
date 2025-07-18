/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static exports for Docker
  output: 'standalone'
}

module.exports = nextConfig 