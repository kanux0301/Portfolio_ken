/** @type {import('next').NextConfig} */
const nextConfig = {
 
  output: 'standalone',
  
  reactStrictMode: true,
  
  swcMinify: true,
  
  compress: true,
  
  poweredByHeader: false,
  
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false, 
  },
  
  trailingSlash: true,
  
}

module.exports = nextConfig