/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Transpile Tambo SDK and its dependencies
  transpilePackages: [
    '@tambo-ai/react',
    '@tambo-ai/typescript-sdk',
    '@standard-community/standard-json',
  ],
};

export default nextConfig;
