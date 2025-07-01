/** @type {import('next').NextConfig} */
const nextConfig = {
// next.config.js

  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [];
  },

  matcher: ['/admin/:path*'],
   
   
};

export default nextConfig;
