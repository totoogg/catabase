'use client';

import { Footer, Header } from '@/widgets';
import { FC, ReactNode, useContext } from 'react';
import cls from './Layout.module.css';
import { ThemeContext } from '@/shared';
import { useParams } from 'next/navigation';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const params = useParams();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        theme !== 'light' ? cls.dark : '',
        cls.Layout,
        params['catId'] ? cls.showCatById : '',
      ].join(' ')}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.displayName = 'Layout';
