import React, { useMemo } from 'react';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const SharkIsland = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const toList = (value: string) =>
    String(value || '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

  const fallbackContent = useMemo(() => (isDutch
    ? {
        overview:
          "Shark Island ligt aan de zuidkust van Koh Tao en staat bekend om spectaculaire koraalformaties en hoge biodiversiteit. Je vindt hier prachtige paarse zachte boomkoralen en kleurrijke gorgonen, waaronder grote zeewaaiers en dynamische zweepkoralen die meebewegen met de stroming. Zwartpuntrifhaaien worden hier regelmatig gezien terwijl ze langs het rif trekken - daar dankt de site haar naam aan. Het onderwaterlandschap met met koraal bedekte rotsblokken en zandstroken creëert gevarieerde habitats. Door de kleur en het vaak goede zicht is dit een favoriete plek voor onderwaterfotografie.",
        quick_facts_depth: '8-20m',
        quick_facts_difficulty: 'Beginner-gemiddeld',
        quick_facts_location: 'Zuidkust',
        quick_facts_best_time: 'Hele jaar, uitstekend in droogseizoen',
        what_you_can_see: 'Zeewaaiers\nZwepkoralen\nZwartpuntrifhaaien\nTropische vissen',
        marine_life_highlights:
          'Zwartpuntrifhaaien\nDiverse rifvissen\nGorgoon-zeewaaiers\nZachte boomkoralen\nAnthias\nPapegaaivissen en lipvissen\nMurenen\nNaaktslakken en andere ongewervelden',
        diving_tips:
          'Geschikt voor alle brevetniveaus\nUitstekend voor onderwaterfotografie\nZoek haaien in het blauwe water boven het rif\nVerken de koraalformaties met zorg\nGeweldige locatie voor observatie van onderwaterleven\nPerfect voor langere duiken\nGoede plek om fotografietechniek te oefenen\nSpaar energie voor de terugzwem',
        images: '/images/sharkisand.jpg\n/images/blacktip-reef-shark.jpg',
      }
    : {
        overview:
          "Shark Island is located on Koh Tao's south coast and is renowned for its spectacular coral formations and marine biodiversity. The site features beautiful soft purple tree corals, vibrant gorgonians including sea fans and dynamic sea whips that sway gracefully in the current. Black-tip reef sharks are commonly sighted cruising the reef, giving the site its name. The underwater landscape includes coral-encrusted boulders and sandy patches, creating diverse habitats for marine life. This site is particularly popular with underwater photographers due to its colorful subjects and excellent visibility.",
        quick_facts_depth: '8-20m',
        quick_facts_difficulty: 'Beginner-Intermediate',
        quick_facts_location: 'South coast',
        quick_facts_best_time: 'Year-round, excellent during dry season',
        what_you_can_see: 'Sea Fans\nDynamic Sea Whips\nBlack Tip Reef Sharks\nTropical Fish',
        marine_life_highlights:
          'Black-tip Reef Sharks\nDiverse reef fish\nGorgonian sea fans\nSoft tree corals\nAnthias and anthias\nParrotfish and wrasse\nMoray eels\nNudibranchs and invertebrates',
        diving_tips:
          'Suitable for all certification levels\nExcellent for underwater photography\nLook for sharks in the blue water above the reef\nExplore the coral formations carefully\nGreat for marine life observation\nPerfect for extended dives\nGood site for practicing photography techniques\nConserve energy for the return swim',
        images: '/images/sharkisand.jpg\n/images/blacktip-reef-shark.jpg',
      }), [isDutch]);

  const { content } = usePageContent({ pageSlug: 'shark-island', locale, fallbackContent });

  return (
    <DiveSiteDetail
      name="Shark Island"
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
  );
};

export default SharkIsland;