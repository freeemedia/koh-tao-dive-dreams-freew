import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookNowModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (open) {
      navigate('/booking');
      onClose();
    }
  }, [open, navigate, onClose]);

  return null;
};

export default BookNowModal;
