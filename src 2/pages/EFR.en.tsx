import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const EFREn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="efr"
      locale="en"
      fallbackContent={{
        hero_title: 'Emergency First Response (EFR)',
        hero_subtitle: 'Learn essential first aid, CPR and emergency response skills - a valuable standalone certification and prerequisite for Rescue Diver.',
        course_overview: 'EFR covers Primary and Secondary Care, CPR, AED use and first aid for common diving injuries. The course is classroom and practical skills oriented and is essential for anyone progressing to Rescue Diver.',
        price_thb: '4500',
        price_usd: '167',
        price_eur: '154',
        duration: '1 day',
      }}
      heroImage="/images/efr.jpeg"
      level="First Aid"
      bookingItemName="Emergency First Response (EFR)"
      sections={[
        {
          title: "What you'll learn",
          content: [
            'Primary and secondary care principles',
            'CPR and AED operation',
            'First aid for breathing and cardiac emergencies',
            'First aid for diving-related incidents',
          ],
        },
        {
          title: 'Duration and prerequisites',
          content: 'Duration: 1 day. No diving prerequisite - suitable for divers and non-divers alike.',
        },
        {
          title: 'Inclusions',
          content: [
            'Course materials and certification',
            'Practical CPR and first aid training',
            'Experienced instructors',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Is EFR required for Rescue Diver?',
          answer: 'Yes - EFR (or equivalent) is a prerequisite for the Rescue Diver course.',
        },
      ]}
    />
  );
};

export default EFREn;
