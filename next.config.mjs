/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ORIGIN: process.env.API_ORIGIN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/heihei-arcade-storage/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nzgda-games.syd1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nzgda-games.syd1.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
