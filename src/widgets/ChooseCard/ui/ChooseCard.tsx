'use client';

import { Button, CardTypes, useAppDispatch, useAppSelector } from '@/shared';
import cls from './ChooseCard.module.css';
import { Download } from '@/features';
import { Choose, removeAll, selectChoose, selectCountChoose } from '@/entities';
import { useTranslations } from 'next-intl';

export const ChooseCard = () => {
  const count = useAppSelector(selectCountChoose);
  const choose = useAppSelector(selectChoose);
  const dispatch = useAppDispatch();
  const t = useTranslations('Buttons');

  const handleRemove = () => {
    dispatch(removeAll());
  };

  if (!count) {
    return null;
  }

  const data = Object.values(choose) as CardTypes[];

  return (
    <div className={cls.Choose}>
      <Choose />
      <div className={cls.buttons}>
        <Button variant="filled" colorBtn="success" onClick={handleRemove}>
          {t('unselect')}
        </Button>
        <Download data={data} />
      </div>
    </div>
  );
};
