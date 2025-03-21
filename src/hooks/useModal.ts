import { useState } from "react";

const useModal = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (modalData?: T) => {
    setData(modalData || null);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setData(null);
  };

  return { isOpen, openModal, closeModal, data };
};

export default useModal;
