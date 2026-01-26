import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aijeju.co.kr',
      },
    ],
  },
};

export default nextConfig;
