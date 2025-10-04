import { FC, memo, MouseEvent, useEffect, useRef } from 'react';
import cls from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Button } from '../Button/Button';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = memo(({ children, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOverview = (event: MouseEvent) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div ref={dialogRef} onClick={handleClickOverview} className={cls.overview}>
      <div className={cls.modal}>
        <Button className={cls.close} onClick={onClose}>
          <span className={cls.line}></span>
          <span className={cls.line}></span>
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = 'Modal';
