/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporariamente desabilitado para teste de loading
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
