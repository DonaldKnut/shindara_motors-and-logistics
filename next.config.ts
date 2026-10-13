import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Avoid incorrect workspace root detection when other lockfiles exist on the machine
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
