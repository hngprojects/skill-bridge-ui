import type { NextConfig } from "next";

function imagePatternFromUrl(value: string | undefined): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
} | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return {
      protocol: url.protocol === "https:" ? "https" : "http",
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/uploads/**",
    };
  } catch {
    return null;
  }
}

const imageHostPatterns = [
  imagePatternFromUrl(process.env.NEXT_PUBLIC_API_URL),
  {
    protocol: "http" as const,
    hostname: "localhost",
    port: "8080",
    pathname: "/uploads/**",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    port: "8080",
    pathname: "/uploads/**",
  },
].filter((pattern): pattern is NonNullable<typeof pattern> => pattern !== null);

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
      ...imageHostPatterns,
    ],
  },
};

export default nextConfig;
