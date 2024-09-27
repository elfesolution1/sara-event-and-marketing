/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Existing localhost configuration
        hostname: "localhost",
      },
      {
        protocol: "https", // Correct protocol
        hostname: "via.assets.so", // New hostname
        pathname: "/**", // Allow images from any path under this hostname
      },
      {
        protocol: "https", // Correct protocol
        hostname: "via.placeholder.com", // New hostname without leading slash
        pathname: "/**", // Allow images from any path under this hostname
      },
    ],
  },
};

export default nextConfig;
