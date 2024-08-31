import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist/.next',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default withNextIntl(nextConfig);
