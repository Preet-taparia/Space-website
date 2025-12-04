/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ❗ TEMPORARY: allows production builds to succeed even if ESLint errors exist.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
