import type { Config } from 'tailwindcss';

import { BREAKPOINT } from './src/constants/screen';

const config: Config = {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    screens: {
      xs: `${BREAKPOINT.XS_MIN}`, //Phone
      sm: `${BREAKPOINT.SM_MIN}px`, //Tablet-sm
      md: `${BREAKPOINT.MD_MIN}px`, //Tablet-l
      lg: `${BREAKPOINT.LG_MIN}px`, //Desktop
      xsOnly: {
        min: `${BREAKPOINT.XS_MIN}`,
        max: `${BREAKPOINT.SM_MIN - 1}px`,
      },
      smOnly: {
        min: `${BREAKPOINT.SM_MIN}`,
        max: `${BREAKPOINT.MD_MIN - 1}px`,
      },
      mdOnly: {
        min: `${BREAKPOINT.MD_MIN}`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      xsOrSm: {
        min: `${BREAKPOINT.XS_MIN}`,
        max: `${BREAKPOINT.MD_MIN - 1}px`,
      },
      smOrMd: {
        min: `${BREAKPOINT.SM_MIN}`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      xsToMd: {
        min: `${BREAKPOINT.XS_MIN}`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      'touch-device': { raw: '(hover:none) and (pointer:coarse)' },
      'hover-device': { raw: '(hover:hover) and (pointer:fine)' },
      'short-device': {
        raw: `(max-height: 600px) and (min-width: 660px) and (max-width: ${
          BREAKPOINT.LG_MIN - 1
        }px)`,
      },
      'small-device': { raw: '(max-height: 599px) and (max-width: 659px)' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
