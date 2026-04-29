import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const AdvancedEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="advanced"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Advanced Open Water Course',
        hero_subtitle: 'Expand your skills with five Adventure Dives including deep and navigation. Perfect for exploring deeper dive sites.',
        course_overview: 'The PADI Advanced Open Water course improves your underwater skills through hands-on dives. Includes Deep, Navigation, Peak Performance Buoyancy, and two electives like Night or Wreck diving.',
        price_thb: '10500',
        price_usd: '275',
        price_eur: '250',
        duration: '2 days',
        section_1_title: "What you'll do",
        section_1_content: '5 adventure dives (can be done over 2-3 days)\nPractice deep dive techniques and navigation\nImprove buoyancy and comfort underwater\nChoose electives: Night, Wreck, Fish ID, Photography, etc.',
        section_2_title: 'Prerequisites',
        section_2_content: 'Open Water Diver certification (or equivalent) and minimum age of 12.',
        section_3_title: 'Inclusions',
        section_3_content: 'Course materials & PADI certification\nAll equipment rental\nBoat fees where applicable\nProfessional instruction',
        faq_1_question: 'Do I need to take a test?',
        faq_1_answer: 'No exam required! The Advanced course is all about experience and practice.',
        faq_2_question: 'Can I choose my Adventure Dives?',
        faq_2_answer: 'Deep and Navigation are required. You choose 3 electives from options like Night, Wreck, Peak Performance Buoyancy, Fish ID, and more.',
      }}
      heroImage="/images/advanved.png"
      level="Intermediate"
    />
  );
};

export default AdvancedEn;
