import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/stealth-best-10', destination: '/jeju/best', permanent: true },
      { source: '/stealth-best-10/', destination: '/jeju/best', permanent: true },
      { source: '/ko/stealth-best-10', destination: '/jeju/best', permanent: true },
      { source: '/ko/stealth-best-10/', destination: '/jeju/best', permanent: true },
      { source: '/jeju/best/', destination: '/jeju/best', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["next-themes"],
  },
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aikoreadatalab.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 최우선, WebP 폴백
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
