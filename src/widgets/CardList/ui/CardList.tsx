'use client';

import { FC, useEffect, useState } from 'react';
import cls from './CardList.module.css';
import {
  Button,
  CardTypes,
  CustomLink,
  LOCAL_SEARCH,
  transformError,
  useGetLocalData,
} from '@/shared';
import { Card } from '@/entities';
import { NotFound } from './NotFound';
import { Select } from '@/features';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface CardListProps {
  data: CardTypes[];
  status: number;
}

export const CardList: FC<CardListProps> = ({ data, status }) => {
  const [local, setLocal] = useState('');
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [firstRendering, setFirstRendering] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { value: localValue } = useGetLocalData();

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
  }, [
    currentPage,
    firstRendering,
    local,
    localValue,
    page,
    params,
    pathname,
    router,
  ]);

  if (status > 399) {
    return <p className={cls.error}>{transformError(String(status))}</p>;
  }

  if (data.length === 0) {
    return <NotFound text={local} />;
  }

  return (
    <div className={cls.CardList}>
      {data.map((el) => (
        <Card card={el} key={el.id}>
          <CustomLink href={`cats/${el.id}?page=${page}`} className={cls.more}>
            <Button className={cls.more} variant="filled" colorBtn="success">
              Read more
            </Button>
          </CustomLink>

          <Select data={el} />
        </Card>
      ))}
    </div>
  );
};

CardList.displayName = 'CardList';
