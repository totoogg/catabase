import { ButtonHTMLAttributes, Component, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export class Button extends Component<ButtonProps> {
  render() {
    const { children, ...otherProps } = this.props;

    return <button {...otherProps}>{children ?? 'Button'}</button>;
  }
}
