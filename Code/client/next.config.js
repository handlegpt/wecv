/** @type {import('next').NextConfig} */
module.exports = {
  // 移除已废弃的 swcMinify 选项
  reactStrictMode: true,
  output: 'standalone', // 支持 Docker 部署
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'wecv-ai.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // 允许开发环境跨域请求
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
}
