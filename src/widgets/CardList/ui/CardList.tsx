import { FC, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import {
  LOCAL_SEARCH,
  transformError,
  useGetCatsQuery,
  useGetLocalData,
} from '@/shared';
import { Card } from '@/entities';
import { SkeletonLoading } from './SkeletonLoading';
import { NotFound } from './NotFound';
import { useSearchParams } from 'react-router';
import { ButtonDetail, Select } from '@/features';

export const CardList: FC = () => {
  const [local, setLocal] = useState('');
  const [params, setParams] = useSearchParams();
  const [firstRendering, setFirstRendering] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { value: localValue } = useGetLocalData();

  const { isFetching, isError, data, error } = useGetCatsQuery(
    {
      search: local ?? '',
      page: currentPage,
    },
    { skip: firstRendering }
  );

  const page = parseInt(params.get('page') || '1');

  useEffect(() => {
    const changeLocalStorage = (event: Event) => {
      const customEvent = event as CustomEvent & {
        newValue: string;
      };

      if (local !== customEvent.newValue) {
        setLocal(customEvent.newValue ?? '');
        setParams({ page: '1' });
        setCurrentPage(page);
        localStorage.setItem(LOCAL_SEARCH, customEvent.newValue);
      }
    };

    window.addEventListener('localStorageChanged', changeLocalStorage);

    return () => {
      window.removeEventListener('localStorageChanged', changeLocalStorage);
    };
  }, [local, page, setParams]);

  useEffect(() => {
    if (currentPage !== Number(params.get('page') ?? 1) && !firstRendering) {
      setLocal(local ?? '');
      setCurrentPage(page);
    }

    if (localValue !== undefined && firstRendering) {
      setLocal(localValue ?? '');
      setCurrentPage(page);
      setFirstRendering(false);
    }
  }, [currentPage, firstRendering, local, localValue, page, params]);

  if (isError) {
    return <p className={cls.error}>{transformError(String(error))}</p>;
  }

  if (isFetching || !data) {
    return <SkeletonLoading />;
  }

  if (data.length === 0) {
    return <NotFound text={local} />;
  }

  return (
    <div className={cls.CardList}>
      {data.map((el) => (
        <Card card={el} key={el.id}>
          <ButtonDetail
            className={cls.more}
            link={`cats/${el.id}?page=${page}`}
          />
          <Select data={el} />
        </Card>
      ))}
    </div>
  );
};

CardList.displayName = 'CardList';
