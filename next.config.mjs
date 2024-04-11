/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  },
};

export default nextConfig;
