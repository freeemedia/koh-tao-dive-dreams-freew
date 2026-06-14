import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BookingData {
  item_title?: string;
  name?: string;
  email?: string;
  phone?: string;
  accommodation?: string;
  preferred_date?: string;
  experience_level?: string;
  deposit_amount?: string;
  total_amount?: string;
  balance_amount?: string;
  commission_amount?: string;
  payment_choice?: string;
  [key: string]: string | undefined;
}

const REDIRECT_SECONDS = 10;

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  // Read booking details stored by the form
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('bookingData');
      if (raw) setBookingData(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Countdown + auto-redirect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-emerald-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02]">
        {/* Header band */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-12 px-8 text-center">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Booking Request Received!</h1>
          <p className="text-emerald-100 mt-3 text-lg font-medium">
            Thank you — we'll be in touch shortly to confirm your details.
          </p>
        </div>

        <div className="p-8 space-y-6">
          {/* Booking summary */}
          {bookingData && (
            <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 text-sm space-y-3 shadow-lg">
              <h2 className="font-bold text-emerald-800 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                <span className="text-xl">📋</span> Your Booking Summary
              </h2>
              {[
                { label: 'Activity / Course', value: bookingData.item_title },
                { label: 'Name', value: bookingData.name },
                { label: 'Email', value: bookingData.email },
                { label: 'Phone', value: bookingData.phone },
                { label: 'Preferred Date', value: bookingData.preferred_date },
                { label: 'Accommodation', value: bookingData.accommodation },
                { label: 'Experience Level', value: bookingData.experience_level },
                { label: 'Total Price', value: bookingData.total_amount },
                { label: 'Deposit Due Now', value: bookingData.deposit_amount },
                { label: 'Remaining Balance', value: bookingData.balance_amount },
                { label: 'Payment Option', value: bookingData.payment_choice },
              ]
                .filter(
                  (row) =>
                    row.value &&
                    row.value !== 'N/A' &&
                    row.value !== 'Quote on request' &&
                    row.value !== 'undefined',
                )
                .map((row) => (
                  <div key={row.label} className="flex justify-between gap-2">
                    <span className="text-gray-500 shrink-0">{row.label}:</span>
                    <span className="font-medium text-gray-800 text-right">{row.value}</span>
                  </div>
                ))}
            </div>
          )}

          {/* What's next */}
          <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-sm text-blue-900 shadow-lg">
            <p className="font-bold mb-3 text-lg flex items-center gap-2">
              <span className="text-xl">✨</span> What happens next?
            </p>
            <ul className="list-disc list-inside space-y-2 text-blue-800 font-medium">
              <li>You'll receive a confirmation email shortly.</li>
              <li>Our team will review your request and contact you within 24 hours.</li>
              <li>
                Questions? WhatsApp us at{' '}
                <a
                  href="https://wa.me/31638697279"
                  className="font-bold underline text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +31 6 386 97279
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Countdown + buttons */}
          <div className="text-center space-y-4">
            <p className="text-base text-gray-500 font-medium">
              Redirecting to homepage in{' '}
              <span className="font-bold text-gray-700 text-xl">{countdown}s</span>…
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-base font-semibold border-2 hover:bg-gray-100"
              >
                ← Go back
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/')}
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
