import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const AdvancedNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="advanced"
      locale="nl"
      fallbackContent={{
        hero_title: 'PADI Advanced Open Water-cursus',
        hero_subtitle: 'Breid je vaardigheden uit met vijf Adventure Dives, waaronder diepduiken en navigatie. Perfect voor het verkennen van diepere duiklocaties.',
        course_overview: 'De PADI Advanced Open Water-cursus verbetert je onderwatervaardigheden door middel van praktijkduiken. Inclusief Deep, Navigation, Peak Performance Buoyancy en twee keuzevakken zoals Night of Wreck diving.',
        price_thb: '9500',
        price_usd: '275',
        price_eur: '250',
        duration: '2 dagen',
        section_1_title: 'Wat je doet',
        section_1_content: '5 adventureduiken (kan in 2-3 dagen)\nOefenen van diepduiktechnieken en navigatie\nVerbeteren van drijfvermogen en comfort onder water\nKies keuzevakken: Night, Wreck, Fish ID, Fotografie, etc.',
        section_2_title: 'Vereisten',
        section_2_content: 'Open Water Diver-brevet (of gelijkwaardig) en minimumleeftijd van 12 jaar.',
        section_3_title: 'Inbegrepen',
        section_3_content: 'Lesmateriaal en PADI-certificering\nHuur van alle uitrusting\nBootkosten waar van toepassing\nProfessionele instructie',
        faq_1_question: 'Moet ik een test doen?',
        faq_1_answer: 'Geen examen vereist! De Advanced-cursus draait helemaal om ervaring en praktijk.',
        faq_2_question: 'Kan ik mijn Adventure Dives kiezen?',
        faq_2_answer: 'Deep en Navigation zijn verplicht. Je kiest 3 keuzevakken uit opties zoals Night, Wreck, Peak Performance Buoyancy, Fish ID, en meer.',
      }}
      heroImage="/images/advanved.png"
      level="Intermediate"
    />
  );
};

export default AdvancedNl;
