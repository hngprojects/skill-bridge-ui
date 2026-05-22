import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.staging.skillbridge.hng14.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.skillbridge.hng14.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
