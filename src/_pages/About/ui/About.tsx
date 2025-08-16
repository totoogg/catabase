'use client';

import { Author, School } from '@/entities';
import cls from './About.module.css';
import { Button, CustomLink, ThemeContext } from '@/shared';
import { ToggleTheme } from '@/features';
import { useContext } from 'react';
import { useTranslations } from 'next-intl';

export const About = () => {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations('Buttons');

  return (
    <div className={[theme !== 'light' ? cls.moon : '', cls.About].join(' ')}>
      <div className="wrapper">
        <div className={cls.content}>
          <ToggleTheme />
          <Author />
          <School />
          <CustomLink href="/" className={cls.link}>
            <Button variant="filled" colorBtn="success" className={cls.return}>
              {t('home')}
            </Button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};
