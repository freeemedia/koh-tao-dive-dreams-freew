import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const BuoyancyWorld = () => {
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
        ? 'Buoyancy World is een kunstmatig rif en onderwater-speeltuin bij Koh Tao, vlakbij de populaire duikstek Twins. Het werd in 2009 aangelegd door lokale duikscholen en natuurbeschermers om een leuke trainingsplek te bieden en de druk op natuurlijke riffen te verlichten. Je vindt er betonnen kubussen, piramides, hoepels en zelfs een modelskelet van een haai. Perfect om drijfvermogen, trim en navigatie te oefenen. Je ziet vaak jonge rifvissen, blennies, gobies en koraal dat zich op de structuren vestigt.'
        : 'Buoyancy World is an artificial reef and underwater playground near Koh Tao, close to the popular dive site Twins. Created in 2009 by local dive schools and conservation groups, it provides a fun training area for divers and relieves pressure on natural reefs. The site features sunken concrete cubes, pyramids, hoops, and even a model shark skeleton, all designed for practicing buoyancy, trim, and navigation. You’ll often see juvenile reef fish, blennies, gobies, and coral growing on the structures.',
      quick_facts_depth: '5-12m',
      quick_facts_difficulty: isDutch ? 'Beginner' : 'Beginner',
      quick_facts_location: 'Near Twins, Koh Tao',
      quick_facts_best_time: isDutch ? 'Hele jaar, rustig in kalm weer' : 'Year-round, calm in settled weather',
      what_you_can_see: isDutch
        ? 'Betonnen kubussen en piramides\nHoepels en trainingsobjecten\nKunstmatige haai\nNieuwe koraalgroei\nJonge rifvissen'
        : 'Concrete cubes and pyramids\nHoops and training objects\nArtificial shark\nNew coral growth\nJuvenile reef fish',
      marine_life_highlights: isDutch
        ? 'Juveniele rifvissen\nBlennies en gobies\nKoraal op structuren\nSoms kleine scholen vis'
        : 'Juvenile reef fish\nBlennies and gobies\nCoral on structures\nOccasional small fish schools',
      diving_tips: isDutch
        ? 'Perfect om drijfvermogen en trim te oefenen\nIdeaal voor Open Water en Peak Performance Buoyancy\nBlijf langzaam en precies rond de structuren\nGoed voor camera-oefening in ondiep licht'
        : 'Perfect for practicing buoyancy and trim\nIdeal for Open Water and Peak Performance Buoyancy\nMove slowly and precisely around the structures\nGood for camera practice in shallow light',
      hero_image: '/images/bu1.jpg',
      images: '/images/bu1.jpg\n/images/bu2.jpg\n/images/bu3.jpg',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'buoyancy-world', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Buoyancy World"
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
      <DiveSiteBookingCTA siteName="Buoyancy World" />
    </>
  );
};

export default BuoyancyWorld;