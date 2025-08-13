'use client';

import { Button } from '@/shared';
import cls from './ErrorPage.module.css';
import { useRouter } from 'next/navigation';

export const ErrorPage = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push('/?page=1');
  };

  return (
    <div className={cls.wrapper}>
      <h1>404 NotFound</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button variant="filled" colorBtn="success" onClick={handleHome}>
        Home page
      </Button>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';
