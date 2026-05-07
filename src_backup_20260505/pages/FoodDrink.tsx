import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const FoodDrink = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Eten & drinken op Nusa Lembongan' : 'Food & drinks on Nusa Lembongan',
    subtitle:
      locale === 'nl'
        ? 'Ontdek heerlijke Balinese gerechten, verse seafood en beachbars bij zonsondergang.'
        : 'Discover delicious Balinese dishes, fresh seafood, and sunset beach bars.',
    highlights_title: locale === 'nl' ? 'Culinaire highlights' : 'Culinary highlights',
    highlights_list:
      locale === 'nl'
        ? 'Groot aanbod aan Balinese en internationale restaurants\nVerse seafood rechtstreeks van lokale vissers\nGezellige warungs met lokale Indonesische gerechten\nVeel vegetarische en vegan opties\nBeachbars en cafes voor drankjes bij zonsondergang'
        : 'Wide range of Balinese and international restaurants\nFresh seafood direct from local fishermen\nCosy warungs serving local Indonesian dishes\nMany vegetarian and vegan options\nBeach bars and cafes for sunset drinks',
    intro:
      locale === 'nl'
        ? 'Probeer lokale favorieten zoals Nasi goreng, Mie goreng en vers gegrilde vis. Op Lembongan vind je alles: van eenvoudige warungs tot beachfront restaurants.'
        : 'Try local favorites like Nasi goreng, Mie goreng, and freshly grilled fish. On Lembongan you will find everything from simple warungs to beachfront restaurants.',
    cta_more_activities: locale === 'nl' ? 'Meer activiteiten' : 'More activities',
    cta_find_stay: locale === 'nl' ? 'Zoek verblijf' : 'Find accommodation',
    tip:
      locale === 'nl'
        ? 'Tip: kraanwater is niet drinkbaar op Bali - koop flessenwater of gebruik een filter.'
        : 'Tip: tap water is not safe to drink in Bali - buy bottled water or use a filter.',
    taste_title: locale === 'nl' ? 'Aanraders om te proeven' : 'Must-try dishes',
    tastes_list:
      locale === 'nl'
        ? 'Nasi goreng - gebakken rijst met ei en groenten\nMie goreng - gebakken noedels met groenten of vlees\nBabi guling - Balinees geroosterd varken\nVerse gegrilde vis met sambal en rijst\nEs campur - Indonesisch dessert met fruit en ijs'
        : 'Nasi goreng - fried rice with egg and vegetables\nMie goreng - fried noodles with vegetables or meat\nBabi guling - Balinese spit-roasted pork\nFresh grilled fish with sambal and rice\nEs campur - Indonesian dessert with fruit and ice',
  };

  const { content } = usePageContent({
    pageSlug: 'food-drink',
    locale,
    fallbackContent,
  });

  const highlights = parseLines(content.highlights_list || fallbackContent.highlights_list);
  const tastes = parseLines(content.tastes_list || fallbackContent.tastes_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/food-drink-hero.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.highlights_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{content.intro}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_more_activities}</a>
        <a href="/Accommodation" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{content.cta_find_stay}</a>
      </div>
      <p className="text-sm text-gray-500">{content.tip}</p>
    </section>

    {/* Inspiration Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{content.taste_title}</h3>
      <ul className="list-disc pl-6 mb-2">
        {tastes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default FoodDrink;
