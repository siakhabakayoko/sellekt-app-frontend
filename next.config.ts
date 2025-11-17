import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com", "dashboard.codeparrot.ai", "another-domain.com"],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        '@vercel/turbopack-next/internal/font/google/font': 'next/font/google'
      }
    }
  }
};

export default nextConfig;
