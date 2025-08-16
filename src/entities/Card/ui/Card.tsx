import { FC } from 'react';
import cls from './Card.module.css';
import { AppImage, CardTypes, transformDataForCard } from '@/shared';
import { useTranslations } from 'next-intl';

interface CardListProps {
  card: CardTypes;
  children?: React.ReactNode;
}

export const Card: FC<CardListProps> = ({ card, children }) => {
  const { name, imageUrl } = card;
  const t = useTranslations('Data');

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

  const attribs = transformDataForCard(translate, card);

  return (
    <div className={cls.Card}>
      <div className={cls.cardImage}>
        <AppImage src={imageUrl} alt={name} height="250px" />
      </div>
      <div className={cls.cardBlock}>
        {attribs.map((item) => (
          <p key={item.name}>
            <b>{item.name}:</b> <i>{item.value}</i>
          </p>
        ))}
      </div>
      <div className={cls.actions}>{children}</div>
    </div>
  );
};

Card.displayName = 'Card';
