import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.ytimg.com",
      "i1.ytimg.com",
      "i2.ytimg.com",
      "i3.ytimg.com",
      "i4.ytimg.com",
      "i5.ytimg.com",
      "i6.ytimg.com",
      "i7.ytimg.com",
      "i8.ytimg.com",
      "i9.ytimg.com",
      "yt3.ggpht.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
