import type { Metadata } from 'next';
import '../index.css';
import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'My App is a Gallery',
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
