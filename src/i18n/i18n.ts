import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as R from 'ramda';

import { locales, timeZone } from './config';

export default getRequestConfig(async ({ locale }) => {
  const isLocaleValid = (locales as readonly string[]).includes(locale);
  if (!isLocaleValid) notFound();

  const [targetLocale, defaultLocale] = (
    await Promise.all([
      import(`../../messages/${locale}.json`),
      import(`../../messages/zh.json`),
    ])
  ).map((module) => module.default);

  const messages = R.mergeDeepRight(defaultLocale, targetLocale);

  return {
    messages,
    timeZone,
  };
});
