import { ButtonHTMLAttributes, Component, ReactNode } from 'react';
import cls from './Button.module.css';

export type ButtonTheme = 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  colorBtn?: ButtonColor;
  variant?: ButtonTheme;
}

export class Button extends Component<ButtonProps> {
  render() {
    const {
      variant = 'outline',
      colorBtn = 'normal',
      children,
      className,
      ...otherProps
    } = this.props;

    const classes = [cls[variant], cls[colorBtn], cls.button, className].join(
      ' '
    );

    return (
      <button className={classes} {...otherProps}>
        {children ?? 'Button'}
      </button>
    );
  }
}
