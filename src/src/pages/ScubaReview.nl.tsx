import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaReviewNl: React.FC = () => {
  return (
      <CoursePageTemplate
        pageSlug="scuba-review"
        locale="nl"
        fallbackContent={{
          hero_title: 'Scuba Review-cursus',
          hero_subtitle: 'Fris je duikvaardigheden en kennis op met onze complete opfriscursus.',
          course_overview: 'De Scuba Review-cursus is bedoeld voor gebrevetteerde duikers die hun vaardigheden willen opfrissen, hun kennis willen bijwerken of zich willen voorbereiden op gevorderde trainingen. Deze cursus behandelt essentiele duikprincipes, veiligheidsprocedures en praktische vaardigheden zodat je weer zelfverzekerd en bekwaam onder water bent.',
          price_thb: '2500',
          duration: '1-2 dagen',
        }}
        heroImage="/images/scuba-review.png"
        images={["/images/scubareview.png"]}
        level="Opfriscursus"
        bookingItemName="Scuba Review Course"
        sections={[
        {
          title: 'Wat je herhaalt',
          content: [
            'Opbouw en onderhoud van duikuitrusting',
            'Duikplanning en noodprocedures',
            'Drijfvermogen en trim',
            'Onderwatercommunicatie en navigatie',
            'Decompressietheorie en veiligheidsstops',
            'Herkenning van onderwaterleven en natuurbehoud',
          ],
        },
        {
          title: 'Voor wie deze cursus is',
          content: [
            'Duikers die recent niet hebben gedoken',
            'Duikers die zich voorbereiden op gevorderde cursussen',
            'Duikers die hun vaardigheden willen verbeteren',
            'Iedereen die meer zelfvertrouwen wil opbouwen',
          ],
        },
        {
          title: 'Voordelen van de cursus',
          content: 'Met deze cursus houd je je vaardigheden op peil, leer je over updates in uitrusting en blijf je bij met actuele duikbest practices. Het is ook een uitstekende manier om te voldoen aan vereisten voor vervolgopleidingen.',
        },
      ]}
    />
  );
};

export default ScubaReviewNl;