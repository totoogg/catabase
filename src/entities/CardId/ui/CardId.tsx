import {
  AppImage,
  CardTypes,
  getCardById,
  transformDataForCard,
  transformError,
} from '@/shared';
import cls from './CardId.module.css';
import { FC } from 'react';
import { getTranslations } from 'next-intl/server';

interface CardIdProps {
  id: string;
}

export const CardId: FC<CardIdProps> = async ({ id }) => {
  const { status, res: data } = await getCardById(id);

  if (status > 399) {
    return (
      <div className={cls.error}>
        {await transformError(String(status) || '1')}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data as CardTypes;

  const t = await getTranslations('Data');

  const translate = {
    name: t('name'),
    breed: t('breed'),
    age: t('age'),
    weight: t('weight'),
    dailyFood: t('dailyFood'),
    lastVetVisit: t('lastVetVisit'),
    adoptionDate: t('adoptionDate'),
    temperament: t('temperament'),
    likes: t('likes'),
    dislikes: t('dislikes'),
    owner: t('owner'),
    medicalRecords: t('medicalRecords'),
  };

  const attribs = transformDataForCard(translate, data as CardTypes, true);

  return (
    <div className={cls.content}>
      <AppImage
        className={cls.cardImage}
        src={imageUrl}
        alt={name}
        height="650px"
      />
      <div className={cls.cardBlock}>
        {attribs.map((item) => (
          <p key={item.name}>
            <b>{item.name}:</b> <i>{item.value}</i>
          </p>
        ))}
      </div>
    </div>
  );
};
