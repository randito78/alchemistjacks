const path = require('path');

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'contents')],
});

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
  },
  images: {
    domains: [
      'res.cloudinary.com',

      // Spotify Album
      'i.scdn.co',
    ],
  },
};

module.exports = withRemoteRefresh(nextConfig);
