/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_EVENT_NAME: process.env.NEXT_PUBLIC_EVENT_NAME,
    NEXT_PUBLIC_EVENT_DATE: process.env.NEXT_PUBLIC_EVENT_DATE,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Internationalization (si necesitas i18n)
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },

  // Performance
  swcMinify: true,
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/tickets',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite para webhooks
        {
          source: '/api/webhooks/:path*',
          destination: '/api/webhooks/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
