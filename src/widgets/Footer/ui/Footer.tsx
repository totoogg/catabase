import { CustomLink } from '@/shared';
import cls from './Footer.module.css';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <div className={cls.Footer}>
      <div className={['wrapper', cls.wrapper].join(' ')}>
        <CustomLink href="about" className={cls.link}>
          {t('about')}
        </CustomLink>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
