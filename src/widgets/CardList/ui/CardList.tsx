import { FC, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import {
  CardTypes,
  LOCAL_SEARCH,
  selectError,
  selectIsLoader,
  useAppSelector,
  useGetLocalData,
  useLazyGetCatsQuery,
} from '@/shared';
import { Card } from '@/entities';
import { SkeletonLoading } from './SkeletonLoading';
import { NotFound } from './NotFound';
import { Link, useSearchParams } from 'react-router';

export const CardList: FC = () => {
  const [local, setLocal] = useState('');
  const [params, setParams] = useSearchParams();
  const [firstRendering, setFirstRendering] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { value: localValue } = useGetLocalData();

  const [fetchCats] = useLazyGetCatsQuery();
  const isLoading = useAppSelector(selectIsLoader);
  const error = useAppSelector(selectError);
  const [cards, setCards] = useState<CardTypes[] | null>(null);

  useEffect(() => {
    const fetchReq = async (val?: string) => {
      setLocal(val ?? '');

      const page = parseInt(params.get('page') || '1');
      setCurrentPage(page);
      const res = await fetchCats({ search: val ?? '', page });

      setCards(res.data ?? null);
    };

    const changeLocalStorage = (event: Event) => {
      const customEvent = event as CustomEvent & {
        newValue: string;
      };

      if (local !== customEvent.newValue) {
        fetchReq(customEvent.newValue ?? '');
        setParams({ page: '1' });
        localStorage.setItem(LOCAL_SEARCH, customEvent.newValue);
      }
    };

    window.addEventListener('localStorageChanged', changeLocalStorage);

    if (currentPage !== Number(params.get('page') ?? 1)) {
      fetchReq(local);
    }

    if (localValue !== undefined && firstRendering) {
      fetchReq(localValue);
      setFirstRendering(false);
    }

    return () =>
      window.removeEventListener('localStorageChanged', changeLocalStorage);
  }, [
    currentPage,
    fetchCats,
    firstRendering,
    local,
    localValue,
    params,
    setParams,
  ]);

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
        <Link to={`cats/${el.id}`} key={el.id} className={cls.link}>
          <Card card={el} />
        </Link>
      ))}
    </div>
  );
};

CardList.displayName = 'CardList';
