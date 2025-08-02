import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import withVercelToolbar from '@vercel/toolbar/plugins/next';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const vercelToolbar = withVercelToolbar();

const nextConfig: NextConfig = {
  /* config options here */
};

// Chain the plugins - order matters
export default bundleAnalyzer(
  vercelToolbar(nextConfig)
);
