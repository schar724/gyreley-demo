import { useState } from "react";

// Hook to show the modal and return the result as a Promise
export const useAsyncModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolvePromise, setResolvePromise] =
    useState<(value: boolean) => void>();

  // Function to open the modal and return a promise
  const showModal = () => {
    setIsModalOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve); // Store the resolve function for later use
    });
  };

  // Handle closing the modal
  const handleRequestClose = (value: boolean) => {
    setIsModalOpen(false);
    if (resolvePromise) {
      resolvePromise(value); // Resolve the promise with the user's choice
    }
  };

  return { showModal, isModalOpen, handleRequestClose, setIsModalOpen };
};
