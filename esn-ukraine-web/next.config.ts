import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    optimizePackageImports: ['@sanity/icons', '@sanity/ui', '@sanity/util', 'sanity', 'lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      // =============================================
      // SEO REDIRECTS: Старий сайт → Новий сайт
      // Повна міграція esnukraine.org (Drupal → Next.js)
      // =============================================

      // Про нас та Команда
      { source: '/what-esn-ukraine', destination: '/about-us', permanent: true },
      { source: '/national-team', destination: '/national-board', permanent: true },
      { source: '/our-team', destination: '/national-board', permanent: true },
      { source: '/our-team/alumni', destination: '/about-us/former-boards', permanent: true },
      { source: '/our-team/former-boards', destination: '/about-us/former-boards', permanent: true },

      // Проєкти
      { source: '/our-impact', destination: '/projects', permanent: true },

      // Осередки
      { source: '/esn-kyiv', destination: '/our-sections', permanent: true },
      { source: '/esn-chernivtsi', destination: '/our-sections', permanent: true },
      { source: '/esn-ifnul', destination: '/our-sections', permanent: true },
      { source: '/esn-lpnu', destination: '/our-sections', permanent: true },
      { source: '/esn-odesa', destination: '/our-sections', permanent: true },
      { source: '/esn-:section', destination: '/our-sections', permanent: true },

      // Студентам
      { source: '/incoming-students', destination: '/for-students/erasmus', permanent: true },
      { source: '/housing', destination: '/for-students/housing', permanent: true },
      { source: '/buddy-system', destination: '/for-students/buddy', permanent: true },
      { source: '/survival-guide', destination: '/for-students/survival-guide', permanent: true },

      // Erasmus+
      { source: '/academic-mobility', destination: '/erasmus/academic-mobility', permanent: true },
      { source: '/erasmus-mundus-master-programmes', destination: '/erasmus/erasmus-mundus', permanent: true },
      { source: '/erasmus-trainings-and-exchanges', destination: '/erasmus/trainings-and-exchanges', permanent: true },
      { source: '/european-solidarity-corps', destination: '/erasmus/european-solidarity-corps', permanent: true },
      { source: '/national-erasmus-office', destination: '/erasmus/national-erasmus-office', permanent: true },

      // ESNcard та Партнери
      { source: '/esncard', destination: '/for-students/esncard', permanent: true },
      { source: '/partners', destination: '/for-students/esncard', permanent: true },
      { source: '/partners/:slug*', destination: '/for-students/esncard', permanent: true },

      // Новини, Блог, Події та Інше
      { source: '/blog/tags/:tag*', destination: '/blog', permanent: true },
      { source: '/blog/:year/:month/:day/:slug', destination: '/blog', permanent: true },
      { source: '/blog/:slug', destination: '/blog', permanent: true },
      { source: '/erasmus-career-fair-odesa', destination: '/news/erasmus-career-fair-odesa', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },

      // Drupal системні URL (публічні сторінки пагінації)
      { source: '/node', destination: '/', permanent: true },
      { source: '/node/:path*', destination: '/', permanent: true },

      // RSS → новини
      { source: '/rss.xml', destination: '/news', permanent: true },
    ];
  },
};

export default nextConfig;