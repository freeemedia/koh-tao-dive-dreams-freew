import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const ThingsToDo = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';
  const fallbackContent = {
    title: locale === 'nl' ? 'Wat te doen op Nusa Lembongan' : 'Things to do on Nusa Lembongan',
    subtitle:
      locale === 'nl'
        ? 'Ontdek avontuur, ontspanning en Balinese eilandcultuur - er is meer dan alleen duiken!'
        : 'Discover adventure, relaxation, and Balinese island culture - there is more than just diving!',
    activities_title: locale === 'nl' ? 'Populaire activiteiten' : 'Popular activities',
    activities_list:
      locale === 'nl'
        ? 'Maak een mangrovekanotocht langs het eiland\nBezoek het traditionele Balinese dorp Lembongan\nHuur een kajak of paddleboard op Mushroom Beach\nVerken de Blue Lagoon op Nusa Ceningan\nOntspan met een massage op het strand\nSpring van de kliffen bij Devil\'s Tear\nGeniet van de zonsondergang bij een beachbar\nDagtocht naar Nusa Penida voor spectaculaire kliffen'
        : 'Take a mangrove kayak tour around the island\nVisit the traditional Balinese village of Lembongan\nRent a kayak or paddleboard at Mushroom Beach\nExplore the Blue Lagoon on Nusa Ceningan\nRelax with a beach massage\nJump off the cliffs at Devil\'s Tear\nEnjoy sunset views from a beachfront bar\nDay trip to Nusa Penida for spectacular cliffs and snorkeling',
    cta_fun_diving: locale === 'nl' ? 'Ga fun diven' : 'Go fun diving',
    cta_beaches: locale === 'nl' ? 'Ontdek stranden' : 'Discover beaches',
    cta_viewpoints: locale === 'nl' ? 'Uitzichtpunten' : 'Viewpoints',
    note:
      locale === 'nl'
        ? 'Nusa Lembongan is meer dan alleen duiken - er is genoeg te ontdekken op land en zee.'
        : 'Nusa Lembongan is more than just diving - there is plenty to explore on land and at sea.',
    ideas_title: locale === 'nl' ? 'Meer ideeen nodig?' : 'Need more ideas?',
    ideas_list:
      locale === 'nl'
        ? 'Maak een dagtrip naar Nusa Penida voor Angel\'s Billabong en Kelingking Beach\nVerhuur een scooter en rijdt rondom het eiland\nProef nasi goreng en babi guling bij een lokale warung'
        : 'Take a day trip to Nusa Penida for Angel\'s Billabong and Kelingking Beach\nRent a scooter and drive around the whole island\nTaste nasi goreng and babi guling at a local warung',
    more_inspiration:
      locale === 'nl' ? 'Voor meer inspiratie, bekijk onze' : 'For more inspiration, check out our',
    activity_guide: locale === 'nl' ? 'gids met activiteiten' : 'activity guide',
  };

  const { content } = usePageContent({
    pageSlug: 'things-to-do',
    locale,
    fallbackContent,
  });

  const activities = parseLines(content.activities_list || fallbackContent.activities_list);
  const ideas = parseLines(content.ideas_list || fallbackContent.ideas_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/things-to-do.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.activities_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {activities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/fun-diving-nusa-lembongan" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_fun_diving}</a>
        <a href="/BeachesKohTao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_beaches}</a>
        <a href="/ViewpointsKohTao" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{content.cta_viewpoints}</a>
      </div>
      <p className="text-sm text-gray-500">{content.note}</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{content.ideas_title}</h3>
      <ul className="list-disc pl-6 mb-2">
        {ideas.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-2">{content.more_inspiration} <a href="#contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> {content.activity_guide}</a>.</p>
    </section>
  </main>
  );
};

export default ThingsToDo;
