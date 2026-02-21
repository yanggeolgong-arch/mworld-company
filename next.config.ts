import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/jeju-best-10', destination: '/reports/jeju-best-10', permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ["next-themes"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aijeju.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 최우선, WebP 폴백
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
