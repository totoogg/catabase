import { Providers } from '@/_app/providers/Providers';
import type { Metadata } from 'next';
import { StrictMode } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'My App is a Gallery',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale}>
            <StrictMode>
              <Providers>{children}</Providers>
            </StrictMode>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
