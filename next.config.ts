import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
};

export default nextConfig;
