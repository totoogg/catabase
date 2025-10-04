import { FC, InputHTMLAttributes, Ref } from 'react';
import cls from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  ref?: Ref<HTMLInputElement>;
  id?: string;
  name?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { className, ref, id, name, ...otherProps } = props;

  const classes = [cls.input, className].join(' ');

  return (
    <input ref={ref} id={id} name={name} className={classes} {...otherProps} />
  );
};

Input.displayName = 'Input';
