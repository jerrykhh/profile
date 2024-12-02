import type { Config } from 'tailwindcss';

import { BREAKPOINT } from './app/constants/screen';

export default {
  darkMode: ['class'],
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: `${BREAKPOINT.XS_MIN}`, //Phone
      sm: `${BREAKPOINT.SM_MIN}px`, //Tablet-sm
      md: `${BREAKPOINT.MD_MIN}px`, //Tablet-l
      lg: `${BREAKPOINT.LG_MIN}px`, //Desktop
      xl: `${BREAKPOINT.XL_MIN}px`, //Desktop-xl
      '2xl': `${BREAKPOINT['2XL_MIN']}px`, //Desktop-2xl
      '3xl': `${BREAKPOINT['3XL_MIN']}px`, //Desktop-3xl

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
      lgOnly: {
        min: `${BREAKPOINT.LG_MIN}px`,
        max: `${BREAKPOINT.XL_MIN - 1}px`,
      },
      xlOnly: {
        min: `${BREAKPOINT.XL_MIN}px`,
        max: `${BREAKPOINT['2XL_MIN'] - 1}px`,
      },
      '2xlOnly': {
        min: `${BREAKPOINT['2XL_MIN']}px`,
        max: `${BREAKPOINT['3XL_MIN'] - 1}px`,
      },
    },
    extend: {
      fontFamily: {
        sans: [
          // 'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
