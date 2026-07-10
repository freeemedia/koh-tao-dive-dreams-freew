import React, { Suspense, useState } from 'react';

const FunDiveBooking = React.lazy(() => import('@/components/FunDiveBooking'));

interface DiveSiteBookingCTAProps {
  siteName: string;
  buttonLabel?: string;
}

const DiveSiteBookingCTA: React.FC<DiveSiteBookingCTAProps> = ({
  siteName,
  buttonLabel = 'Book a Fun Dive',
}) => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <div className="flex justify-center my-8">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          onClick={() => setShowBooking(true)}
        >
          {buttonLabel}
        </button>
      </div>
      {showBooking && (
        <Suspense fallback={<div className="text-center py-8">Loading booking form…</div>}>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
            onClick={() => setShowBooking(false)}
          >
            <div className="relative w-full max-w-md" onClick={(event) => event.stopPropagation()}>
              <button
                className="absolute top-2 right-2 z-10 text-2xl font-bold text-gray-500 hover:text-gray-800"
                onClick={() => setShowBooking(false)}
                aria-label="Close"
              >
                ×
              </button>
              <FunDiveBooking initialSite={siteName} />
            </div>
          </div>
        </Suspense>
      )}
    </>
  );
};

export default DiveSiteBookingCTA;