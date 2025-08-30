import { useState } from 'react';
import cls from './Header.module.css';
import { Button, Modal } from '@/components';

export const Header = () => {
  const [showModal, setShowModal] = useState<string | null>(null);

  const close = () => {
    setShowModal(null);
  };

  const handleShowForm = (name: string) => {
    return () => {
      setShowModal(name);
    };
  };

  return (
    <header className={cls.header}>
      <Button variant="filled" onClick={handleShowForm('uncontrolled')}>
        Uncontrolled Form
      </Button>
      <Button variant="filled" onClick={handleShowForm('controlled')}>
        Controlled Form
      </Button>

      {showModal === 'controlled' && <Modal onClose={close}>asd</Modal>}
      {showModal === 'uncontrolled' && <Modal onClose={close}>asd</Modal>}
    </header>
  );
};
