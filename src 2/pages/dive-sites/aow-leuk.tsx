import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const AowLeuk = () => {
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
        ? 'Aow Leuk is een beschutte baai met helder water, zachte hellingen en gezonde koraaltuinen. Het is een van de beste locaties op Koh Tao voor beginners, snorkelaars en ontspannen trainingsduiken.'
        : 'Aow Leuk is a sheltered bay with clear water, gentle slopes and healthy coral gardens. It is one of Koh Tao\'s best sites for beginners, snorkelers and relaxed training dives.',
      quick_facts_depth: '3-10m',
      quick_facts_difficulty: isDutch ? 'Beginner' : 'Beginner',
      quick_facts_location: isDutch ? 'Westkust' : 'West coast',
      quick_facts_best_time: isDutch ? 'Hele jaar, rustig bij kalme zee' : 'Year-round, calm in settled conditions',
      what_you_can_see: isDutch
        ? 'Koraaltuinen\nTropische rifvissen\nAnemonen en clownfish\nBlauwe stiproggen'
        : 'Coral gardens\nTropical reef fish\nAnemones and clownfish\nBlue-spotted rays',
      marine_life_highlights: isDutch
        ? 'Gezonde harde koralen\nPapegaaivissen en lipvissen\nJonge rifvissen\nOccasionele schildpadden'
        : 'Healthy hard corals\nParrotfish and wrasse\nJuvenile reef fish\nOccasional turtles',
      diving_tips: isDutch
        ? 'Perfect voor eerste duiken en opfriscursussen\nBlijf ondiep voor het beste licht\nGoed voor fotografie en lange duiktijden\nLet op bootverkeer bij de baai'
        : 'Perfect for first dives and refreshers\nStay shallow for the best light\nGreat for photography and long dive times\nWatch for boat traffic in the bay',
      images: '/images/aowluk.jpg',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'aow-leuk', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Aow Leuk"
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
      <DiveSiteBookingCTA siteName="Aow Leuk" />
    </>
  );
};

export default AowLeuk;