import { FC, memo } from 'react';
import cls from './Card.module.css';
import { AppImage, CardTypes, transformDataForCard } from '@/shared';

interface CardListProps {
  card: CardTypes;
}

export const Card: FC<CardListProps> = memo(({ card }) => {
  const { name, imageUrl } = card;

  const attribs = transformDataForCard(card);

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
