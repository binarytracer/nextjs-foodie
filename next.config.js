/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rod-nextjs-foodie-images-v2.s3.ap-southeast-2.amazonaws.com",
        // port: "",
        // search: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
