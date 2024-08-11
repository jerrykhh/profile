import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import {
  DEFAULT_LOCALE,
  LOCALE,
  NEXT_LOCALE_COOKIE_KEY,
  localePrefix,
  locales,
} from './i18n/config';

export default function middleware(req: NextRequest) {
  const locale = req.cookies.get(NEXT_LOCALE_COOKIE_KEY)?.value;
  let patchedLocale: LOCALE | null = null;

  console.log('locale', locale);
  if (!locale || ![LOCALE.EN, LOCALE.ZH].includes(locale as LOCALE)) {
    req.cookies.set(NEXT_LOCALE_COOKIE_KEY, DEFAULT_LOCALE);
    patchedLocale = DEFAULT_LOCALE;
  }

  const res = createIntlMiddleware({
    locales,
    defaultLocale: DEFAULT_LOCALE,
    localeDetection: true,
    alternateLinks: true,
    localePrefix,
  })(req);

  if (patchedLocale) res.cookies.set(NEXT_LOCALE_COOKIE_KEY, patchedLocale);
  return res;
}

export const config = {
  matcher: ['/', '/((?!_next|_vercel|.*\\..*).*)'],
};
