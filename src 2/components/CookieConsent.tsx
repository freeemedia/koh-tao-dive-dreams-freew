import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const CONSENT_KEY = 'cookie-consent-v1';

const CookieConsent: React.FC = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(CONSENT_KEY) === 'accepted';
    setVisible(!accepted);
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-24 z-50 rounded-xl border border-gray-200 bg-background p-4 shadow-xl md:right-auto md:max-w-md">
      <p className="text-sm text-gray-700">
        {isDutch
          ? 'We gebruiken cookies om je ervaring te verbeteren. Door op Accepteren te klikken ga je akkoord met ons gebruik van cookies.'
          : 'We use cookies to improve your experience. By clicking Accept, you agree to our use of cookies.'}
      </p>
      <div className="mt-3 flex justify-end">
        <Button onClick={acceptCookies} className="bg-blue-600 hover:bg-blue-700">
          {isDutch ? 'Accepteren' : 'Accept'}
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
