import {
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from 'lucide-react';

// ============================================================
// XSocial icon — shared SVG component for X/Twitter
// ============================================================
export const XSocialIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ============================================================
// Types
// ============================================================
export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  items: NavLink[];
}

export interface NavItemMega {
  label: string;
  type: 'mega';
  columns: NavColumn[];
}

export interface NavItemDropdown {
  label: string;
  type: 'dropdown';
  items: NavLink[];
}

export interface NavItemLink {
  label: string;
  type: 'link';
  href: string;
}

export type NavItem = NavItemMega | NavItemDropdown | NavItemLink;

export interface SocialLink {
  Icon: React.FC<{ className?: string }>;
  href: string;
  label: string;
}

// ============================================================
// Main Navigation
// ============================================================
export const MAIN_NAV: NavItem[] = [
  {
    label: 'About Us',
    type: 'mega',
    columns: [
      {
        heading: 'Who We Are',
        items: [
          { label: 'About Us', href: '/about-us' },
          { label: 'National Board', href: '/national-board' },
        ],
      },
      {
        heading: 'Our Network',
        items: [
          { label: 'Our Sections', href: '/our-sections' },
        ],
      },
    ],
  },
  {
    label: 'For Students',
    type: 'mega',
    columns: [
      {
        heading: 'Student Services',
        items: [
          { label: 'Survival Guide', href: '/for-students/survival-guide' },
          { label: 'Buddy System', href: '/for-students/buddy' },
          { label: 'Housing', href: '/for-students/housing' },
        ],
      },
      {
        heading: 'Tools',
        items: [
          { label: 'ESNcard', href: '/for-students/esncard' },
        ],
      },
    ],
  },
  {
    label: 'Erasmus+',
    type: 'mega',
    columns: [
      {
        heading: 'Programmes',
        items: [
          { label: 'Erasmus+', href: '/erasmus' },
          { label: 'Academic Mobility', href: '/erasmus/academic-mobility' },
          { label: 'Erasmus Mundus', href: '/erasmus/erasmus-mundus' },
        ],
      },
      {
        heading: 'Opportunities',
        items: [
          { label: 'Trainings & Exchanges', href: '/erasmus/trainings-and-exchanges' },
          { label: 'European Solidarity Corps', href: '/erasmus/european-solidarity-corps' },
          { label: 'National Erasmus+ Office', href: '/erasmus/national-erasmus-office' },
        ],
      },
    ],
  },
  {
    label: 'Projects',
    type: 'link',
    href: '/projects',
  },
  {
    label: 'News & Media',
    type: 'dropdown',
    items: [
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Contact',
    type: 'link',
    href: '/contact',
  },
];

// ============================================================
// Social Links (shared between Header & Footer)
// ============================================================
export const SOCIAL_LINKS: SocialLink[] = [
  { Icon: Instagram, href: 'https://instagram.com/esn.ukraine', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/esn-ukraine', label: 'LinkedIn' },
  { Icon: XSocialIcon, href: 'https://x.com/esnukraine', label: 'X / Twitter' },
  { Icon: Youtube, href: 'https://youtube.com/@esnukraine', label: 'YouTube' },
  { Icon: Mail, href: 'mailto:ukraine-nr@esn.org', label: 'Email' },
];

// ============================================================
// Footer Navigation
// ============================================================
export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Events', href: '/events' },
  { label: 'News', href: '/news' },
  { label: 'Our Sections', href: '/our-sections' },
  { label: 'Erasmus+', href: '/erasmus' },
];

export const FOOTER_POLICY_LINKS: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Code of Conduct', href: '/code-of-conduct' },
  { label: 'Cookie Policy', href: '/cookies' },
];
