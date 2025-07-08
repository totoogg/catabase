import { Component } from 'react';
import cls from './CardList.module.css';
import { CardTypes, LOCAL_SEARCH } from '@/shared';
import { Card } from '@/entities';
import { getCards } from '@/shared';

interface CardListProps {
  className?: string;
}

interface CardListState {
  cards: CardTypes[];
}

export class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  changeLocalStorage = async (e: StorageEvent) => {
    if (e.key === LOCAL_SEARCH) {
      const res = await getCards({ search: e.newValue ?? '' });
      this.setState({
        cards: res,
      });
    }
  };

  getStartData = async () => {
    const res = await getCards({});
    this.setState({
      cards: res,
    });
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.changeLocalStorage);
    }
    this.getStartData();
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.changeLocalStorage);
    }
  }

  render() {
    if (this.state.cards.length === 0) {
      return <p>Non</p>;
    }

    return (
      <div className={cls.CardList}>
        {this.state.cards.map((el) => (
          <Card card={el} key={el.id} />
        ))}
      </div>
    );
  }
}
