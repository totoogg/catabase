import { Button } from '@/components/Button/Button';
import { Modal } from '@/components/Modal/Modal';
import { useState } from 'react';
import { ControlledForm } from '../ControlledForm/ControlledForm';
import { UncontrolledForm } from '../UncontrolledForm/UncontrolledForm';

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
    <div>
      <Button variant="filled" onClick={handleShowForm('uncontrolled')}>
        UncontrolledForm
      </Button>
      <Button variant="filled" onClick={handleShowForm('controlled')}>
        ControlledForm
      </Button>

      {showModal === 'controlled' && (
        <Modal onClose={close}>
          <ControlledForm />
        </Modal>
      )}
      {showModal === 'uncontrolled' && (
        <Modal onClose={close}>
          <UncontrolledForm />
        </Modal>
      )}
    </div>
  );
};
