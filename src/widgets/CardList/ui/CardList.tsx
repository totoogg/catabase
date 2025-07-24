import { FC, memo, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import { CardTypes, LOCAL_SEARCH, getCards } from '@/shared';
import { Card } from '@/entities';
import { SkeletonLoading } from './SkeletonLoading';
import { NotFound } from './NotFound';
import { useSearchParams } from 'react-router';

export const CardList: FC = memo(() => {
  const [cards, setCards] = useState<CardTypes[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [local, setLocal] = useState('');
  const [error, setError] = useState('');
  const [params] = useSearchParams();

  useEffect(() => {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';

    const fetchReq = async (val?: string) => {
      setIsLoading(true);
      setLocal(val ?? '');

      const page = Number(params.get('page') ?? 1);

      const res = await getCards({ search: val ?? '', page });

      if (res.status > 0 && res.status < 400) {
        setCards(res.res);
        setIsLoading(false);
        setError('');
      } else {
        setCards(null);
        setIsLoading(false);
        setError(res.res);
      }
    };

    const changeLocalStorage = (event: Event) => {
      const customEvent = event as CustomEvent & {
        newValue: string;
      };

      if (local !== customEvent.newValue) {
        localStorage.setItem(LOCAL_SEARCH, customEvent.newValue);
        fetchReq(customEvent.newValue ?? '');
      }
    };

    window.addEventListener('localStorageChanged', changeLocalStorage);

    fetchReq(local);

    return () =>
      window.removeEventListener('localStorageChanged', changeLocalStorage);
  }, [params]);

  if (error) {
    return <p className={cls.error}>{error}</p>;
  }

  if (isLoading || !cards) {
    return <SkeletonLoading />;
  }

  if (cards.length === 0) {
    return <NotFound text={local} />;
  }

  return (
    <div className={cls.CardList}>
      {cards.map((el) => (
        <Card card={el} key={el.id} />
      ))}
    </div>
  );
});

CardList.displayName = 'CardList';
