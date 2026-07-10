import React from 'react';
import { useCurrency, CurrencySelector } from '@/hooks/useCurrency';
import CoursePageTemplate from '@/components/CoursePageTemplate';
import { useTranslation } from 'react-i18next';

const DIVEMASTER_DROPBOX_FOLDER = 'divemaster';

const Divemaster: React.FC = () => {
  const { i18n } = useTranslation();
  const isNl = i18n.language.startsWith('nl');
  
  const { currency, convertCurrency } = useCurrency();
  const priceTHB = 41000;
  return (
    <>
      <CurrencySelector />
      <CoursePageTemplate
        pageSlug="divemaster"
        locale={isNl ? 'nl' : 'en'}
        fallbackContent={{
          hero_title: isNl ? 'PADI Divemaster-cursus' : 'PADI Divemaster Course',
          hero_subtitle: isNl 
            ? 'Begin je professionele duikcarrière. Leer leiderschaps-, supervisie- en duikbeheervaardigheden.' 
            : 'Begin your professional diving career. Learn leadership, supervision, and dive management skills.',
          course_overview: isNl
            ? 'Het Divemaster-programma ontwikkelt je duikleiderschapsvaardigheden, waaronder het superviseren van duikactiviteiten, assisteren van instructeurs en begeleiden van gecertificeerde duikers.'
            : 'The Divemaster program develops your dive leadership skills including supervising dive activities, assisting instructors, and guiding certified divers.',
          price_thb: String(priceTHB),
          duration: isNl ? '2-4 weken' : '2-4 weeks',
        }}
        level="Pro Level"
        sections={[
          {
            title: isNl ? 'Competenties' : 'Key competencies',
            content: [
              isNl ? 'Superviseren van duikoperaties en veiligheid' : 'Supervising dive operations and safety',
              isNl ? 'Zoeken en bergen, bootoperaties en briefings' : 'Search and recovery, boat operations, and briefings',
              isNl ? 'Assisteren van instructeurs tijdens training' : 'Assisting instructors during training',
              isNl ? 'Klantenservice en duikcentrumprocedures' : 'Customer service and dive center procedures',
            ],
          },
          {
            title: isNl ? 'Duur & Vereisten' : 'Duration & Prerequisites',
            content: isNl
              ? 'Typische programmalengte: 2-4 weken afhankelijk van ervaring. Vereisten: Rescue Diver-certificering, 40 gelogde duiken om te starten en 60 om te certificeren (PADI-vereisten).'
              : 'Typical program length: 2-4 weeks depending on experience. Prerequisites: Rescue Diver certification, 40 logged dives to start and 60 to certify (PADI requirements).',
          },
          {
            title: isNl ? 'Wat we bieden' : 'What we provide',
            content: [
              isNl ? 'Begeleide duikpraktijken en echte gidservaring' : 'Supervised dive practicals and real-world guide experience',
              isNl ? 'Mentoring en hulp bij plaatsing' : 'Mentoring and job placement assistance',
              isNl ? 'Cursusmateriaal en PADI-registratie' : 'Course materials and PADI registration',
            ],
          },
        ]}
        faqs={[
          {
            question: isNl ? 'Krijg ik werk na certificering?' : 'Will I get work after certification?',
            answer: isNl
              ? 'We helpen afgestudeerden met lokale werkplaatsingen, CV-advies en introductions bij partnercentra.'
              : 'We assist graduates with local work placements, CV advice and introductions to partner centers.',
          },
        ]}
        // Pass price and currency info for display in the template
        priceTHB={priceTHB}
        priceConverted={currency !== 'THB' ? convertCurrency(priceTHB, 'THB') : undefined}
        selectedCurrency={currency}
        galleryFolder={DIVEMASTER_DROPBOX_FOLDER}
        galleryTitle={isNl ? 'Divemaster galerij' : 'Divemaster Gallery'}
        galleryDescription={isNl
          ? 'Foto\'s van de Divemaster-cursus en training op Koh Tao. Voeg beelden toe aan de Dropbox-map om deze sectie automatisch bij te werken.'
          : 'Photos from the Divemaster course and training around Koh Tao. Add images to the Dropbox folder to keep this section updated automatically.'}
        galleryUnavailableMessage={isNl
          ? 'Divemaster-foto\'s verschijnen hier zodra de Dropbox-map klaar is.'
          : 'Divemaster photos will appear here once the Dropbox folder is ready.'}
        galleryEmptyMessage={isNl
          ? 'Divemaster-foto\'s verschijnen hier zodra er afbeeldingen aan Dropbox zijn toegevoegd.'
          : 'Divemaster photos will appear here once images are added to Dropbox.'}
      />
    </>
  );
};

export default Divemaster;
