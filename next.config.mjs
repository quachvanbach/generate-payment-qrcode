/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.vietqr.io",
        pathname: "**",
      },
    ],
  },
  routes: [
    {
      "src": "/api/vietqr",
      "dest": "/api/generate-json"
    }
  ]
};

export default nextConfig;
