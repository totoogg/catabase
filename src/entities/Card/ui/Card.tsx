import { Component } from 'react';
import cls from './Card.module.css';
import { AppImage, CardTypes } from '@/shared';

interface CardListProps {
  card: CardTypes;
}

export class Card extends Component<CardListProps> {
  render() {
    const { name, breed, age, weight, dailyFood, lastVetVisit, imageUrl } =
      this.props.card;

    return (
      <div className={cls.Card}>
        <div className={cls.cardImage}>
          <AppImage src={imageUrl} alt={name} height="250" />
        </div>
        <div className={cls.cardBlock}>
          <p>
            <b>Name:</b> <i>{name}</i>
          </p>
          <p>
            <b>Breed:</b> <i>{breed}</i>
          </p>
          <p>
            <b>Age:</b> <i>{age}</i>
          </p>
          <p>
            <b>Weight:</b> <i>{weight}</i>
          </p>
          <p>
            <b>Daily Food:</b> <i>{dailyFood}</i>
          </p>
          <p>
            <b>Last Visit:</b> <i>{lastVetVisit}</i>
          </p>
        </div>
      </div>
    );
  }
}
