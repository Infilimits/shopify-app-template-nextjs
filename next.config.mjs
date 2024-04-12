import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack(config) {
    const __dirname = new URL(".", import.meta.url).pathname;

    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
  env: {
    PUBLIC_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  },
};

export default nextConfig;
