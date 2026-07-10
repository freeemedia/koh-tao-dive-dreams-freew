import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const TwinsPinnacle = () => {
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
        ? 'Twins Pinnacle is de populairste duiksite van Koh Tao, met drie granieten pinnacles, rijk onderwaterleven en geschikt voor alle brevetniveaus.'
        : 'Twins Pinnacle is the most popular dive site on Koh Tao, featuring three granite pinnacles, abundant marine life, and suitable for all certification levels.',
      quick_facts_depth: '6-18m',
      quick_facts_difficulty: isDutch ? 'Beginner tot Gemiddeld' : 'Beginner to Intermediate',
      quick_facts_location: isDutch ? 'Westkust van Koh Nang Yuan' : 'West coast of Koh Nang Yuan',
      quick_facts_best_time: isDutch ? 'Hele jaar, beste november-mei' : 'Year-round, best November-May',
      what_you_can_see: isDutch
        ? 'Zadel-anemoonvis\nNaaktslakken\nPijpvissen\nGele koffervis\nLongface emperor\nVlindervissen\nKeizersvissen\nRifvissen\nMurenen\nTrevally\nBlauwgestippelde pijlstaartrog\nSnappers\nTandbaarzen\nPapegaaivissen\nBannerfish\nZeeschildpadden\nScribbled filefish\nAnemoonvissen\nKoffervissen en wratslakken'
        : 'Saddleback clownfish and Sebae anemones\nNudibranchs\nPipefish\nYellow boxfish\nLongface emperor\nWhite’s butterflyfish\nAngelfish\nReef fish\nMoray eels\nTrevally\nBluespotted ribbon tail ray\nSnapper\nGroupers\nParrotfish\nBannerfish\nSea turtles\nScribbled filefish\nAnemonefish\nBoxfish and wart slugs',
      marine_life_highlights: isDutch
        ? 'Drie granieten pinnacles\nBogen en rotsformaties\nRijk onderwaterleven\nPerfect voor training\nRustige omstandigheden\nAnemonen met clownfish'
        : 'Three granite pinnacles\nArch and rock formations\nRich marine life\nPerfect for training\nCalm conditions\nAnemones with clownfish',
      diving_tips: isDutch
        ? 'Perfect voor Open Water en trainingsduiken\nVerken eerst de diepere westelijke pinnacle\nNavigeer naar de middelste pinnacle en bekijk de boog aan de noordkant\nKijk onder overhangen bij de ondiepe pinnacle\nMis de beroemde clownfish met Sebae-anemoon niet\nLet op: er is een steencirkel rond de clownfish - niet binnengaan\nGeweldig voor macrofotografie\nOefen drijfvermogen bij de bogen en rotsformaties\nBuoyancy World in de buurt is gewijd aan drijfvermogen\nUitstekend voor mariene bewustwording\nEenvoudige navigatie dankzij drie pieken'
        : 'Perfect for Open Water divers and training dives\nExplore the deeper west pinnacle first\nNavigate to the middle pinnacle and check the arch on the north side\nLook under overhangs at the shallow pinnacle\nDon’t miss the famous clownfish with Sebae anemone\nNote: there is a stone circle around the clownfish - do not enter\nGreat for macro photography\nPractice buoyancy on the arch and rock formations\nNearby Buoyancy World is dedicated to buoyancy skills\nExcellent for marine awareness\nEasy navigation thanks to the three peaks',
      images: '/images/twins-header.png',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'twins-pinnacle', locale, fallbackContent });

  return (
    <>
      <DiveSiteDetail
        name="Twins Pinnacle"
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
      <DiveSiteBookingCTA siteName="Twins Pinnacle" />
    </>
  );
};

export default TwinsPinnacle;
