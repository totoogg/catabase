import cls from './ErrorPageBoundary.module.css';

export const ErrorPageBoundary = () => {
  return <div className={cls.text}>Something went wrong!</div>;
};

ErrorPageBoundary.displayName = 'ErrorPageBoundary';
