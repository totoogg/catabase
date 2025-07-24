import { CardId } from '@/entities';
import cls from './Cat.module.css';
import { MouseEvent } from 'react';
import { Close } from '@/features';
import { useNavigate } from 'react-router';

export const Cat = () => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent) => {
    const classes = (e.target as HTMLElement).className;
    if (classes.includes('wrapper') || classes.includes('close')) {
      navigate(`/`);
    }
  };

  return (
    <div className={cls.Cat}>
      <div className={cls.wrapper} onClick={handleClick}>
        <div className={cls.content}>
          <Close className={cls.close} />
          <CardId />
        </div>
      </div>
    </div>
  );
};
