import React, { useState } from 'react';
import { Calendar, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CALENDAR_FEED_URL = 'https://lembonganwatersports.com/api/bookings/calendar';

const CalendarSubscribe: React.FC = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const [copied, setCopied] = useState(false);

  const content = isDutch ? {
    title: 'Abonneer op onze duikkalender',
    subtitle: 'Voeg onze beschikbare duikmogelijkheden toe aan je eigen kalender',
    instructions: 'Volg deze stappen om je op de kalender in te schrijven:',
    google: {
      label: 'Google Calendar',
      description: 'Voeg de kalender toe aan Google Calendar:',
      step1: '1. Kopieer de kalender-URL',
      step2: '2. Ga naar Google Calendar (calendar.google.com)',
      step3: '3. Klik "Andere kalenders toevoegen" (+)',
      step4: '4. Selecteer "Via URL inschrijven"',
      step5: '5. Plak de URL en klik "Inschrijven"',
    },
    apple: {
      label: 'Apple Calendar',
      description: 'Abonneer je op Apple Calendar:',
      step1: '1. Kopieer de kalender-URL',
      step2: '2. Open Calendar app op iPhone/Mac',
      step3: '3. Klik "Kalenders" en "Abonnement toevoegen"',
      step4: '4. Plak de URL en voltooi de inschrijving',
    },
    copy: 'Kopieer URL',
    copied: 'Gekopieerd!',
    noteTitle: 'Opmerking:',
    note: 'De kalender wordt automatisch bijgewerkt wanneer er bevestigde bookings bijkomen. Het synchroniseren kan enkele uren duren.',
  } : {
    title: 'Subscribe to Our Dive Calendar',
    subtitle: 'Add our available dive opportunities to your own calendar',
    instructions: 'Follow these steps to subscribe to the calendar:',
    google: {
      label: 'Google Calendar',
      description: 'Add the calendar to Google Calendar:',
      step1: '1. Copy the calendar URL',
      step2: '2. Go to Google Calendar (calendar.google.com)',
      step3: '3. Click "Add other calendars" (+)',
      step4: '4. Select "Subscribe to calendar"',
      step5: '5. Paste the URL and click "Subscribe"',
    },
    apple: {
      label: 'Apple Calendar',
      description: 'Subscribe to Apple Calendar:',
      step1: '1. Copy the calendar URL',
      step2: '2. Open Calendar app on iPhone/Mac',
      step3: '3. Click "Calendars" and "Add subscription"',
      step4: '4. Paste the URL and complete subscription',
    },
    copy: 'Copy URL',
    copied: 'Copied!',
    noteTitle: 'Note:',
    note: 'The calendar automatically updates when confirmed bookings are added. Sync can take several hours.',
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(CALENDAR_FEED_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-10 w-10 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3">{content.title}</h2>
          <p className="text-lg text-gray-300">{content.subtitle}</p>
        </div>

        {/* Calendar URL Section */}
        <div className="mb-12 bg-gray-750 rounded-lg p-6 border border-gray-600">
          <h3 className="text-xl font-semibold mb-4">{content.google.step1}</h3>
          <div className="flex items-center gap-3">
            <label htmlFor="calendar-feed-url" className="sr-only">Calendar feed URL</label>
            <input
              id="calendar-feed-url"
              type="text"
              value={CALENDAR_FEED_URL}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-200 rounded border border-gray-600 text-sm font-mono overflow-x-auto"
            />
            <button
              onClick={handleCopyUrl}
              className={`px-4 py-3 rounded font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" /> {content.copied}
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" /> {content.copy}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Instructions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Google Calendar */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-2 text-blue-400">{content.google.label}</h3>
            <p className="text-gray-300 mb-4">{content.google.description}</p>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li>{content.google.step1}</li>
              <li>{content.google.step2}</li>
              <li>{content.google.step3}</li>
              <li>{content.google.step4}</li>
              <li>{content.google.step5}</li>
            </ol>
          </div>

          {/* Apple Calendar */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-2 text-blue-400">{content.apple.label}</h3>
            <p className="text-gray-300 mb-4">{content.apple.description}</p>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li>{content.apple.step1}</li>
              <li>{content.apple.step2}</li>
              <li>{content.apple.step3}</li>
              <li>{content.apple.step4}</li>
            </ol>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
          <p className="text-blue-200">
            <strong>{content.noteTitle}</strong> {content.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalendarSubscribe;
