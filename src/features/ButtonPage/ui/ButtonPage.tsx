import { FC } from 'react';
import cls from './ButtonPage.module.css';
import { Button } from '@/shared';
import { useSearchParams } from 'react-router';

interface ButtonPageProps {
  index: number;
}

export const ButtonPage: FC<ButtonPageProps> = ({ index }) => {
  const [params, setParams] = useSearchParams();

  const handleClick = () => {
    setParams((prev) => {
      prev.set('page', index.toString());
      return prev;
    });
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
