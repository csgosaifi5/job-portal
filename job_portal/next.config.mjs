/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS, // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST,PATCH, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, content", // Added 'content' here
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Allow credentials
          },
        ],
      },
    ];
  },
};

export default nextConfig;
