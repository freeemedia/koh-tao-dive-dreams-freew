import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const JunkyardReef = () => {
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
        ? 'Junkyard Reef is een creatief kunstmatig rif met stalen structuren die snel zeeleven aantrekken. De site combineert natuurbescherming, fotogenieke objecten en makkelijke duikcondities voor een speelse, maar interessante duik.'
        : 'Junkyard Reef is a creative artificial reef made of steel structures that quickly attract marine life. It combines conservation, photogenic objects and easy conditions for a playful but genuinely interesting dive.',
      quick_facts_depth: '8-15m',
      quick_facts_difficulty: isDutch ? 'Beginner-gemiddeld' : 'Beginner-Intermediate',
      quick_facts_location: isDutch ? 'Westkust' : 'West coast',
      quick_facts_best_time: isDutch ? 'Hele jaar, beste zicht in rustige periodes' : 'Year-round, best visibility in calm periods',
      what_you_can_see: isDutch
        ? 'Kunstmatige structuren\nGezond koraal\nRifvissen\nFotografie-onderwerpen'
        : 'Artificial structures\nHealthy coral growth\nReef fish\nPhotography subjects',
      marine_life_highlights: isDutch
        ? 'Koraalgroei op staal\nJonge rifvissen\nNaaktslakken\nOccasionele roggen'
        : 'Coral growth on steel\nJuvenile reef fish\nNudibranchs\nOccasional rays',
      diving_tips: isDutch
        ? 'Neem de tijd rond elke structuur\nGeweldig voor brede en close-up fotografie\nPrima locatie voor ontspannen middagduiken\nGoed drijfvermogen houdt de site in topconditie'
        : 'Take your time around each structure\nGreat for both wide-angle and close-up photography\nA solid choice for relaxed afternoon dives\nGood buoyancy helps keep the site in top condition',
      images: '/images/htms-sattakut.jpg\n/images/htms-sattakut-wreck.jpg',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'junkyard-reef', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Junkyard Reef"
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
      <DiveSiteBookingCTA siteName="Junkyard Reef" />
    </>
  );
};

export default JunkyardReef;