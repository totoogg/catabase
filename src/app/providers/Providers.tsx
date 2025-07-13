import { Component, ReactNode } from 'react';

interface ProvidersProps {
  children?: ReactNode;
}

export default class Providers extends Component<ProvidersProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
