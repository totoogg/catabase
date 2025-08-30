import { FC, InputHTMLAttributes, memo } from 'react';
import cls from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
}

export const Checkbox: FC<CheckboxProps> = memo((props) => {
  const { id, isChecked, ...otherProps } = props;

  return (
    <>
      <input
        type="checkbox"
        className={cls['custom-checkbox']}
        id={`choose-${id}`}
        name="choose"
        checked={isChecked}
        {...otherProps}
      />
      <label htmlFor={`choose-${id}`} className={cls.checkbox}></label>
    </>
  );
});

Checkbox.displayName = 'Checkbox';
