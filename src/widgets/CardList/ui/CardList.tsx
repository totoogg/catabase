'use client';

import { FC } from 'react';
import cls from './CardList.module.css';
import { Button, CardTypes, CustomLink, transformError } from '@/shared';
import { Card } from '@/entities';
import { NotFound } from './NotFound';
import { Select } from '@/features';
import { useSearchParams } from 'next/navigation';

interface CardListProps {
  data: CardTypes[];
  status: number;
}

export const CardList: FC<CardListProps> = ({ data, status }) => {
  const params = useSearchParams();

  const page = parseInt(params.get('page') || '1');

  const query = params.get('query') || '';

  if (status > 399) {
    return <p className={cls.error}>{transformError(String(status))}</p>;
  }

  if (data.length === 0) {
    return <NotFound text={query || ''} />;
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
