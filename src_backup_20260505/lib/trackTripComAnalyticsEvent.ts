// Google Analytics event tracking for Trip.com affiliate clicks
export function trackTripComAnalyticsEvent(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'trip_com_click', {
      event_category: 'Affiliate',
      event_label: url,
      value: 1,
    });
  }
}
