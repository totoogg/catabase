'use client';

import { FC, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import {
  LOCAL_SEARCH,
  ResError,
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
    const fetchReq = (val?: string) => {
      setLocal(val ?? '');

      setCurrentPage(page);
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

    if (currentPage !== Number(params.get('page') ?? 1) && !firstRendering) {
      fetchReq(local);
    }

    if (localValue !== undefined && firstRendering) {
      fetchReq(localValue);
      setFirstRendering(false);
    }

    return () => {
      window.removeEventListener('localStorageChanged', changeLocalStorage);
    };
  }, [currentPage, firstRendering, local, localValue, page, params, setParams]);

  if (isError) {
    return (
      <p className={cls.error}>
        {transformError((error as ResError).status ?? '1')}
      </p>
    );
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
