'use client';

import cls from './ToggleLang.module.css';
import { MouseEvent, useTransition } from 'react';
import { Button } from '@/shared';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export const ToggleLang = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Buttons');
  const local = useLocale();
  const params = useSearchParams();

  function onSelectChange(event: MouseEvent<HTMLButtonElement>) {
    const nextLocale = event.currentTarget.name;

    if (nextLocale === local) return;

    startTransition(() => {
      router.replace(
        { pathname, query: Object.fromEntries(params.entries()) },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className={cls.content}>
      <Button
        variant="filled"
        name="en"
        onClick={onSelectChange}
        disabled={isPending}
        className={`${cls.button} ${local === 'en' ? cls.active : ''}`}
      >
        {t('en')}
      </Button>
      <Button
        variant="filled"
        name="ru"
        onClick={onSelectChange}
        disabled={isPending}
        className={`${cls.button} ${local === 'ru' ? cls.active : ''}`}
      >
        {t('ru')}
      </Button>
    </div>
  );
};
