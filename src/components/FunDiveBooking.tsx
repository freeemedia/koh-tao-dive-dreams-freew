import React, { useEffect, useMemo, useState } from 'react';
import BookingModal from './BookingModal';

const DIVE_SITES = [
  'Aow Leuk',
  'Buoyancy World',
  'Chumphon Pinnacle',
  'HTMS Sattakut',
  'Hin Ngam',
  'Japanese Gardens',
  'Junkyard Reef',
  'Mango Bay',
  'Sail Rock',
  'Shark Island',
  'South West Pinnacle',
  'Tanote Bay',
  'Twins Pinnacle',
  'White Rock',
  'Green Rock',
];

interface FunDiveBookingProps {
  initialSite?: string;
}

const FunDiveBooking: React.FC<FunDiveBookingProps> = ({ initialSite }) => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [processing, setProcessing] = useState(false);

  const availableSites = useMemo(() => {
    if (!initialSite || DIVE_SITES.includes(initialSite)) {
      return DIVE_SITES;
    }

    return [initialSite, ...DIVE_SITES];
  }, [initialSite]);

  useEffect(() => {
    if (!initialSite) {
      return;
    }

    setSelectedSite(initialSite);
    setShowNotice(true);
    setShowConfirmation(false);
  }, [initialSite]);


  const handleSiteSelect = (site: string) => {
    setSelectedSite(site);
    setShowNotice(true);
    setShowConfirmation(false);
  };


  const handleProceed = () => {
    setShowNotice(false);
    setModalOpen(true);
    setShowConfirmation(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        setShowNotice(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="mx-auto w-full max-w-md max-h-[calc(100vh-4rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-900">
        {selectedSite ? `Book ${selectedSite}` : 'Book a Fun Dive'}
      </h1>
      {!initialSite && (
      <ul className="mb-8 flex flex-col gap-4">
        {availableSites.map(site => (
          <li key={site}>
            <button
              className={`w-full px-6 py-3 rounded-lg border font-semibold text-lg transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${selectedSite === site ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200'}`}
              onClick={() => handleSiteSelect(site)}
            >
              {site}
            </button>
          </li>
        ))}
      </ul>
      )}
      {showNotice && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 rounded-lg shadow">
          {selectedSite && (
            <p className="mb-2"><strong>Selected site:</strong> {selectedSite}</p>
          )}
          <p className="mb-2"><strong>Notice:</strong> Due to weather and unforeseeable conditions, schedules may change. We will confirm your booking and keep you updated.</p>
          <button
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={handleProceed}
          >
            Proceed to Booking
          </button>
        </div>
      )}
      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={async data => {
          setProcessing(true);
          // Compose booking payload
          const payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            preferred_date: data.date,
            experience_level: data.experience,
            message: data.message,
            item_title: selectedSite || 'Fun Dive',
            course_title: selectedSite || 'Fun Dive',
          };
          // Send to email notification API
          try {
            await fetch('/api/send-booking-notification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
          } catch (e) {
            // Optionally handle error
          }
          // Send to Supabase bookings API
          try {
            await fetch('/api/bookings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
          } catch (e) {
            // Optionally handle error
          }
          setModalOpen(false);
          setTimeout(() => {
            setProcessing(false);
            setShowConfirmation(true);
            setSelectedSite(null);
            setShowNotice(false);
          }, 1200);
        }}
      />
      {processing && (
        <div className="mt-8 p-5 bg-blue-50 border-l-4 border-blue-400 text-blue-900 rounded-lg shadow text-center animate-pulse">
          <strong>Processing...</strong> Please wait while we submit your booking.
        </div>
      )}
      {showConfirmation && !processing && (
        <div className="mt-8 p-5 bg-green-50 border-l-4 border-green-400 text-green-900 rounded-lg shadow text-center">
          <strong>Thank you!</strong> Your booking request has been submitted. We will contact you soon to confirm your dive.
        </div>
      )}
    </div>
  );
};

export default FunDiveBooking;
