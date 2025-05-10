import type { Config } from 'tailwindcss';

import { BREAKPOINT } from './src/constants/screen';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
    screens: {
      xs: `${BREAKPOINT.XS_MIN}px`, // Phone
      sm: `${BREAKPOINT.SM_MIN}px`, // Tablet-sm
      md: `${BREAKPOINT.MD_MIN}px`, // Tablet-l
      lg: `${BREAKPOINT.LG_MIN}px`, // Desktop
      xl: `${BREAKPOINT.XL_MIN}px`,
      xsOnly: {
        min: `${BREAKPOINT.XS_MIN}px`,
        max: `${BREAKPOINT.SM_MIN - 1}px`,
      },
      smOnly: {
        min: `${BREAKPOINT.SM_MIN}px`,
        max: `${BREAKPOINT.MD_MIN - 1}px`,
      },
      mdOnly: {
        min: `${BREAKPOINT.MD_MIN}px`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      lgOnly: {
        min: `${BREAKPOINT.LG_MIN}px`,
        max: `${BREAKPOINT.XL_MIN - 1}px`,
      },
      xsOrSm: {
        min: `${BREAKPOINT.XS_MIN}px`,
        max: `${BREAKPOINT.MD_MIN - 1}px`,
      },
      smOrMd: {
        min: `${BREAKPOINT.SM_MIN}px`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      xsToMd: {
        min: `${BREAKPOINT.XS_MIN}px`,
        max: `${BREAKPOINT.LG_MIN - 1}px`,
      },
      mdToLg: {
        min: `${BREAKPOINT.MD_MIN}px`,
        max: `${BREAKPOINT.XL_MIN - 1}px`,
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
  },
  plugins: [],
} satisfies Config;
