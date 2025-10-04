import { FC, InputHTMLAttributes, memo, Ref } from 'react';
import cls from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: Ref<HTMLInputElement>;
}

export const Input: FC<InputProps> = memo((props) => {
  const { className, ref, ...otherProps } = props;

  const classes = [cls.input, className].join(' ');

  return <input ref={ref} className={classes} {...otherProps} />;
});

Input.displayName = 'Input';
