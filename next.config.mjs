/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload",
        destination: "/api/upload",
      },
    ];
  },
};

export default nextConfig;
