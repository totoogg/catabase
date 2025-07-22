import { memo } from 'react';
import cls from './Footer.module.css';

export const Footer = memo(() => {
  return (
    <div className={cls.Footer}>
      <div className={['wrapper', cls.wrapper].join(' ')}></div>
    </div>
  );
});

Footer.displayName = 'Footer';
