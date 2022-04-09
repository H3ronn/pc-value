import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setModalState] = useState(initialState);

  const handleOpenModal = () => setModalState(true);
  const handleCloseModal = () => setModalState(false);

  return {
    isOpen,
    handleOpenModal,
    handleCloseModal,
    setModalState,
  };
};
