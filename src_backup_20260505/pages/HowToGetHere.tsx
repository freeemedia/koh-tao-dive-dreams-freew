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
    title: locale === 'nl' ? 'Hoe kom je op Nusa Lembongan' : 'How to get to Nusa Lembongan',
    subtitle:
      locale === 'nl'
        ? 'Verschillende routes om dit eilandparadijs te bereiken.'
        : 'Different routes to reach this island paradise.',
    options_title: locale === 'nl' ? 'Reisopties' : 'Travel options',
    options_list:
      locale === 'nl'
        ? 'Met de speedboot:|Nusa Lembongan is eenvoudig bereikbaar per speedboot vanuit Sanur (Bali). De overtocht duurt slechts 30 minuten. Vertrekken zijn er meerdere per dag.\nVanuit Kusamba:|Alternatiefhaven voor speedboten, ook circa 30-45 minuten varen.\nVanuit Padangbai:|Verder weg, maar ook boten beschikbaar vanuit dit haventje op Bali.\nVanuit Kuta/Seminyak:|Shuttle bus naar Sanur, daarna speedboot naar Lembongan.'
        : 'By speedboat from Sanur:|The easiest way to reach Nusa Lembongan. Speedboats depart from Sanur Beach (Bali) multiple times daily. The crossing takes just 30 minutes.\nFrom Kusamba:|Alternative harbour with speedboats, approximately 30-45 minutes crossing.\nFrom Padangbai:|Further away on Bali, but boats are also available from this harbour.\nFrom Kuta/Seminyak:|Take a shuttle bus to Sanur and then board a speedboat to Lembongan.',
    cta_book_stay: locale === 'nl' ? 'Boek verblijf' : 'Book accommodation',
    cta_visa_info: locale === 'nl' ? 'Visuminformatie' : 'Visa information',
    tip:
      locale === 'nl'
        ? 'Tip: boek je speedboottickets vooraf in het hoogseizoen (juli-oktober). De meeste boten komen aan bij Jungutbatu Pier op Nusa Lembongan.'
        : 'Tip: book speedboat tickets in advance during high season (July-October). Most boats arrive at Jungutbatu Pier on Nusa Lembongan.',
    ferry_title: locale === 'nl' ? 'Speedboot-opties' : 'Speedboat options',
    ferry_options_list:
      locale === 'nl'
        ? 'Scoot Fast Cruises:|Populaire aanbieder, meerdere dagelijkse vaarten vanuit Sanur\nRocky Fast Cruises:|Snelle en betrouwbare speedboten\nPerama Tour:|Goedkopere optie, ook vanuit Sanur\n|Boek online of bij een agent in Sanur voor de beste prijzen'
        : 'Scoot Fast Cruises:|Popular operator, multiple daily departures from Sanur\nRocky Fast Cruises:|Fast and reliable speedboats\nPerama Tour:|Budget-friendly option, also from Sanur\n|Book online or at an agent in Sanur for the best prices',
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
