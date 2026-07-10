type BookingTrackingPayload = {
  item_name?: string;
  item_category?: string;
  value?: number;
  currency?: string;
  payment_choice?: string;
};

export const trackBookingSubmitted = (payload: BookingTrackingPayload = {}) => {
  const gtag = (window as any)?.gtag;
  if (typeof gtag !== 'function') {
    return;
  }

  const eventPayload: Record<string, string | number> = {
    item_name: payload.item_name || 'Booking',
    item_category: payload.item_category || 'booking',
    currency: payload.currency || 'THB',
  };

  if (typeof payload.value === 'number' && Number.isFinite(payload.value)) {
    eventPayload.value = payload.value;
  }
  if (payload.payment_choice) {
    eventPayload.payment_choice = payload.payment_choice;
  }

  gtag('event', 'booking_submitted', eventPayload);
};