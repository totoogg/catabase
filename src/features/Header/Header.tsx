import { useState } from 'react';
import cls from './Header.module.css';
import { Button, Modal } from '@/components';
import { Search } from './Search';
import { Sort } from './Sort';
import { ChooseYear } from './ChooseYear';

export const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const close = () => {
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <Search />
        <div className={cls.actions}>
          <Sort />
          <ChooseYear />
          <Button variant="filled" onClick={handleShowModal}>
            Set Column
          </Button>
        </div>
      </div>

      {showModal && <Modal onClose={close}>asd</Modal>}
    </header>
  );
};
