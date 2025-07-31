import { FC, InputHTMLAttributes } from 'react';
import cls from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { className, ...otherProps } = props;

  const classes = [cls.input, className].join(' ');

  return <input className={classes} {...otherProps} />;
};

Input.displayName = 'Input';
