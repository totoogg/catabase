import { memo } from 'react';
import cls from './ErrorPageBoundary.module.css';

export const ErrorPageBoundary = memo(() => {
  return <div className={cls.text}>Something went wrong!</div>;
});

ErrorPageBoundary.displayName = 'ErrorPageBoundary';
