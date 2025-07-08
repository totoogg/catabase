import { Component } from 'react';
import cls from './Card.module.css';
import { CardTypes } from '@/shared';

interface CardListProps {
  card: CardTypes;
}

export class Card extends Component<CardListProps> {
  render() {
    return <div className={cls.Card}>Card</div>;
  }
}
