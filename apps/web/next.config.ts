import type { NextConfig } from "next";

const GLSL_PATTERN = /\.glsl$/;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["@repo/design-system"],
  turbopack: {
    rules: {
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: GLSL_PATTERN,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
