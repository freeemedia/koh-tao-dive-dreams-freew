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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header band */}
        <div className="bg-emerald-500 py-8 px-6 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Booking Request Received!</h1>
          <p className="text-emerald-100 mt-2">
            Thank you — we'll be in touch shortly to confirm your details.
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Booking summary */}
          {bookingData && (
            <div className="rounded-xl border bg-gray-50 p-4 text-sm space-y-2">
              <h2 className="font-semibold text-gray-700 mb-3 uppercase tracking-wide text-xs">
                Your Booking Summary
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
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold mb-1">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>You'll receive a confirmation email shortly.</li>
              <li>Our team will review your request and contact you within 24 hours.</li>
              <li>
                Questions? WhatsApp us at{' '}
                <a
                  href="https://wa.me/31638697279"
                  className="font-semibold underline"
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
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-400">
              Redirecting to homepage in{' '}
              <span className="font-semibold text-gray-600">{countdown}s</span>…
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)}>
                ← Go back
              </Button>
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white"
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
