import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RegistrationCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const registrationCode = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const incoming = params.get('registration_code')?.trim();
    if (incoming) return incoming;
    return crypto.randomUUID().replace(/-/g, '').slice(0, 32);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-emerald-500 py-8 px-6 text-center">
          <div className="text-5xl mb-3">✅</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Registration Complete</h1>
          <p className="text-emerald-100 mt-2">
            Thanks for registering. Your request has been received.
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold mb-1">Your Registration Code</p>
            <p className="text-lg font-bold tracking-wide break-all">{registrationCode}</p>
            <p className="mt-2 text-emerald-800">
              Please save this code. We may ask for it when confirming your booking details.
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold mb-1">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>We review your registration details.</li>
              <li>You receive a confirmation email from our team.</li>
              <li>
                Need help now? WhatsApp us at{' '}
                <a
                  href="https://wa.me/66639230132"
                  className="font-semibold underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +66 63 923 0132
                </a>
                .
              </li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
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
  );
};

export default RegistrationCompletePage;