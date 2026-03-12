import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Sanity Studio embedded in Next.js
  transpilePackages: ['next-sanity'],
  // Prevent server-side bundling of Sanity packages (studio is client-only)
  serverExternalPackages: ['sanity', '@sanity/vision'],
};

export default nextConfig;
