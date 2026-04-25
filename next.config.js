const path = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async redirects() {
    return [
      { source: '/blog', destination: '/projects', permanent: true },
      { source: '/blog/:path*', destination: '/projects/:path*', permanent: true },
    ];
  },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ],
  },
};

// next-remote-refresh rewrites next.config; Google Cloud / Firebase App Hosting
// adapters patch the same file and can hang on "Restoring original next config".
// Only enable the wrapper for local `next dev` (not `next build` or `next start`).
module.exports = process.argv.includes('dev')
  ? require('next-remote-refresh')({
      paths: [path.resolve(__dirname, 'src', 'contents')],
    })(nextConfig)
  : nextConfig;
