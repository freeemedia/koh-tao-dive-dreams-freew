import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

interface WPContent {
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, any>;
}

const WPPageDetail: React.FC<{ slug: string }> = ({ slug }) => {
  const [content, setContent] = useState<WPContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingWarning, setShowBookingWarning] = useState(false);
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const pageSlug = isDutch ? `nl-${slug}` : slug;
    fetch(`https://admin.prodiving.asia/wp-json/wp/v2/pages?slug=${pageSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setContent(data[0]);
        } else {
          setContent(null);
          setError('Page not found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setContent(null);
        setError('Failed to load content.');
        setLoading(false);
      });
  }, [slug, isDutch]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!content) return null;

  // Gallery images from ACF or fallback
  const gallery: string[] = content.acf?.gallery || [];
  // Overview text from ACF or fallback to content
  const overview: string = content.acf?.overview || content.content.rendered;
  // Quick facts from ACF
  const quickFacts = content.acf?.quick_facts || {};

  // Header image: use provided image for Japanese Gardens, else first gallery image
  let headerImage = '';
  if (slug === 'japanese-gardens') {
    headerImage = '/images/japanandwins.jpg';
  } else if (gallery.length > 0) {
    headerImage = gallery[0];
  }
  // What you can see from ACF
  const whatYouCanSee: string[] = content.acf?.what_you_can_see || [];
  // Marine life highlights from ACF
  const highlights: string[] = content.acf?.marine_life_highlights || [];
  // Booking text from ACF
  const bookingText: string = content.acf?.booking_text || '';
  const bookingUrl: string = content.acf?.booking_url || '#';

  return (
    <div className="bg-[#d4f0fc] min-h-screen pb-8 px-2 md:px-8">
      {/* Header image */}
      {headerImage && (
        <div className="w-full max-w-5xl mx-auto mt-6 mb-8">
          <img
            src={headerImage}
            alt="Header"
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg border border-blue-200"
            style={{ objectPosition: 'center' }}
          />
        </div>
      )}
      {/* Overview section as a card */}
      <div className="max-w-5xl mx-auto mb-8">
        <section className="bg-[#b3e0f7] rounded-2xl p-8 shadow-xl border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Overview</h2>
          <div
            className="mb-2 text-blue-900 text-lg"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(overview) }}
          />
        </section>
      </div>

      {/* Main content grid: Quick facts, What you can see */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-10">
        {/* Quick facts */}
        <aside className="bg-[#b3e0f7] rounded-2xl p-8 shadow-xl border border-blue-200 flex flex-col gap-4 h-fit">
          <h3 className="text-xl font-bold mb-2 text-blue-900">Quick facts</h3>
          {quickFacts.depth && <div><span className="font-semibold">Depth range:</span> <span className="text-blue-900">{quickFacts.depth}</span></div>}
          {quickFacts.level && <div><span className="font-semibold">Level:</span> <span className="text-blue-900">{quickFacts.level}</span></div>}
          {quickFacts.location && <div><span className="font-semibold">Location:</span> <span className="text-blue-900">{quickFacts.location}</span></div>}
          {quickFacts.best_time && <div><span className="font-semibold">Best time:</span> <span className="text-blue-700">{quickFacts.best_time}</span></div>}
        </aside>

        {/* What you can see */}
        <aside className="bg-[#b3e0f7] rounded-2xl p-8 shadow-xl border border-blue-200 flex flex-col gap-4 h-fit mt-6 md:mt-0">
          <h3 className="text-xl font-bold mb-2 text-blue-900">What you can see</h3>
          <div className="flex flex-wrap gap-2">
            {whatYouCanSee.map((item, i) => (
              <span key={i} className="bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-900 border border-blue-300 shadow-sm">
                {item}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {/* Marine life highlights and booking */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Marine life highlights */}
        <section className="md:col-span-2 bg-[#b3e0f7] rounded-2xl p-8 shadow-xl border border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Marine life highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-blue-100 rounded-xl px-4 py-3 text-blue-900 shadow border border-blue-200 text-base font-medium">
                <span role="img" aria-label="Fish">🐟</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Booking card */}
        <aside className="bg-[#b3e0f7] rounded-2xl p-8 shadow-xl border border-blue-200 flex flex-col justify-between h-fit">
          <h3 className="text-xl font-bold mb-2 text-blue-900">Ready to dive?</h3>
          <p className="mb-4 text-blue-900">{bookingText}</p>
          <a
            href={bookingUrl}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition text-center shadow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book this dive site
          </a>
        </aside>
      </div>
    </div>
  );
};

export default WPPageDetail;
                <span>Contact</span>
