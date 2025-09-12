import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true, // 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;
