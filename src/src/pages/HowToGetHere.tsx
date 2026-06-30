import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const parseLabeledItems = (value: string) =>
  parseLines(value).map((line) => {
    const [label, text] = line.split('|');
    return { label: (label || '').trim(), text: (text || '').trim() };
  });

const HowToGetHere = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Hoe kom je op Koh Tao' : 'How to get to Koh Tao',
    subtitle:
      locale === 'nl'
        ? 'Verschillende routes om dit eilandparadijs te bereiken.'
        : 'Different routes to reach this island paradise.',
    options_title: locale === 'nl' ? 'Reisopties' : 'Travel options',
    options_list:
      locale === 'nl'
        ? 'Met de ferry:|Koh Tao is alleen per boot bereikbaar. Ferries vertrekken vanaf Chumphon, Surat Thani, Koh Samui en Koh Phangan. Bekende aanbieders zijn Lomprayah, Songserm en Seatran.\nMet de trein:|Reis met de trein van Bangkok naar Chumphon en stap daar over op de ferry.\nMet de bus:|Bussen vanuit Bangkok en andere steden sluiten aan op ferryterminals in Chumphon en Surat Thani.\nMet het vliegtuig:|Vlieg naar Koh Samui, Chumphon of Surat Thani en neem daarna de ferry naar Koh Tao.'
        : 'By ferry:|Koh Tao is only accessible by boat. Ferries depart from Chumphon, Surat Thani, Koh Samui, and Koh Phangan. Popular operators include Lomprayah, Songserm, and Seatran.\nBy train:|Take a train from Bangkok to Chumphon and transfer to the ferry there.\nBy bus:|Buses from Bangkok and other cities connect to ferry terminals in Chumphon and Surat Thani.\nBy plane:|Fly to Koh Samui, Chumphon, or Surat Thani and then take a ferry to Koh Tao.',
    cta_book_stay: locale === 'nl' ? 'Boek verblijf' : 'Book accommodation',
    cta_visa_info: locale === 'nl' ? 'Visuminformatie' : 'Visa information',
    tip:
      locale === 'nl'
        ? 'Tip: boek ferrytickets in het hoogseizoen op tijd. De meeste ferries komen aan bij Mae Haad Pier.'
        : 'Tip: book ferry tickets early during high season. Most ferries arrive at Mae Haad Pier.',
    ferry_title: locale === 'nl' ? 'Ferry-opties' : 'Ferry options',
    ferry_options_list:
      locale === 'nl'
        ? 'Speedboot:|1-1,5 uur, duurder maar sneller\nNachtferry:|Goedkopere optie, aankomst in de ochtend\nDagferry:|Standaardoptie met mooie uitzichten\n|Bekijk websites van operators voor schema\'s en kortingen'
        : 'Speed boat:|1-1.5 hours, more expensive but faster\nNight ferry:|Cheaper option, arrival in the morning\nDay ferry:|Standard option with scenic views\n|Check operator websites for schedules and discounts',
  };

  const { content } = usePageContent({
    pageSlug: 'how-to-get-here',
    locale,
    fallbackContent,
  });

  const options = parseLabeledItems(content.options_list || fallbackContent.options_list);
  const ferryOptions = parseLabeledItems(content.ferry_options_list || fallbackContent.ferry_options_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/sailrock.webp')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.options_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {options.map((option) => (
          <li key={option.label + option.text}><strong>{option.label}</strong> {option.text}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{content.cta_book_stay}</a>
        <a href="/VisasKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_visa_info}</a>
      </div>
      <p className="text-sm text-gray-500">{content.tip}</p>
    </section>

    {/* Ferry Options Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{content.ferry_title}</h3>
      <ul className="list-disc pl-6 mb-2">
        {ferryOptions.map((option) => (
          <li key={option.label + option.text}>{option.label ? <strong>{option.label}</strong> : null} {option.text}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default HowToGetHere;
