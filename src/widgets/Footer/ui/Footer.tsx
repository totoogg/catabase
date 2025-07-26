import { memo } from 'react';
import cls from './Footer.module.css';
import { Link } from 'react-router';

export const Footer = memo(() => {
  return (
    <div className={cls.Footer}>
      <div className={['wrapper', cls.wrapper].join(' ')}>
        <Link to="about" className={cls.link}>
          About
        </Link>
      </div>
    </div>
  );
});

Footer.displayName = 'Footer';
