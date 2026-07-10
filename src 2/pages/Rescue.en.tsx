import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const RescueEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="rescue"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Rescue Diver',
        hero_subtitle: 'Develop the skills and confidence to manage dive emergencies and assist others. The Rescue Diver course is an important step for all serious divers.',
        course_overview: 'The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.',
        main: 'The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.',
        price_thb: '10000',
        price_usd: '290',
        price_eur: '265',
        duration: '3 days',
        section_1_title: 'Skills covered',
        section_1_content: 'Self-rescue and diver stress recognition\nRescue scenarios and techniques\nEmergency management and equipment\nRescue breathing and casualty care',
        section_2_title: 'Structure and prerequisites',
        section_2_content: 'Duration: Typically 3 days including pool and open water sessions. Prerequisite: EFR (or equivalent) and Open Water certification.',
        section_3_title: 'Inclusions',
        section_3_content: 'Course materials and certification\nRescue skills training in pool and open water\nAll equipment rental',
        faq_1_question: 'Is Rescue difficult?',
        faq_1_answer: 'The course is challenging but instructors support you step-by-step. Good fitness and comfort in the water help.',
      }}
      heroImage="/images/photo-1613853250147-2f73e55c1561.avif"
      level="Advanced"
      bookingItemName="PADI Rescue Diver"
    />
  );
};

export default RescueEn;
