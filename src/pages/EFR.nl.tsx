import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const EFRNl: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="efr"
      locale="nl"
      fallbackContent={{
        hero_title: 'Emergency First Response (EFR)',
        hero_subtitle: 'Leer essentiele EHBO-, CPR- en noodhulpvaardigheden - een waardevolle zelfstandige certificering en vereiste voor Rescue Diver.',
        course_overview: 'EFR behandelt Primary en Secondary Care, CPR, gebruik van AED en eerste hulp bij veelvoorkomende duikverwondingen. De cursus is gericht op theorie en praktische vaardigheden en is essentieel voor wie wil doorgaan naar Rescue Diver.',
        price_thb: '4500',
        price_usd: '167',
        price_eur: '154',
        duration: '1 dag',
      }}
      heroImage="/images/efr.jpeg"
      level="Eerste hulp"
      bookingItemName="Emergency First Response (EFR)"
      sections={[
        {
          title: 'Wat je leert',
          content: [
            'Principes van primary en secondary care',
            'CPR en gebruik van AED',
            'Eerste hulp bij ademhalings- en hartnoodsituaties',
            'Eerste hulp bij duikgerelateerde incidenten',
          ],
        },
        {
          title: 'Duur en vereisten vooraf',
          content: 'Duur: 1 dag. Geen duikvereiste - geschikt voor duikers en niet-duikers.',
        },
        {
          title: 'Inbegrepen',
          content: [
            'Lesmateriaal en certificering',
            'Praktische CPR- en EHBO-training',
            'Ervaren instructeurs',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Is EFR verplicht voor Rescue Diver?',
          answer: 'Ja - EFR (of gelijkwaardig) is een vereiste voor de Rescue Diver-cursus.',
        },
      ]}
    />
  );
};

export default EFRNl;
