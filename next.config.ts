// next.config.ts
import { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const config: NextConfig = {
  // Your Next.js config options here
};

export default withPWA(config);
