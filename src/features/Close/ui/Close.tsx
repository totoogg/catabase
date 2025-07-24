import { Button } from '@/shared';
import cls from './Close.module.css';
import { FC } from 'react';

interface CloseProps {
  className?: string;
}

export const Close: FC<CloseProps> = ({ className }) => {
  return (
    <Button className={[cls.close, className].join(' ')}>
      <span className={cls.line}></span>
      <span className={cls.line}></span>
    </Button>
  );
};
