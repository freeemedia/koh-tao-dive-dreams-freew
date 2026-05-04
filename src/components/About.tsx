import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const About = () => {
  const { i18n } = useTranslation();
  const isDutch = i18n.language.startsWith('nl');
  const locale = isDutch ? 'nl' : 'en';

  const fallbackContent = useMemo(() => ({
    about_headline: isDutch
      ? 'Bed tot boot in minuten — jouw all-inclusive duikresort'
      : 'Bed to boat in minutes — your all-inclusive dive resort',
    about_sites_line: 'CRYSTAL BAY - MANTA POINT - TOYAPAKEH - BLUE CORNER - SD POINT - CENINGAN WALL - AND MORE',
    about_map_alt: isDutch
      ? 'Kaart van Nusa Lembongan en duiklocaties'
      : 'Map of Nusa Lembongan and dive sites',
    about_title: isDutch
      ? 'Van PADI Open Water tot Divemaster — alles inbegrepen'
      : 'From PADI Open Water to Divemaster — everything included',
    about_paragraph_1: isDutch
      ? 'Nusa Lembongan is een van de meest spectaculaire duikbestemmingen van Bali. We liggen direct aan het water, zodat je van je bed direct op de boot stapt — geen taxi, geen gedoe.'
      : 'Nusa Lembongan is one of Bali\'s most spectacular dive destinations. We are right on the water, so you step from your bed straight onto the boat — no taxis, no transfers, no wasted time.',
    about_paragraph_2: isDutch
      ? 'Onze Stay & Dive-pakketten omvatten alles: accommodatie, begeleide duiken, uitrusting en de Bintangs die op je wachten als je boven water komt.'
      : 'Our Stay & Dive packages include everything: accommodation, guided dives, equipment, and the Bintangs waiting for you when you surface.',
    about_note: isDutch
      ? 'Verblijfaccommodatie bij onze cursuspakketten kan alleen worden gegarandeerd bij boeking minimaal 7 dagen van tevoren.'
      : 'Accommodation with our course packages can only be guaranteed if booked at least 7 days in advance.',
  }), [locale, isDutch]);

  const { content } = usePageContent({
    pageSlug: 'home',
    locale,
    fallbackContent,
  });

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {content.about_headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.about_sites_line}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="/images/maplembongan.jpg"
              alt={content.about_map_alt}
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {content.about_title}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {content.about_paragraph_1}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {content.about_paragraph_2}
            </p>
            <p className="text-base italic text-slate-500">
              {content.about_note}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
