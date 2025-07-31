import { useEffect, useState } from 'react';
import cls from './Pagination.module.css';
import { ButtonPage } from '@/features';

export const Pagination = () => {
  const [countPages, setCountPages] = useState<number>(0);

  useEffect(() => {
    const changeTotalPages = (event: Event) => {
      const customEvent = event as CustomEvent & {
        pages: number;
      };

      if (customEvent.pages) {
        setCountPages((prev) =>
          customEvent.pages !== prev ? customEvent.pages : prev
        );
      } else {
        setCountPages(0);
      }
    };

    window.addEventListener('totalPages', changeTotalPages);

    return () => window.removeEventListener('totalPages', changeTotalPages);
  }, []);

  if (countPages <= 1) {
    return null;
  }

  return (
    <div className={cls.Pagination}>
      {Array(countPages)
        .fill(0)
        .map((_, index) => {
          return <ButtonPage key={index} index={index + 1} />;
        })}
    </div>
  );
};

Pagination.displayName = 'Pagination';
