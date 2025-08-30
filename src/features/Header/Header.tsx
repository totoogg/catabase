import { FC, useState } from 'react';
import cls from './Header.module.css';
import { Button, Modal } from '@/components';
import { Search } from './Search';
import { Sort } from './Sort';
import { ChooseYear } from './ChooseYear';
import { SetColumn } from '../SetColumn/SetColumn';
import { SortRegion } from './SortRegion';

interface HeaderProps {
  onChangeSearch: (value: string) => void;
  onChangeSort: (value: string) => void;
  onChangeYear: (value: string) => void;
  onChangeRegion: (value: string) => void;
  columns: string[];
  onChangeColumn: (value: string[]) => void;
}

export const Header: FC<HeaderProps> = ({
  columns,
  onChangeColumn,
  onChangeSearch,
  onChangeSort,
  onChangeYear,
  onChangeRegion,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const close = () => {
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <Search onChange={onChangeSearch} />
        <div className={cls.actions}>
          <Sort onChange={onChangeSort} />
          <SortRegion onChange={onChangeRegion} />
          <ChooseYear onChange={onChangeYear} />
          <Button variant="filled" onClick={handleShowModal}>
            Set Column
          </Button>
        </div>
      </div>

      {showModal && (
        <Modal onClose={close}>
          <SetColumn
            onClose={close}
            columns={columns}
            onChange={onChangeColumn}
          />
        </Modal>
      )}
    </header>
  );
};
