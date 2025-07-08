import { Component, ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

export default class Layout extends Component<LayoutProps> {
  render() {
    return <>{this.props.children}</>;
  }
}
