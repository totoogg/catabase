import { getTranslations } from 'next-intl/server';
import cls from './ErrorPageBoundary.module.css';

export const ErrorPageBoundary = async () => {
  const t = await getTranslations('Error');

  return <div className={cls.text}>{t('errorComponent')}</div>;
};

ErrorPageBoundary.displayName = 'ErrorPageBoundary';
