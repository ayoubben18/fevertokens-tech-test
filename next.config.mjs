/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow images

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
