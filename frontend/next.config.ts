import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  // ...
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [];
  },
  matcher: ["/admin/:path*", "/employee/:path*", "/profile"],
};
;


export default nextConfig;
