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
    title: locale === 'nl' ? 'Eten & drinken op Koh Tao' : 'Food & drinks on Koh Tao',
    subtitle:
      locale === 'nl'
        ? 'Ontdek heerlijke Thaise gerechten, verse seafood en strandbars bij zonsondergang.'
        : 'Discover delicious Thai dishes, fresh seafood, and sunset beach bars.',
    highlights_title: locale === 'nl' ? 'Culinaire highlights' : 'Culinary highlights',
    highlights_list:
      locale === 'nl'
        ? 'Groot aanbod aan Thaise en internationale restaurants\nVerse seafood bij veel plekken aan het strand\nStreetfood-kraampjes voor snelle en betaalbare maaltijden\nVeel vegetarische en vegan opties\nStrandbars en cafes voor drankjes bij zonsondergang'
        : 'Wide range of Thai and international restaurants\nFresh seafood available at many beachfront spots\nStreet food stalls for quick and affordable meals\nMany vegetarian and vegan options\nBeach bars and cafes for sunset drinks',
    intro:
      locale === 'nl'
        ? 'Probeer lokale favorieten zoals Pad Thai, Som Tam en vers gegrilde vis. Op Koh Tao vind je alles: van eenvoudige strandtentjes tot luxe restaurants.'
        : 'Try local favorites like Pad Thai, Som Tam, and freshly grilled fish. On Koh Tao you will find everything from simple beach shacks to upscale restaurants.',
    cta_more_activities: locale === 'nl' ? 'Meer activiteiten' : 'More activities',
    cta_find_stay: locale === 'nl' ? 'Zoek verblijf' : 'Find accommodation',
    tip:
      locale === 'nl'
        ? 'Tip: kraanwater is niet drinkbaar - koop flessenwater of vul bij waterpunten.'
        : 'Tip: tap water is not drinkable - buy bottled water or refill at water stations.',
    taste_title: locale === 'nl' ? 'Aanraders om te proeven' : 'Must-try dishes',
    tastes_list:
      locale === 'nl'
        ? 'Pad Thai - gebakken rijstnoedels met garnalen of kip\nSom Tam - pittige groene papajasalade\nVerse gegrilde vis met limoen en chili\nMango sticky rice als dessert'
        : 'Pad Thai - stir-fried rice noodles with shrimp or chicken\nSom Tam - spicy green papaya salad\nFresh grilled fish with lime and chili\nMango sticky rice for dessert',
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
