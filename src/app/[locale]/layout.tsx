import { NextIntlClientProvider, useMessages, useTimeZone } from 'next-intl';
import { Inter } from 'next/font/google';

import { BaseLayout } from '@/components/BaseLayout';
import { Toaster } from '@/components/ui/toaster';
import { BaseLayoutProvider } from '@/contexts/BaseLayout';
import { cn } from '@/lib/utils';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const timeZone = useTimeZone();
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body
        className={cn('min-h-screen bg-muted/40 antialiased', inter.variable)}
      >
        <NextIntlClientProvider
          locale={locale}
          timeZone={timeZone}
          messages={messages}
        >
          <BaseLayoutProvider>
            <Toaster />
            <BaseLayout>{children}</BaseLayout>
          </BaseLayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
