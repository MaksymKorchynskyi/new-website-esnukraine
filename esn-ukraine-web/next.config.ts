import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@sanity/icons', '@sanity/ui', '@sanity/util', 'sanity', 'lucide-react'],
  },
  async redirects() {
    return [
      { source: '/what-esn-ukraine', destination: '/about-us', permanent: true },
      { source: '/our-impact', destination: '/projects', permanent: true },
      
      { source: '/our-team', destination: '/national-board', permanent: true },
      { source: '/national-team', destination: '/national-board', permanent: true },
      { source: '/our-team/alumni', destination: '/our-history', permanent: true },
      { source: '/our-team/former-boards', destination: '/our-history', permanent: true },
      
      { source: '/national-erasmus-office', destination: '/about-us', permanent: true },
      { source: '/partners', destination: '/about-us', permanent: true },
      
      { source: '/esn-:section', destination: '/our-sections/esn-:section', permanent: true },

      { source: '/erasmus', destination: '/for-students/erasmus', permanent: true },
      { source: '/academic-mobility', destination: '/for-students/erasmus', permanent: true },
      { source: '/erasmus-mundus-master-programmes', destination: '/for-students/erasmus', permanent: true },
      { source: '/erasmus-trainings-and-exchanges', destination: '/for-students/erasmus', permanent: true },
      
      { source: '/esncard', destination: '/for-students/esncard', permanent: true },
      { source: '/partners/:slug*', destination: '/for-students/esncard', permanent: true },
      
      { source: '/buddy-system', destination: '/for-students/buddy', permanent: true },
      { source: '/survival-guide', destination: '/for-students/survival-guide', permanent: true },
      { source: '/housing', destination: '/for-students/survival-guide', permanent: true },
      { source: '/incoming-students', destination: '/for-students', permanent: true },
      { source: '/european-solidarity-corps', destination: '/for-students', permanent: true },

      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/tags/:tag*', destination: '/news', permanent: true },
      { source: '/blog/:year/:month/:day/:slug', destination: '/news', permanent: true },
      
      { source: '/erasmus-career-fair-odesa', destination: '/events', permanent: true },
    ];
  },
};

export default nextConfig;