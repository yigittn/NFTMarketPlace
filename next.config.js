/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_APP_MORALIS_API_KEY: process.env.NEXT_APP_MORALIS_API_KEY,
  },
};

module.exports = nextConfig;
