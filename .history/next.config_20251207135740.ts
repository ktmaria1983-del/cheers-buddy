import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    turbo: false, // 👈 disable Turbopack, use Webpack instead
  },
};

export default nextConfig;



