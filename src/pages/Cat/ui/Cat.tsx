import { CardId } from '@/entities';
import cls from './Cat.module.css';
import { MouseEvent } from 'react';
import { Close, ToggleTheme } from '@/features';
import { useNavigate, useSearchParams } from 'react-router';

export const Cat = () => {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const page = parseInt(params.get('page') || '1');

  const handleClick = (e: MouseEvent) => {
    const classes = (e.target as HTMLElement).className;
    if (
      classes.includes('wrapper') ||
      classes.includes('close') ||
      classes.includes('line') ||
      classes.includes('Cat')
    ) {
      navigate(`/?page=${page}`);
    }
  };

  return (
    <div className={cls.Cat} onClick={handleClick}>
      <div className={cls.wrapper}>
        <div className={cls.content}>
          <div className={cls.btnContainer}>
            <ToggleTheme />
            <Close className={cls.close} />
          </div>
          <CardId />
        </div>
      </div>
    </div>
  );
};
