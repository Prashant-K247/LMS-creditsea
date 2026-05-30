import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // Use false if you plan to change the landing page later
      },
    ]
  },
};

export default nextConfig;
