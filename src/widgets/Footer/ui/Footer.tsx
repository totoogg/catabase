import Link from 'next/link';
import cls from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={cls.Footer}>
      <div className={['wrapper', cls.wrapper].join(' ')}>
        <Link href="about" className={cls.link}>
          About
        </Link>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
