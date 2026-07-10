import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const HinNgam = () => {
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
        ? 'Hin Ngam is een ondiepe, rustige locatie met rifstructuren en kunstmatige elementen die veel klein zeeleven aantrekken. Ideaal voor beginners, fotografen en duikers die op zoek zijn naar een makkelijke, lange duik.'
        : 'Hin Ngam is a shallow, relaxed site with reef structures and artificial features that attract plenty of small marine life. It suits beginners, photographers and divers looking for an easy, long dive.',
      quick_facts_depth: '5-12m',
      quick_facts_difficulty: isDutch ? 'Beginner' : 'Beginner',
      quick_facts_location: isDutch ? 'Westkust' : 'West coast',
      quick_facts_best_time: isDutch ? 'Hele jaar, beste zicht in kalm weer' : 'Year-round, best visibility in calm weather',
      what_you_can_see: isDutch
        ? 'Kunstmatige riffen\nKleine rifvissen\nNaaktslakken\nFotografie-onderwerpen'
        : 'Artificial reefs\nSmall reef fish\nNudibranchs\nPhotography subjects',
      marine_life_highlights: isDutch
        ? 'Jonge rifvissen\nKoraalgroei op structuren\nBlennies en gobies\nOccasionele schorpioenvissen'
        : 'Juvenile reef fish\nCoral growth on structures\nBlennies and gobies\nOccasional scorpionfish',
      diving_tips: isDutch
        ? 'Prima trainingslocatie voor beginners\nZoek rustig in spleten en op zandplekken\nGoed voor macrofotografie\nHoud een langzaam tempo voor meer vondsten'
        : 'A solid training site for beginners\nSearch slowly in cracks and sandy patches\nGood for macro photography\nKeep a slow pace to spot more life',
      images: '/images/tanote.png',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'hin-ngam', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Hin Ngam"
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
      <DiveSiteBookingCTA siteName="Hin Ngam" />
    </>
  );
};

export default HinNgam;