/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_API_BASE_URL}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
