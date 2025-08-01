import { Footer, Header } from '@/widgets';
import { FC, ReactNode, useContext } from 'react';
import cls from './Layout.module.css';
import { useParams } from 'react-router';
import { ThemeContext } from '@/shared';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { catId } = useParams();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={[
        theme !== 'light' ? cls.moon : '',
        cls.Layout,
        catId ? cls.showCatById : '',
      ].join(' ')}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.displayName = 'Layout';
