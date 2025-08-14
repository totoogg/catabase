'use client';

import { Button } from '@/shared';
import cls from './error.module.css';
import { ErrorPageBoundary } from '@/_pages';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={cls.wrapper}>
      <h2>{error.name}</h2>
      <ErrorPageBoundary />
      <Button variant="filled" colorBtn="error" onClick={() => reset()}>
        reset
      </Button>
    </main>
  );
}
