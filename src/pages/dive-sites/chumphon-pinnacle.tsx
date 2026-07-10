import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const ChumphonPinnacle = () => {
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
        ? 'Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten pinnacle rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om betrouwbare walvishaaiwaarnemingen, waarbij deze zachte reuzen regelmatig door de diepte cruisen. Grote scholen trevally en chevron-barracuda zorgen voor indrukwekkende scenes, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek geven. De structuur van de pinnacle biedt ook mooie doorgangen en sterke fotomogelijkheden.'
        : 'Chumphon Pinnacle is one of Koh Tao\'s most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle\'s structure provides excellent swim-through opportunities and photographic subjects.',
      quick_facts_depth: '15-30m',
      quick_facts_difficulty: isDutch ? 'Gevorderd' : 'Advanced',
      quick_facts_location: isDutch ? '30 minuten uit de kust' : '30 minutes offshore',
      quick_facts_best_time: isDutch ? 'Hele jaar, piekseizoen december-april' : 'Year-round, peak season December-April',
      what_you_can_see: isDutch
        ? 'Walvishaaien\nScholen trevally\nAdelaarsroggen\nChevron-barracuda'
        : 'Whalesharks\nTrevally Schools\nEagle Rays\nChevron Barracuda',
      marine_life_highlights: isDutch
        ? 'Walvishaaien (regelmatige waarnemingen)\nGrote scholen giant trevally\nChevron-barracuda\nAdelaarsroggen\nScholen horsmakreel en fusilier\nReuzenbarracuda\nKingfish\nDiverse rifvissen'
        : 'Whalesharks (regular sightings)\nGiant Trevally schools\nChevron Barracuda\nEagle Rays\nScad and Fusilier schools\nGiant Barracuda\nKingfish\nVarious reef fish species',
      diving_tips: isDutch
        ? 'Gevorderde certificering aanbevolen door diepte en stroming\nVroege ochtendtrips vergroten kans op wildlife-waarnemingen\nGroothoeklens aanbevolen voor grote onderwerpen\nBlijf bij je gids bij matige stroming\nPerfect voor specialisaties in diepduiken\nWalvishaaien zijn vaak actiever bij opkomend tij\nNeem een goede onderwatercamera mee'
        : 'Advanced certification recommended due to depth and current\nEarly morning departures maximize wildlife sightings\nWide-angle photography lens recommended for large subjects\nStay with your dive guide in moderate currents\nPerfect for deep diving specialty courses\nWhalesharks are most active during incoming tides\nBring a good quality underwater camera',
      images:
        '/images/chumphon-pinnacle-top.webp\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1659518893171-b15e20a8e201.avif\n/images/photo-1682687982423-295485af248a.avif',
    }),
    [isDutch]
  );

  const { content } = usePageContent({
    pageSlug: 'chumphon-pinnacle',
    locale,
    fallbackContent,
  });

  return (
    <>
      <DiveSiteDetail
        name="Chumphon Pinnacle"
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
      <DiveSiteBookingCTA siteName="Chumphon Pinnacle" />
    </>
  );
};

export default ChumphonPinnacle;
