import React from 'react';
import BookNowForm from '@/components/BookNowForm';

const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe_0%,_#f0f9ff_40%,_#ffffff_100%)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8 rounded-2xl border border-sky-100 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Lembongan Watersports</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Complete Your Booking Request</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
            Send us your details and choose whether to secure your place with a deposit now or arrange payment later.
          </p>
        </div>

        <BookNowForm fullPage />
      </div>
    </div>
  );
};

export default BookingPage;
