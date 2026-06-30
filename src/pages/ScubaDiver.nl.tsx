import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaDiverNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="scuba-diver"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Scuba Diver-cursus',
        hero_subtitle: 'Ontdek de onderwaterwereld met vertrouwen. De PADI Scuba Diver-cursus is perfect voor wie duiken wil proberen voordat je voor volledige certificering gaat.',
        course_overview: 'De PADI Scuba Diver-cursus laat je op een leuke en ontspannen manier kennismaken met de onderwaterwereld. Je leert basisvaardigheden voor duiken en verkent ondiepe riffen, zodat je met vertrouwen verder kunt in je duikavontuur. Deze cursus is een introductie tot duiken en kan worden opgewaardeerd naar volledige Open Water-certificering.',
        price_thb: '8500',
        duration: '2-3 dagen',
        section_1_title: 'Wat je leert',
        section_1_content: 'Basis duiktheorie en -fysica\nCorrect gebruik van duikuitrusting\nFundamentele duikvaardigheden en veiligheidsprocedures\nOnderwatercommunicatie en buddy-systeem\nVerkenning van ondiep water en rifbewustzijn\nMilieubewustzijn en mariene natuurbescherming',
        section_2_title: 'Cursusopbouw',
        section_2_content: 'De cursus bestaat uit theorielessen, training in beschut water en buitenwaterduiken. Je maakt 2 buitenwaterduiken in water tot maximaal 12 meter (40 voet), waardoor de cursus voor de meeste mensen toegankelijk is.',
        section_3_title: 'Waarom kiezen voor Scuba Diver?',
        section_3_content: 'Kortere cursus dan de volledige Open Water-cursus\nPerfecte introductie tot duiken\nOp te waarderen naar Open Water-certificering\nLeuke en ontspannen leeromgeving\nVerken de prachtige riffen van Koh Tao',
      }}
      heroImage="/images/scubadiver-hero.png"
      level="Instapniveau"
      bookingItemName="PADI Scuba Diver Course"
    />
  );
};

export default ScubaDiverNl;