/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@bb-music/app', '@bb-music/bb-types', '@bb-music/sdk-bili', '@bb-music/web'],
};

export default nextConfig;
