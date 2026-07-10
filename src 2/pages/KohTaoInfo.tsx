import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const KohTaoInfo = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Over Koh Tao' : 'About Koh Tao',
    description:
      locale === 'nl'
        ? 'Koh Tao, wat "Schildpadeiland" betekent, is een klein paradijs in de Golf van Thailand dat bekendstaat om kristalhelder water, kleurrijke koraalriffen en een ontspannen eilandsfeer. Het is een van de beste duikbestemmingen ter wereld en biedt activiteiten voor ieder type reiziger.'
        : 'Koh Tao, which means "Turtle Island", is a small paradise in the Gulf of Thailand known for crystal-clear water, colorful coral reefs, and a laid-back island vibe. It is one of the best diving destinations in the world and offers activities for every type of traveler.',
    facts_list:
      locale === 'nl'
        ? 'Locatie: 70 km uit de oostkust van Zuid-Thailand\nBeroemd om: duiken, snorkelen, mooie stranden en zeeleven\nBeste reistijd: februari t/m oktober\nPopulaire gebieden: Sairee Beach, Chalok Baan Kao, Mae Haad'
        : 'Location: 70 km off the east coast of Southern Thailand\nFamous for: diving, snorkeling, beautiful beaches, and marine life\nBest travel season: February to October\nPopular areas: Sairee Beach, Chalok Baan Kao, Mae Haad',
    highlights_title: locale === 'nl' ? 'Hoogtepunten van het eiland' : 'Island highlights',
    highlights_list:
      locale === 'nl'
        ? 'Duiklocaties en duikscholen van wereldklasse\nPrachtige uitzichtpunten en wandelroutes\nOntspannen uitgaansleven en strandbars\nVerse seafood en Thaise keuken\nVriendelijke lokale gemeenschap'
        : 'World-class dive sites and dive schools\nBeautiful viewpoints and hiking routes\nRelaxed nightlife and beach bars\nFresh seafood and Thai cuisine\nFriendly local community',
  };

  const { content } = usePageContent({
    pageSlug: 'koh-tao-info',
    locale,
    fallbackContent,
  });

  const facts = parseLines(content.facts_list || fallbackContent.facts_list);
  const highlights = parseLines(content.highlights_list || fallbackContent.highlights_list);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
      <p className="mb-4">{content.description}</p>
      <ul className="list-disc pl-6 mb-4">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">{content.highlights_title}</h2>
      <ul className="list-disc pl-6">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </main>
  );
};

export default KohTaoInfo;
