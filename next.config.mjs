/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/images/**', // Adjust the path if necessary
      },
    ],
  },
  // other Next.js config options can go here
};

export default nextConfig;
