'use client';

import { FC } from 'react';
import cls from './ButtonPage.module.css';
import { Button } from '@/shared';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ButtonPageProps {
  index: number;
}

export const ButtonPage: FC<ButtonPageProps> = ({ index }) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set('page', index.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Button
      className={[
        cls.ButtonPage,
        index === Number(params.get('page') ?? 1) ? cls.active : '',
      ].join(' ')}
      onClick={handleClick}
    >
      {index}
    </Button>
  );
};

ButtonPage.displayName = 'ButtonPage';
