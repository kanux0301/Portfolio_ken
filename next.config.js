/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Enable standalone output for Docker
  output: 'standalone',
  
  // React strict mode
  reactStrictMode: true,
  
  // Use SWC minifier
  swcMinify: true,
  
  // Compress responses
  compress: true,
  
  // Remove powered by header
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig