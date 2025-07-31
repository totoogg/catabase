import { Footer, Header } from '@/widgets';
import { FC, ReactNode } from 'react';
import cls from './Layout.module.css';
import { useParams } from 'react-router';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { catId } = useParams();

  return (
    <div className={[cls.Layout, catId ? cls.showCatById : ''].join(' ')}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.displayName = 'Layout';
