import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Dev only: let the app be opened from another device over Tailscale (http://<machine>.<tailnet>.ts.net:<port>).
  allowedDevOrigins: ["*.ts.net"],
};

export default withBundleAnalyzer(nextConfig);
