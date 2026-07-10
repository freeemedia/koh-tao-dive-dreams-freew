import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const WeatherKohTao = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Weer op Koh Tao' : 'Weather on Koh Tao',
    subtitle:
      locale === 'nl'
        ? 'Plan je reis met inzicht in het tropische klimaat van Koh Tao.'
        : 'Plan your trip with insight into Koh Tao\'s tropical climate.',
    climate_title: locale === 'nl' ? 'Klimaat & seizoenen' : 'Climate & seasons',
    climate_list:
      locale === 'nl'
        ? 'Droog seizoen: februari t/m oktober, warm en zonnig\nRegenseizoen: november t/m januari, korte maar hevige buien\nGemiddelde temperatuur: 28-32C\nZeetemperatuur: 27-30C'
        : 'Dry season: February to October, warm and sunny\nRainy season: November to January, short but heavy showers\nAverage temperature: 28-32C\nSea temperature: 27-30C',
    paragraph:
      locale === 'nl'
        ? 'De meeste activiteiten zijn het hele jaar mogelijk, maar controleer de voorspelling voordat je een boottrip plant. Het droge seizoen biedt meestal de beste duikomstandigheden met kalme zee en goed zicht.'
        : 'Most activities are possible year-round, but check the forecast before planning a boat trip. The dry season usually offers the best diving conditions with calm seas and good visibility.',
    cta_plan_activities: locale === 'nl' ? 'Plan activiteiten' : 'Plan activities',
    cta_go_diving: locale === 'nl' ? 'Ga duiken' : 'Go diving',
    packing_title: locale === 'nl' ? 'Wat neem je mee' : 'What to pack',
    packing_list:
      locale === 'nl'
        ? 'Zonnebrand met hoge SPF (reef-safe)\nLichte, ademende kleding\nRegenjas of poncho (voor het regenseizoen)\nWaterdichte tas voor elektronica\nPet/hoed en zonnebril\nSneldrogende kleding voor wateractiviteiten'
        : 'High-SPF reef-safe sunscreen\nLightweight, breathable clothing\nRain jacket or poncho (for rainy season)\nWaterproof bag for electronics\nCap/hat and sunglasses\nQuick-dry clothing for water activities',
  };

  const { content } = usePageContent({
    pageSlug: 'weather-koh-tao',
    locale,
    fallbackContent,
  });

  const climateItems = parseLines(content.climate_list || fallbackContent.climate_list);
  const packingItems = parseLines(content.packing_list || fallbackContent.packing_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/weather.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.climate_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {climateItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mb-4">{content.paragraph}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/ThingsToDo" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_plan_activities}</a>
        <a href="/fun-diving-koh-tao" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_go_diving}</a>
      </div>
    </section>

    {/* Packing Tips Section */}
    <section className="bg-muted rounded-lg shadow p-6 md:p-10">
      <h3 className="text-xl font-semibold mb-2">{content.packing_title}</h3>
      <ul className="list-disc pl-6 mb-2">
        {packingItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default WeatherKohTao;
