import React from 'react';

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  details: Record<string, any>;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ open, onClose, title = 'Details', details }) => {
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
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-2 mb-4">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4">
              <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>
              <span className="text-right break-words">{String(value)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
