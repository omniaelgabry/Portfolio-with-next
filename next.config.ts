import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ynn787qihi.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
