'use client';

import { Button } from '@/shared';
import cls from './ErrorPage.module.css';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export const ErrorPage = () => {
  const t = useTranslations('ErrorPage');

  const router = useRouter();

  const handleHome = () => {
    router.push('/?page=1');
  };

  return (
    <div className={cls.wrapper}>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Button variant="filled" colorBtn="success" onClick={handleHome}>
        {t('home')}
      </Button>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';
