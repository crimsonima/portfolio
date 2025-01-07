import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enforces React best practices
  compiler: {
    styledComponents: true, // Enables SSR support for styled-components
  },
};

export default nextConfig;
