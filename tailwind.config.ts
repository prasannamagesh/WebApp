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
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        background: '#f9f8f6',
        foreground: '#1c1917',
        muted: '#78716c',
        border: '#e7e5e4',
        surface: '#ffffff',
        accent: '#a8956e',
      },
    },
  },
  plugins: [],
};

export default config;
