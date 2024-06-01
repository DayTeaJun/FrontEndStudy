/** @type {import('next').NextConfig} */
// 외부에서 이미지를 가져올 때, 보안상의 이유가 있을 수 있어서, 외부 이미지 허용
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
