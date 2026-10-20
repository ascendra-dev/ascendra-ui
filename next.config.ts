import os from "node:os";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

// This machine's name, as Tailscale MagicDNS / Bonjour expose it: "zakas-macbook-air" and "zakas-macbook-air.local".
const machine = os.hostname().toLowerCase().replace(/\.local$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Next 16.4+ writes an AGENTS.md on `next dev` when an AI agent starts it — keep the tree clean.
  agentRules: false,
  // Dev only: let the app be opened by machine name — Tailscale (<machine>, <machine>.<tailnet>.ts.net), Bonjour
  // (<machine>.local) — not just localhost. Without it the dev server refuses its scripts to those hosts.
  allowedDevOrigins: ["*.ts.net", "*.local", machine],
};

export default withBundleAnalyzer(nextConfig);
