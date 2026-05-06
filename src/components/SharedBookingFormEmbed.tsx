import React, { useMemo } from 'react';

interface SharedBookingFormEmbedProps {
  itemTitle: string;
  itemType?: 'course' | 'dive';
  priceThb?: number;
  depositThb?: number;
  currency?: string;
  locale?: 'en' | 'nl';
  className?: string;
}

const SharedBookingFormEmbed: React.FC<SharedBookingFormEmbedProps> = ({
  itemTitle,
  itemType = 'course',
  priceThb,
  depositThb,
  currency = 'THB',
  locale = 'en',
  className = '',
}) => {
  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('item', itemTitle);
    params.set('type', itemType);

    if (typeof priceThb === 'number' && Number.isFinite(priceThb) && priceThb > 0) {
      params.set('price', String(priceThb));
    }

    if (currency) {
      params.set('currency', currency);
    }

    if (typeof depositThb === 'number' && Number.isFinite(depositThb) && depositThb > 0) {
      params.set('deposit', String(depositThb));
    }

    return `/bookingform.html?${params.toString()}`;
  }, [currency, depositThb, itemTitle, itemType, priceThb]);

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-xl">
        <iframe
          src={bookingUrl}
          title={`${itemTitle} booking form`}
          className="h-[980px] w-full border-0"
          loading="lazy"
        />
      </div>
      <div className="mt-3 text-center text-sm text-muted-foreground">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-teal-700 underline-offset-4 hover:underline"
        >
          {locale === 'nl' ? 'Open het groene boekingsformulier in een nieuw tabblad' : 'Open the green booking form in a new tab'}
        </a>
      </div>
    </div>
  );
};

export default SharedBookingFormEmbed;