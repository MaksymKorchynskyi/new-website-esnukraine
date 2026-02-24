import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // tailwind.config.ts (фрагмент)
  theme: {
    extend: {
      colors: {
        'esn-cyan': '#00AEEF',
        'esn-magenta': '#EC008C',
        'esn-green': '#7AC143',
        'esn-dark': '#2E3192', // ESN Blue/Dark base
      },
      fontFamily: {
        sans: ['var(--font-manrope)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;