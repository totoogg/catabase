import { Component } from 'react';
import cls from './CardList.module.css';
import { CardTypes, LOCAL_SEARCH, Skeleton } from '@/shared';
import { Card } from '@/entities';
import { getCards } from '@/shared';

interface CardListProps {
  className?: string;
}

interface CardListState {
  cards: CardTypes[] | null;
  isLoading: boolean;
}

export class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      cards: null,
      isLoading: false,
    };
  }

  changeLocalStorage = async (e: StorageEvent) => {
    if (e.key === LOCAL_SEARCH && e.oldValue !== e.newValue) {
      this.setState({
        isLoading: true,
      });
      const res = await getCards({ search: e.newValue ?? '' });
      this.setState({
        cards: res,
        isLoading: false,
      });
    }
  };

  getStartData = async () => {
    this.setState({
      isLoading: true,
    });
    const res = await getCards({});
    this.setState({
      cards: res,
      isLoading: false,
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
    if (this.state.isLoading || !this.state.cards) {
      return (
        <div className={cls.CardList}>
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Skeleton height={400} width={250} key={i} />
            ))}
        </div>
      );
    }

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
