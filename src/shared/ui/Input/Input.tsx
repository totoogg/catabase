import { Component, InputHTMLAttributes } from 'react';
import cls from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export class Input extends Component<InputProps> {
  render() {
    const { className, ...otherProps } = this.props;

    const classes = [cls.input, className].join(' ');

    return <input className={classes} {...otherProps} />;
  }
}
