/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'multimedia.metrocuadrado.com',
      'bayut-production.s3.eu-central-1.amazonaws.com'
    ],
  },
};

export default nextConfig;
