import React from 'react';

interface BookingInfoModalProps {
  open: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

const BookingInfoModal: React.FC<BookingInfoModalProps> = ({ open, onClose, whatsappNumber }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Booking Information</h2>
        <div className="space-y-3 mb-4 text-left">
          <p><strong>How and When to Pay:</strong> We’ll send you payment instructions by email. You can pay your deposit now or later—just let us know your preference!</p>
          <p><strong>Travel Details:</strong> Please reply to your confirmation email with your travel details (arrival date, ferry, flight, etc.) so we can arrange your pickup or check-in.</p>
          <p><strong>Need Help?</strong> We’re available on WhatsApp for any questions or a chat anytime.</p>
          {whatsappNumber && (
            <p className="flex items-center gap-2">
              <span>WhatsApp:</span>
              <a href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{whatsappNumber}</a>
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoModal;
