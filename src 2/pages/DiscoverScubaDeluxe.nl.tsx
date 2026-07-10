import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaDeluxeNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba-deluxe"
      locale="nl"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving Deluxe',
        hero_subtitle: 'Een uitgebreidere en rustigere beginnerservaring met extra onderwatertijd en 3 begeleide duiken.',
        course_overview: 'Discover Scuba Diving Deluxe is perfect als je meer wilt dan alleen een korte proefduik. Je start met basisvaardigheden in een gecontroleerde omgeving en gaat daarna op meerdere buitenwaterduiken rond Koh Tao.',
        price_thb: '5000',
        price_usd: '144',
        price_eur: '132',
        duration: '1-2 dagen',
      }}
      heroImage="/images/deluxedsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving Deluxe"
      bookingType="dive"
      sections={[
        {
          title: 'Hoe werkt het?',
          content: [
            'Dag 1: Zwembad/skills en eerste buitenwaterduik',
            'Dag 2: Twee begeleide bootduiken rond Koh Tao',
          ],
        },
        {
          title: 'Wat is inbegrepen?',
          content: [
            'Gecertificeerde duikprofessional',
            'Gebruik van alle duikuitrusting',
            'Maximaal 4 deelnemers per instructeursgroep',
            'Totaal 3 duiken (kust + bootduiken)',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Wat is Discover Scuba Diving Deluxe?',
          answer: 'Deluxe is een uitgebreid beginnersprogramma met zwembad/skills en 3 buitenwaterduiken voor een completere eerste duikervaring.',
        },
        {
          question: 'Heb ik een brevet nodig?',
          answer: 'Nee. Dit programma is gemaakt voor niet-gecertificeerde beginners.',
        },
        {
          question: 'Kan ik daarna doorgaan naar Open Water?',
          answer: 'Ja. DSD Deluxe is een ideale manier om te ontdekken of je wilt doorgaan met een volledige Open Water-cursus.',
        },
        {
          question: 'Is dit geschikt als ik weinig tijd heb?',
          answer: 'Ja. Je kunt het in 1-2 dagen afronden en toch meerdere duiken maken in een rustiger tempo.',
        },
      ]}
    />
  );
};

export default DiscoverScubaDeluxeNl;
