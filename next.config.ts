import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // ✅ required for static export in Next 16+
  images: {
    unoptimized: true, // required since Next.js 16 disables image optimizer for static exports
  },
  trailingSlash: true, // optional but helps with correct routing
};

export default nextConfig;
