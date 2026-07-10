import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background:       '#f4f7fc',
        foreground:       '#0a0f1e',
        muted:            '#64748b',
        subtle:           '#dde3ef',
        surface:          '#ffffff',
        brand: {
          accent:         '#1a4fd8',
          'accent-dark':  '#1140b8',
          'accent-light': '#e8effd',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-brand-accent',
    'text-brand-accent',
    'border-brand-accent',
    'bg-brand-accent-light',
    'text-brand-accent-dark',
  ],
};

export default config;
