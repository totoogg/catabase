import { FC, useEffect, useState } from 'react';
import cls from './Selector.module.css';

interface SelectorProps {
  options: string[];
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export const Selector: FC<SelectorProps> = ({
  onChange,
  options,
  label,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${className}`)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [className]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false);
    onChange(option);
  };

  const handleClick = () => setShowOptions(!showOptions);

  return (
    <div className={[cls['custom-select'], className].join(' ')}>
      <div className={cls['select-box']} onClick={handleClick}>
        {selectedOption ? selectedOption : label}
      </div>
      <div className={[cls.options, showOptions ? cls.show : ''].join(' ')}>
        {options.map((option) => (
          <div
            key={option}
            className={cls.option}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};
