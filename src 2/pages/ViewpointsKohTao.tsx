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

const ViewpointsKohTao = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Uitzichtpunten op Koh Tao' : 'Viewpoints on Koh Tao',
    subtitle:
      locale === 'nl'
        ? 'Adembenemende panorama\'s en onvergetelijke fotomomenten.'
        : 'Breathtaking panoramas and unforgettable photo moments.',
    section_title: locale === 'nl' ? 'Uitzichtpunten op het eiland' : 'Island viewpoints',
    points_list:
      locale === 'nl'
        ? 'John-Suwan Viewpoint:|Panoramisch uitzicht over Chalok Baan Kao en Shark Bay.\nFraggle Rock:|Uitzicht over Sairee Beach en de westkust.\nLove Koh Tao Viewpoint:|Perfect voor zonsopkomst en foto\'s.\nMango Viewpoint:|Weids uitzicht over het noorden van het eiland.'
        : 'John-Suwan Viewpoint:|Panoramic views over Chalok Baan Kao and Shark Bay.\nFraggle Rock:|Views over Sairee Beach and the west coast.\nLove Koh Tao Viewpoint:|Perfect for sunrise and photos.\nMango Viewpoint:|Wide views over the north of the island.',
    note:
      locale === 'nl'
        ? 'Voor de meeste uitzichtpunten is een korte wandeling nodig. Neem water, zonbescherming en een camera mee!'
        : 'Most viewpoints require a short hike. Bring water, sun protection, and a camera!',
    cta_hiking_activities: locale === 'nl' ? 'Wandelen & activiteiten' : 'Hiking & activities',
    cta_discover_beaches: locale === 'nl' ? 'Ontdek stranden' : 'Discover beaches',
    hiking_tips_title: locale === 'nl' ? 'Wandeltips' : 'Hiking tips',
    hiking_tips_list:
      locale === 'nl'
        ? 'Begin vroeg voor zonsopkomst en koelere temperaturen\nDraag stevige schoenen en neem voldoende water mee\nPaden kunnen steil en glad zijn na regen\nBeste licht voor fotografie: vroeg in de ochtend en bij zonsondergang'
        : 'Start early for sunrise and cooler temperatures\nWear sturdy shoes and bring enough water\nTrails can be steep and slippery after rain\nBest light for photography: early morning and sunset',
  };

  const { content } = usePageContent({
    pageSlug: 'viewpoints-koh-tao',
    locale,
    fallbackContent,
  });

  const points = parseLabeledItems(content.points_list || fallbackContent.points_list);
  const hikingTips = parseLines(content.hiking_tips_list || fallbackContent.hiking_tips_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/viewpoints-hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.section_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {points.map((point) => (
          <li key={point.label + point.text}><strong>{point.label}</strong> {point.text}</li>
        ))}
      </ul>
      <p className="mb-4">{content.note}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{content.cta_hiking_activities}</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_discover_beaches}</a>
      </div>
    </section>

    {/* Hiking Tips Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{content.hiking_tips_title}</h3>
      <ul className="list-disc pl-6 mb-2">
        {hikingTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default ViewpointsKohTao;
