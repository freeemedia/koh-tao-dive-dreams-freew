import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '@/hooks/usePageContent';

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const MedicalServices = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const fallbackContent = {
    title: locale === 'nl' ? 'Medische zorg op Koh Tao' : 'Medical services on Koh Tao',
    subtitle:
      locale === 'nl'
        ? 'Gezondheidszorg en nooddiensten, 24/7 beschikbaar.'
        : 'Healthcare and emergency services, available 24/7.',
    care_title: locale === 'nl' ? 'Zorg & noodgevallen' : 'Care & emergencies',
    care_list:
      locale === 'nl'
        ? 'Meerdere klinieken en apotheken in Mae Haad en Sairee\nBasiszorg en eerste hulp beschikbaar\nNooddiensten: bel 1669\nDichtstbijzijnde ziekenhuis ligt op Koh Samui (boottransfer nodig bij ernstige gevallen)\nRecompressiekamer voor duiknoodgevallen'
        : 'Multiple clinics and pharmacies in Mae Haad and Sairee\nBasic care and first aid available\nEmergency services: call 1669\nNearest hospital is on Koh Samui (boat transfer required for serious cases)\nRecompression chamber for diving emergencies',
    insurance:
      locale === 'nl'
        ? 'Een goede reisverzekering wordt sterk aangeraden. Neem noodzakelijke medicijnen op recept zelf mee, beschikbaarheid kan beperkt zijn.'
        : 'Comprehensive travel insurance is strongly recommended. Bring essential prescription medication yourself, as availability may be limited.',
    cta_travel_info: locale === 'nl' ? 'Reisinformatie' : 'Travel information',
    cta_wellness: locale === 'nl' ? 'Wellnessactiviteiten' : 'Wellness activities',
    important_title: locale === 'nl' ? 'Belangrijke informatie' : 'Important information',
    important_list:
      locale === 'nl'
        ? 'Regel een reis- en zorgverzekering voordat je aankomt\nMalariapreventie kan zinvol zijn - overleg met een arts\nDe zon is sterk - gebruik zonnebrand met hoge SPF\nUitdroging komt vaak voor - drink voldoende water'
        : 'Arrange travel and health insurance before arrival\nMalaria prevention may be useful - consult a doctor\nThe sun is strong - use high-SPF sunscreen\nDehydration is common - drink enough water',
  };

  const { content } = usePageContent({
    pageSlug: 'medical-services',
    locale,
    fallbackContent,
  });

  const careItems = parseLines(content.care_list || fallbackContent.care_list);
  const importantItems = parseLines(content.important_list || fallbackContent.important_list);

  return (
  <main className="max-w-4xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-64 md:h-96 flex items-center justify-center mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/medical.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="text-center text-white z-10 relative">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{content.title}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow">{content.subtitle}</p>
      </div>
    </section>

    {/* Main Content */}
    <section className="bg-background rounded-lg shadow p-6 md:p-10 mb-8">
      <h2 className="text-2xl font-semibold mb-4">{content.care_title}</h2>
      <ul className="list-disc pl-6 mb-4">
        {careItems.map((item) => (
          <li key={item}>{item === 'Nooddiensten: bel 1669' || item === 'Emergency services: call 1669' ? <>{item.split('1669')[0]}<strong>1669</strong></> : item}</li>
        ))}
      </ul>
      <p className="mb-4">{content.insurance}</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <a href="/HowToGetHere" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{content.cta_travel_info}</a>
        <a href="/ThingsToDo" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{content.cta_wellness}</a>
      </div>
    </section>

    {/* Important Info Section */}
    <section className="bg-red-50 rounded-lg shadow p-6 md:p-10 border-l-4 border-red-600">
      <h3 className="text-xl font-semibold mb-2 text-red-700">{content.important_title}</h3>
      <ul className="list-disc pl-6 mb-2 text-red-900">
        {importantItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  </main>
  );
};

export default MedicalServices;
