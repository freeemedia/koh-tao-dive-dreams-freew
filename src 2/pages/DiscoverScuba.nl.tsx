import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba"
      locale="nl"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving (DSD)',
        hero_subtitle: 'Ervaar hoe het is om onder water te ademen, zonder brevet nodig. Dit beginnersprogramma is de perfecte eerste duikervaring op Koh Tao.',
        course_overview: 'Discover Scuba Diving is gemaakt voor niet-gecertificeerde duikers die veilig willen kennismaken met echt duiken onder begeleiding van een professionele instructeur. Je start met een korte briefing en basisvaardigheden in beschut water, daarna ga je naar ondiep open water.',
        price_thb: '2500',
        price_usd: '72',
        price_eur: '66',
        duration: '1 dag',
        section_1_title: 'Hoe werkt het?',
        section_1_content: 'Stap 1: Briefing en basisvaardigheden in beschut water\nStap 2: Eerste buitenwaterduik onder directe begeleiding',
        section_2_title: 'Wat is inbegrepen?',
        section_2_content: 'Gecertificeerde duikprofessional\nGebruik van alle duikuitrusting\nMaximaal 4 deelnemers per instructeursgroep\nMogelijkheid om extra duiken toe te voegen',
        faq_1_question: 'Wat is Discover Scuba Diving (DSD)?',
        faq_1_answer: 'DSD is een beginnerservaring waarmee niet-gecertificeerde duikers in een gecontroleerde, veilige omgeving kunnen kennismaken met duiken voordat ze een volledige cursus volgen.',
        faq_2_question: 'Heb ik een brevet nodig om mee te doen?',
        faq_2_answer: 'Nee. DSD is juist bedoeld voor beginners en mensen die nog nooit hebben gedoken.',
        faq_3_question: 'Wat kan ik op de dag zelf verwachten?',
        faq_3_answer: 'Je krijgt een korte uitleg, veiligheidsbriefing en oefent basisvaardigheden voordat je je eerste buitenwaterduik maakt met je instructeur.',
        faq_4_question: 'Wat is de DSD Deluxe-optie?',
        faq_4_answer: 'Deluxe is een uitgebreidere ervaring met extra duiken en meer tijd onder water, ideaal als je daarna mogelijk verder wilt met Open Water.',
      }}
      heroImage="/images/discover-scuba-dsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving"
      bookingType="dive"
    />
  );
};

export default DiscoverScubaNl;
