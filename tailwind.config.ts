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
        background:       '#f8f8f7',
        foreground:       '#0a0a0a',
        muted:            '#737373',
        subtle:           '#e4e4e3',
        surface:          '#ffffff',
        brand: {
          accent:         '#e8005a',   // magenta plus mark
        },
      },
    },
  },
  plugins: [],
};

export default config;
