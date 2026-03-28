/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
