import { CustomLink } from '@/shared';
import cls from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={cls.Footer}>
      <div className={['wrapper', cls.wrapper].join(' ')}>
        <CustomLink href="about" className={cls.link}>
          About
        </CustomLink>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
