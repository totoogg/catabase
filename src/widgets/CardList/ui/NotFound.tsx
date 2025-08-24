import { FC } from 'react';
import cls from './CardList.module.css';
import { useTranslations } from 'next-intl';

interface NotFoundProps {
  text: string;
}

export const NotFound: FC<NotFoundProps> = ({ text }) => {
  const t = useTranslations('HomePage');

  return <p className={cls.notFound}>{t('NotFound', { text })}</p>;
};

NotFound.displayName = 'NotFound';
