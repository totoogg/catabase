import { Component } from 'react';
import cls from './CardList.module.css';
import { CardTypes, LOCAL_SEARCH, getCards } from '@/shared';
import { Card } from '@/entities';
import { SkeletonLoading } from './SkeletonLoading';
import { NotFound } from './NotFound';

interface CardListProps {
  className?: string;
}

interface CardListState {
  cards: CardTypes[] | null;
  isLoading: boolean;
  local: string;
  error: string;
}

export class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = {
      cards: null,
      isLoading: false,
      local: '',
      error: '',
    };
  }

  fetchReq = async (val?: string) => {
    this.setState({
      isLoading: true,
      local: val ?? '',
    });
    const res = await getCards({ search: val ?? '' });

    if (res.status > 0 && res.status < 400) {
      this.setState({
        cards: res.res,
        isLoading: false,
        error: '',
      });
    } else {
      this.setState({
        cards: null,
        isLoading: false,
        error: res.res,
      });
    }
  };

  changeLocalStorage = async (e: StorageEvent) => {
    if (e.key === LOCAL_SEARCH && e.oldValue !== e.newValue) {
      this.fetchReq(e.newValue ?? '');
    }
  };

  getStartData = () => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    this.fetchReq(local);
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
    if (this.state.error) {
      return <p className={cls.error}>{this.state.error}</p>;
    }

    if (this.state.isLoading || !this.state.cards) {
      return <SkeletonLoading />;
    }

    if (this.state.cards.length === 0) {
      return <NotFound text={this.state.local} />;
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
