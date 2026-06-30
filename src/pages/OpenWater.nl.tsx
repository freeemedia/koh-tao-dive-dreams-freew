import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const OpenWaterNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="open-water"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Open Water-cursus',
        hero_subtitle: 'De populairste duikcursus ter wereld. Je leert de basis van het duiken en behaalt je brevet om zelfstandig met een buddy te duiken tot 18 meter/60 voet.',
        course_overview: 'De Open Water-cursus combineert theorie, beschut water-training (zwembad) en buitenwaterduiken. Je leert uitrusting opbouwen, basisvaardigheden onder water, drijfvermogen en duikplanning. Onze instructeurs werken met kleine groepen en leggen de nadruk op veiligheid en plezier.',
        price_thb: '11000',
        price_usd: '320',
        price_eur: '290',
        duration: '3-4 dagen',
      }}
      heroImage="/images/openwater.png"
      images={['/images/downline.png', '/images/openwater.png', '/images/photo-1682686580849-3e7f67df4015.avif', '/images/photo-1647825194145-2d94e259c745.avif']}
      level="Beginner"
      bookingItemName="PADI Open Water-cursus"
      sections={[
        {
          title: 'Wat je leert',
          content: [
            'Opbouwen en gebruiken van duikuitrusting',
            'Drijfvermogen en ademhalingstechnieken',
            'Basis onderwaternavigatie',
            'Noodprocedures en oppervlaktebewustzijn',
            'Duikplanning en buddycommunicatie',
            'Milieubewustzijn en interactie met zeeleven',
          ],
        },
        {
          title: 'Cursusopbouw',
          content: [
            'Duur: 3-4 dagen (flexibele planning)',
            'Theoriesessies (online of in de klas)',
            'Training in beschut water (zwembad)',
            '4 buitenwaterduiken',
            'Minimumleeftijd: 10 jaar (Junior Open Water voor 10-14)',
          ],
        },
        {
          title: 'Inbegrepen',
          content: [
            'PADI-lesmateriaal en certificering',
            'Huur van alle duikuitrusting',
            'Zwembad- en buitenwatertraining',
            'Bootkosten waar van toepassing',
            'Thee, koffie en flessenwater',
            'Professionele instructie',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Heb ik vooraf ervaring nodig?',
          answer: 'Geen ervaring nodig! De Open Water-cursus is ontworpen voor complete beginners. Je moet alleen wel comfortabel zijn in het water.',
        },
        {
          question: 'Kan ik de theorie online afronden voor aankomst?',
          answer: 'Ja! Met PADI eLearning kun je het theoriegedeelte online in je eigen tempo afronden voordat je aankomt.',
        },
        {
          question: 'Wat als ik meer tijd nodig heb?',
          answer: 'Geen probleem. We passen ons aan jouw leertempo aan. Als je extra zwembadtijd nodig hebt of een vaardigheid wilt herhalen, zijn we flexibel.',
        },
        {
          question: 'Is de certificering wereldwijd erkend?',
           answer: 'Ja, PADI is \'s werelds leidende duikopleidingsorganisatie met erkenning bij duikcentra en resorts wereldwijd.',
        },
      ]}
    />
  );
};

export default OpenWaterNl;
