import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // basePath wird später via ICONY Reverse Proxy gesetzt
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blaulichtsingles.ch',
      },
    ],
  },
};

export default nextConfig;
