import { CardId } from '@/entities';
import cls from './Cat.module.css';
import { MouseEvent } from 'react';
import { Close, ResetCache, ToggleTheme } from '@/features';
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
    <div className={cls.Cat} data-testid="cat" onClick={handleClick}>
      <div className={cls.wrapper} data-testid="wrapper">
        <div className={cls.content} data-testid="content">
          <div className={cls.btnContainer}>
            <ToggleTheme />
            <ResetCache />
            <Close />
          </div>
          <CardId />
        </div>
      </div>
    </div>
  );
};
