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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { value: '7', unit: 'dive sites', label: 'on your doorstep', color: 'from-cyan-500 to-blue-600' },
            { value: '3', unit: 'departures', label: 'daily boat trips', color: 'from-blue-600 to-indigo-600' },
            { value: '2', unit: 'minutes', label: 'bed to boat', color: 'from-teal-500 to-cyan-600' },
            { value: '30m', unit: 'Mola Mola', label: 'seasonal depth', color: 'from-indigo-500 to-purple-600' },
          ].map((s, i) => (
            <div key={i} className={`bg-gradient-to-br ${s.color} rounded-2xl p-6 text-white text-center shadow-lg`}>
              <div className="text-4xl font-black">{s.value}</div>
              <div className="text-white/90 font-bold text-sm uppercase tracking-wide mt-1">{s.unit}</div>
              <div className="text-white/70 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl opacity-20 blur-xl" />
            <img
              src="/images/maplembongan.jpg"
              alt={content.about_map_alt}
              className="relative rounded-2xl shadow-2xl w-full"
            />
            {/* floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-5 py-3 border border-cyan-100">
              <div className="text-2xl font-black text-cyan-600">Crystal Bay</div>
              <div className="text-xs text-gray-500 font-medium">Mola Mola Season: Jul–Oct</div>
            </div>
          </div>
          <div>
            <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Why Lembongan
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {content.about_headline}
            </h2>
            <p className="text-cyan-600 font-semibold text-sm uppercase tracking-widest mb-6">
              {content.about_sites_line}
            </p>
            <p className="text-lg text-gray-600 mb-5 leading-relaxed">
              {content.about_paragraph_1}
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {content.about_paragraph_2}
            </p>
            <p className="text-sm italic text-slate-400 border-l-4 border-cyan-200 pl-4">
              {content.about_note}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
