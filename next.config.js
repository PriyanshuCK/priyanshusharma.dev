/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "https://priyanshusharma.dev/:slug",
        destination: "https://priyanshusharma.vercel.app/:slug", // Matched parameters can be used in the destination
        permanent: false,
      },
    ];
  },
});

module.exports = nextConfig;
