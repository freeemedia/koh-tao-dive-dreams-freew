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
    title: locale === 'nl' ? 'Over Nusa Lembongan' : 'About Nusa Lembongan',
    description:
      locale === 'nl'
        ? 'Nusa Lembongan is een klein tropisch eiland voor de zuidoostkust van Bali, onderdeel van de drie Nusa eilanden samen met Nusa Penida en Nusa Ceningan. Het is wereldberoemd om zijn spectaculaire duiklocaties, kristalhelder water en ontspannen eilandsfeer.'
        : 'Nusa Lembongan is a small tropical island off the southeast coast of Bali, part of the three Nusa islands together with Nusa Penida and Nusa Ceningan. It is world-famous for spectacular dive sites, crystal-clear waters, and a relaxed island vibe.',
    facts_list:
      locale === 'nl'
        ? 'Locatie: 11 km ten zuidoosten van Bali, Indonesie\nBeroemd om: duiken met Mola Mola & manta rays, snorkelen en rustig eilandleven\nBeste reistijd: april t/m november\nPopulaire gebieden: Jungutbatu, Mushroom Bay, Lembongan Village'
        : 'Location: 11 km southeast of Bali, Indonesia\nFamous for: diving with Mola Mola & manta rays, snorkeling, and relaxed island life\nBest travel season: April to November\nPopular areas: Jungutbatu, Mushroom Bay, Lembongan Village',
    highlights_title: locale === 'nl' ? 'Hoogtepunten van het eiland' : 'Island highlights',
    highlights_list:
      locale === 'nl'
        ? 'Wereld klasse duiklocaties (Crystal Bay, Manta Point, Toyapakeh)\nSpectaculaire Mola Mola seizoen (jul-okt)\nOntspannen strandbars en restaurants\nVerse seafood en Balinese keuken\nEenvoudig bereikbaar met speedboot vanuit Sanur (30 min)'
        : 'World-class dive sites (Crystal Bay, Manta Point, Toyapakeh)\nSpectacular Mola Mola season (Jul-Oct)\nRelaxed beach bars and restaurants\nFresh seafood and Balinese cuisine\nEasy access by speedboat from Sanur (30 min)',
  };

  const { content } = usePageContent({
    pageSlug: 'nusa-lembongan-info',
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
