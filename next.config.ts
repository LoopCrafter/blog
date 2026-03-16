import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "watchful-hawk-785.eu-west-1.convex.cloud",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
