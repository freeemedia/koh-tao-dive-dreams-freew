import React, { useMemo } from 'react';
import DiveSiteBookingCTA from '@/components/DiveSiteBookingCTA';
import DiveSiteDetail from '@/components/DiveSiteDetail';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const TanoteBay = () => {
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
        ? 'Tanote Bay is een duiklocatie aan de oostkust met granietblokken, kleurrijk rifleven en goede kansen op macrosoorten. De combinatie van rif, rotsen en zand maakt de site interessant voor fotografen en ervaren recreatieve duikers.'
        : 'Tanote Bay is an east-coast dive site with granite boulders, colorful reef life and good macro opportunities. Its mix of reef, rock and sand makes it appealing for photographers and experienced recreational divers.',
      quick_facts_depth: '8-15m',
      quick_facts_difficulty: isDutch ? 'Gemiddeld' : 'Intermediate',
      quick_facts_location: isDutch ? 'Oostkust' : 'East coast',
      quick_facts_best_time: isDutch ? 'Beste in rustige oostkust-condities' : 'Best in calm east-coast conditions',
      what_you_can_see: isDutch
        ? 'Hengelaarsvis\nPijpvis\nMacroleven\nKleurrijke rifvissen'
        : 'Frogfish\nPipefish\nMacro life\nColorful reef fish',
      marine_life_highlights: isDutch
        ? 'Granietformaties\nJonge rifvissen\nMurenen\nRifinvertebraten'
        : 'Granite formations\nJuvenile reef fish\nMoray eels\nReef invertebrates',
      diving_tips: isDutch
        ? 'Check de omstandigheden vooraf, oostkust kan gevoelig zijn\nKijk goed tussen rotsen voor macroleven\nGoed drijfvermogen helpt rond de granietblokken\nPrima voor fotografen en avontuurlijke recreatieve duikers'
        : 'Check conditions first since the east coast can be weather-sensitive\nSearch carefully between rocks for macro life\nGood buoyancy helps around the granite boulders\nGreat for photographers and adventurous recreational divers',
      images: '/images/tanote.png',
    }),
    [isDutch]
  );

  const { content } = usePageContent({ pageSlug: 'tanote-bay', locale, fallbackContent });
  return (
    <>
      <DiveSiteDetail
        name="Tanote Bay"
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
      <DiveSiteBookingCTA siteName="Tanote Bay" />
    </>
  );
};

export default TanoteBay;