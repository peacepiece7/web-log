/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com', 'avatars.githubusercontent.com'],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
