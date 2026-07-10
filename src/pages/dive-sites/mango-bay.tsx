import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const MangoBay = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const toList = (value: string) =>
    String(value || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const fallbackContent = useMemo(
    () => ({
      overview: isDutch
        ? 'Ondiepe koraalriffen perfect voor ontspannen duiken met een bloeiend marien ecosysteem.'
        : 'Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems.',
      quick_facts_depth: '5-18m',
      quick_facts_difficulty: 'Beginner',
      quick_facts_location: isDutch ? 'Baai aan westkust' : 'West coast bay',
      quick_facts_best_time: isDutch ? 'Hele jaar, beste bij kalm weer' : 'Year-round, best during calm weather',
      what_you_can_see: isDutch
        ? 'Kleurrijke rifvissen\nAnemoonvissen\nPapegaaivissen en lipvissen\nVlindervissen\nKeizersvissen\nKleine rifhaaien'
        : 'Colorful reef fish\nClownfish and anemones\nParrotfish and wrasse\nButterflyfish\nAngelfish species\nSmall reef sharks',
      marine_life_highlights: isDutch
        ? 'Gezond rifecosysteem\nKleurrijke harde en zachte koralen\nZeeanemonen\nRijk onderwaterleven'
        : 'Healthy reef ecosystem\nColorful hard and soft corals\nSea anemones\nAbundant marine life',
      diving_tips: isDutch
        ? 'Perfect voor beginners en trainingsduiken\nOok uitstekend om te snorkelen\nZoek grazers in zeegras en rifleven\nToplocatie voor onderwaterfotografie\nKalm water ideaal voor trim- en drijfvermogen\nMeerdere koraalbommies om te verkennen\nGeschikt voor langere duiken\nPerfect voor Open Water trainingsduiken'
        : 'Perfect for beginners and training dives\nAlso excellent for snorkeling\nLook for grazers in seagrass and reef life\nGreat spot for underwater photography\nCalm water ideal for learning buoyancy\nMultiple coral bommies to explore\nSuitable for longer dives\nPerfect for Open Water certification dives',
      images: '/images/mango-bay.webp',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'mango-bay', locale, fallbackContent });

  return (
    <>
      <DiveSiteDetail
        name="Mango Bay"
        overview={content.overview}
        quickFacts={{
          depth: content.quick_facts_depth,
          difficulty: content.quick_facts_difficulty,
          location: content.quick_facts_location,
          bestTime: content.quick_facts_best_time,
        }}
        whatYouCanSee={toList(content.what_you_can_see)}
        marineLifeHighlights={toList(content.marine_life_highlights)}
        divingTips={toList(content.diving_tips)}
        images={toList(content.images)}
      />
      <DiveSiteBookingCTA siteName="Mango Bay" />
    </>
  );
};

export default MangoBay;

