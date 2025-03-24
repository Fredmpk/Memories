// next.config.ts
import { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest\.json$/], // ✅ Prevents Workbox from caching missing files
});

const config: NextConfig = {
  reactStrictMode: true, // ✅ Make sure to include this
  swcMinify: true, // Optional, but recommended for performance
};

export default withPWA(config);
