import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: '/api/config/:path*',
        destination: 'http://127.0.0.1:8001/api/config/:path*',
      },
    ];
  },
};

export default nextConfig;
