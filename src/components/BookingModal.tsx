
import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void | Promise<void>;
}


const LOCAL_STORAGE_KEY = 'bookingModalForm';

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const wpFormUrl = 'https://lightsalmon-dinosaur-377714.hostingersite.com/?fluent_forms_pages=1&preview_id=3';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[calc(100vh-4rem)] overflow-auto rounded-lg bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">New Booking</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl leading-none">&times;</button>
        </div>
        <iframe
          src={wpFormUrl}
          className="w-full"
          style={{ height: '600px', border: 'none' }}
          title="Booking Form"
        />
      </div>
    </div>
  );
};

export default BookingModal;
