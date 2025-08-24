import { useAppSelector } from '@/shared';
import { selectCountChoose } from '../model/slice/chooseSlice';
import cls from './Choose.module.css';
import { useTranslations } from 'next-intl';

export const Choose = () => {
  const count = useAppSelector(selectCountChoose);
  const t = useTranslations('HomePage');

  const text =
    count === 1 ? t('selectOne', { count }) : t('selectMany', { count });

  return <h3 className={cls.choose}>{text}</h3>;
};
