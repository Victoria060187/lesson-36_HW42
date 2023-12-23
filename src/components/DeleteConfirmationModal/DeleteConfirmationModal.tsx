import { ReactNode } from 'react';
import './DeleteConfirmationModal.scss';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    children: ReactNode;
  }
  

  function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }: DeleteConfirmationModalProps) {
    if (!isOpen) return null;
  return (
    <div className="delete-confirmation-modal">
      <p>Are you sure you want to delete this contact?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default DeleteConfirmationModal;