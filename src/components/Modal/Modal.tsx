import { FC, MouseEvent, useRef } from 'react';
import csl from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOverview = (event: MouseEvent) => {
    if (event.target === dialogRef.current) {
      console.log('close');
      onClose();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      onClick={handleClickOverview}
      className={csl.overview}
      aria-modal="true"
    >
      <div className={csl.modal}>
        <button className={csl.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
