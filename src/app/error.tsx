'use client';

import { Button } from '@/shared';
import cls from './error.module.css';
import { ErrorPageBoundary } from '@/_pages';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations('Buttons');

  return (
    <html lang={pathname.slice(0, 3)}>
      <body>
        <main className={cls.wrapper}>
          <h2>{error.name}</h2>
          <ErrorPageBoundary />
          <Button variant="filled" colorBtn="error" onClick={() => reset()}>
            {t('reset')}
          </Button>
        </main>{' '}
      </body>
    </html>
  );
}
