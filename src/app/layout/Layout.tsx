import { Footer, Header } from '@/widgets';
import { Component, ReactNode } from 'react';
import cls from './Layout.module.css';

interface LayoutProps {
  children?: ReactNode;
}

export default class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className={cls.Layout}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
