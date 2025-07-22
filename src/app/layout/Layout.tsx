import { Footer, Header } from '@/widgets';
import { FC, memo, ReactNode } from 'react';
import cls from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = memo(({ children }) => {
  return (
    <div className={cls.Layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
