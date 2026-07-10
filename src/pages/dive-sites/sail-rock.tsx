import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const SailRock = () => {
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
          "Dé top-diepduiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda's. Sail Rock wordt algemeen beschouwd als de beste duiksite in de Golf van Thailand. Deze imposante granieten rotspiek ligt op ongeveer 40 minuten varen van Koh Tao en stijgt op vanuit diepblauw water tot circa 18 meter onder het oppervlak. De site is beroemd om de 'Chimney': een verticale doorgang die een natuurlijke stroming creëert en grote pelagische vissen aantrekt. Walvishaaien worden hier regelmatig gezien, samen met enorme scholen snappers, fusiliers en chevron-barracuda's. Ook adelaarsroggen en zeilvissen verschijnen hier vaak, wat het een spectaculaire diepduikervaring maakt.",
        quick_facts_depth: '18-40m',
        quick_facts_difficulty: 'Gevorderd',
        quick_facts_location: '40 minuten uit de kust',
        quick_facts_best_time: 'Hele jaar, beste periode in droogseizoen (december-mei)',
        what_you_can_see: 'Walvishaaien\nReuzenbarracuda\nMalabar tandbaars\nZeilvis',
        marine_life_highlights:
          'Walvishaaien (regelmatige waarnemingen)\nScholen reuzenbarracuda\nMalabar tandbaars\nZeilvis en adelaarsrog\nChevron-barracuda\nGrote scholen snapper en fusilier\nKoningsmakreel\nGemarmerde tandbaars',
        diving_tips:
          'Gevorderde certificering vereist - dit is een diepduiksite\nStromingsbewustzijn is essentieel - blijf bij je gids\nGebruik een duikcomputer voor nauwkeurige diepte- en tijdsbewaking\nWalvishaaien zijn vaak actiever in de ochtend - vroeg vertrek aanbevolen\nNeem een groothoeklens mee voor grote pelagische soorten\nSpaar lucht in verband met diepte en mogelijke stroming\nPerfect voor specialisaties in diepduiken',
        images:
          '/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif',
      }
    : {
        overview:
          "Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda. Sail Rock is widely regarded as the Gulf of Thailand's premier scuba diving site. Located 40 minutes offshore, this impressive granite pinnacle rises from the deep blue ocean to within 18 meters of the surface. The site is famous for its 'Chimney' - a distinctive vertical swim-through that creates a natural vortex attracting large pelagic fish. Whalesharks are frequently sighted cruising the depths, and the site hosts massive schools of snapper, fusiliers, and chevron barracuda. Eagle rays and sailfish are also common visitors, making this a truly spectacular deep diving experience.",
        quick_facts_depth: '18-40m',
        quick_facts_difficulty: 'Advanced',
        quick_facts_location: '40 minutes offshore',
        quick_facts_best_time: 'Year-round, best in dry season (December-May)',
        what_you_can_see: 'Whalesharks\nGiant Barracuda\nMalabar Grouper\nSailfish',
        marine_life_highlights:
          'Whalesharks (frequent sightings)\nGiant Barracuda schools\nMalabar Grouper\nSailfish and Eagle Rays\nChevron Barracuda\nLarge Snapper and Fusilier schools\nKing Mackerel\nBrown Marbled Grouper',
        diving_tips:
          'Advanced certification required - this is a deep dive site\nStrong current awareness essential - stay with your guide\nUse a dive computer for accurate depth and time monitoring\nWhalesharks are most active in the morning - early boat departure recommended\nBring a wide-angle lens for photographing large pelagics\nConserve air due to depth and potential current\nPerfect for deep specialty course dives',
        images:
          '/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif',
      }), [isDutch]);

  const { content } = usePageContent({ pageSlug: 'sail-rock', locale, fallbackContent });

  return (
    <>
      <DiveSiteDetail
        name="Sail Rock"
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
      <DiveSiteBookingCTA siteName="Sail Rock" />
    </>
  );
};

export default SailRock;
