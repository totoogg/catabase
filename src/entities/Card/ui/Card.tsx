import { FC, memo } from 'react';
import cls from './Card.module.css';
import { AppImage, CardTypes } from '@/shared';

interface CardListProps {
  card: CardTypes;
}

export const Card: FC<CardListProps> = memo(({ card }) => {
  const { name, breed, age, weight, dailyFood, lastVetVisit, imageUrl } = card;

  const attribs = [
    { name: 'Name', value: name },
    { name: 'Breed', value: breed },
    { name: 'Age', value: age },
    { name: 'Weight', value: weight },
    { name: 'Daily Food', value: dailyFood },
    { name: 'Last Visit', value: lastVetVisit },
  ];

  return (
    <div className={cls.Card}>
      <div className={cls.cardImage}>
        <AppImage src={imageUrl} alt={name} height="250" />
      </div>
      <div className={cls.cardBlock}>
        {attribs.map((item) => (
          <p key={item.name}>
            <b>{item.name}:</b> <i>{item.value}</i>
          </p>
        ))}
      </div>
    </div>
  );
});

Card.displayName = 'Card';
