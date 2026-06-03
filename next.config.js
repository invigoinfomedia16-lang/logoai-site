/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.logo.ai',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Old root-level preview pages were deleted. Permanent-redirect any
  // residual traffic to the equivalent prelaunch route (or the
  // prelaunch home if no equivalent exists). Keeps SEO and any
  // external links pointing at the old URLs from 404-ing.
  async redirects() {
    return [
      { source: '/about',       destination: '/prelaunch/about',       permanent: true },
      { source: '/our-story',   destination: '/prelaunch/our-story',   permanent: true },
      { source: '/faq',         destination: '/prelaunch/faq',         permanent: true },
      { source: '/leadership',  destination: '/prelaunch',             permanent: true },
      { source: '/press',       destination: '/prelaunch',             permanent: true },
      { source: '/why-logo-ai', destination: '/prelaunch',             permanent: true },
      { source: '/design-k',    destination: '/prelaunch',             permanent: true },
    ]
  },
}

module.exports = nextConfig
