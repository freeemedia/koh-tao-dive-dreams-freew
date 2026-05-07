import React from 'react';

interface SectionedDetailsModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    user: Record<string, any>;
    booking: Record<string, any>;
    finance: Record<string, any>;
    [key: string]: Record<string, any>;
  };
}

const SectionedDetailsModal: React.FC<SectionedDetailsModalProps> = ({ open, onClose, data }) => {
  if (!open) return null;

  const sectionTitles: Record<string, string> = {
    user: 'User Info',
    booking: 'Booking Details',
    finance: 'Finance',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[calc(100vh-4rem)] overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="space-y-6 mb-4 text-left">
          {Object.entries(data).map(([section, fields]) => (
            <div key={section}>
              <h3 className="text-lg font-semibold mb-2 border-b pb-1">{sectionTitles[section] || section}</h3>
              <div className="space-y-1">
                {Object.entries(fields).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4">
                    <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                    <span className="text-right break-words">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          {/* Placeholder for future invoice/CR actions */}
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SectionedDetailsModal;
