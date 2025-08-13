'use client';

import { FC, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import {
  Button,
  LOCAL_SEARCH,
  ResError,
  transformError,
  useGetCatsQuery,
  useGetLocalData,
} from '@/shared';
import { Card } from '@/entities';
import { SkeletonLoading } from './SkeletonLoading';
import { NotFound } from './NotFound';
import { Select } from '@/features';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const CardList: FC = () => {
  const [local, setLocal] = useState('');
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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
        const searchParams = new URLSearchParams(params);
        searchParams.set('page', '1');
        router.push(`${pathname}?${searchParams.toString()}`);
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
  }, [currentPage, firstRendering, local, localValue, page, params]);

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
          <Link href={`cats/${el.id}?page=${page}`} className={cls.more}>
            <Button className={cls.more} variant="filled" colorBtn="success">
              Read more
            </Button>
          </Link>

          <Select data={el} />
        </Card>
      ))}
    </div>
  );
};

CardList.displayName = 'CardList';
