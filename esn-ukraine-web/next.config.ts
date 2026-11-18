import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

/**
 * Security headers for every response. A full CSP with a script nonce would make
 * every page dynamic, so only the directives that work for a static site are set.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  // Next 16.4 writes an AGENTS.md into the project on every `next dev`; keep the tree clean.
  agentRules: false,
  images: {
    // Sanity images are served straight from the Sanity CDN (see sanity/lib/imageLoader.ts)
    // at the same widths and quality (75) as before, so the Vercel optimizer only handles
    // the few files in /public. Same output formats as production; a long cache keeps the
    // free-tier transformation quota low.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400, // 31 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        // Only this project's assets: anyone could otherwise burn the optimization quota
        // through /_next/image with images from any Sanity project.
        pathname:
          sanityProjectId && sanityDataset
            ? `/images/${sanityProjectId}/${sanityDataset}/**`
            : '/images/**',
      },
    ],
  },
  // PostHog's client sends requests with a trailing slash (/ingest/posthog/e/). Without
  // this, Next.js answers each with a 308 redirect first: two requests per event.
  // Trailing slashes on page URLs are redirected by the first rule in redirects().
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: ['@sanity/icons', '@sanity/ui', '@sanity/util', 'sanity', 'lucide-react', 'framer-motion'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/ingest/posthog/:path*',
          destination: 'https://eu.i.posthog.com/:path*',
        },
      ],
    };
  },
  async redirects() {
    return [
      // Trailing slash → canonical URL (/news/ → /news), as Next.js does by default.
      // `skipTrailingSlashRedirect` turns the default off so PostHog requests
      // (/ingest/posthog/e/) are not redirected; this rule handles pages instead.
      // Being a config redirect, it runs in Vercel's routing layer, not in a function.
      {
        // Non-empty segments only, so a path such as `//host/` can never become a
        // protocol-relative `Location: //host` (open redirect), even off Vercel.
        source: '/:path((?!ingest/|_next/|api/)(?:[^/.]+/)*[^/.]+)/',
        destination: '/:path',
        permanent: true,
      },

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

      // Осередки: /esn-kyiv, /esn-lpnu тощо. Регулярний вираз обмежує правило назвами
      // секцій, щоб файли на кшталт /esn-ukraine-og-image.jpg не перехоплювались.
      { source: '/esn-:section([a-z]+)', destination: '/our-sections', permanent: true },

      // Студентам
      { source: '/incoming-students', destination: '/erasmus', permanent: true },
      { source: '/housing', destination: '/for-students/housing', permanent: true },
      { source: '/buddy-system', destination: '/for-students/buddy', permanent: true },
      { source: '/survival-guide', destination: '/for-students/survival-guide', permanent: true },

      // Erasmus+ (дублікат for-students/erasmus → канонічна /erasmus)
      { source: '/for-students/erasmus', destination: '/erasmus', permanent: true },
      { source: '/academic-mobility', destination: '/erasmus/academic-mobility', permanent: true },
      { source: '/erasmus-mundus-master-programmes', destination: '/erasmus/erasmus-mundus', permanent: true },
      { source: '/erasmus-trainings-and-exchanges', destination: '/erasmus/trainings-and-exchanges', permanent: true },
      { source: '/european-solidarity-corps', destination: '/erasmus/european-solidarity-corps', permanent: true },
      { source: '/national-erasmus-office', destination: '/erasmus/national-erasmus-office', permanent: true },

      // Alumni та осередки
      { source: '/alumni-network', destination: '/about-us/former-boards', permanent: true },
      { source: '/board-esn-:section([a-z]+)', destination: '/our-sections', permanent: true },

      // ESNcard та Партнери
      { source: '/esncard', destination: '/for-students/esncard', permanent: true },
      { source: '/partners', destination: '/for-students/esncard', permanent: true },
      { source: '/partners/:slug*', destination: '/for-students/esncard', permanent: true },

      // Новини, Блог, Події та Інше
      { source: '/blog/tags/:tag*', destination: '/blog', permanent: true },
      { source: '/blog/:year(\\d{4})/:month(\\d{1,2})/:day(\\d{1,2})/:slug', destination: '/blog', permanent: true },
      // Старі новини ведуть на свої нові версії
      { source: '/erasmus-career-fair-odesa', destination: '/news/from-erasmus-to-the-professional-workspace-erasmus-career-fair-in-odesa', permanent: true },
      { source: '/news/erasmus-career-fair-odesa', destination: '/news/from-erasmus-to-the-professional-workspace-erasmus-career-fair-in-odesa', permanent: true },
      { source: '/news/join-eunity-conference-2025-berlin', destination: '/events/berlin-eunity-conference-2025', permanent: true },
      { source: '/news/voices-courage-20-students-20-stories-one-vision', destination: '/news/voices-of-courage-20-students-20-stories-one-vision', permanent: true },
      { source: '/news/new-esn-section-ukraine', destination: '/news', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },

      // Drupal файли (PDF-документи)
      { source: '/sites/default/files/news/survey_2022_ukrainian_students_abroad.pdf', destination: '/news/report-survey-2022-ukrainian-students-abroad', permanent: true },
      { source: '/sites/default/files/news/opituvannya_2022_ukrayinski_studenti_za_kordonom.pdf', destination: '/news/report-survey-2022-ukrainian-students-abroad', permanent: true },
      { source: '/sites/default/files/:path*', destination: '/', permanent: true },

      // Drupal системні URL (публічні сторінки пагінації)
      { source: '/node', destination: '/', permanent: true },
      { source: '/node/:path*', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
