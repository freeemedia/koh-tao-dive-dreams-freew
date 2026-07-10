import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const ScubaDiverEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="scuba-diver"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Scuba Diver Course',
        hero_subtitle: 'Experience the underwater world with confidence. The PADI Scuba Diver course is perfect for those who want to try scuba diving before committing to full certification.',
        course_overview: "The PADI Scuba Diver course introduces you to the underwater world in a fun and relaxed way. You'll learn basic scuba diving skills and explore shallow reefs, giving you the confidence to continue your diving journey. This course serves as an introduction to scuba diving and can lead to full Open Water certification.",
        price_thb: '8500',
        duration: '2-3 days',
        section_1_title: "What you'll learn",
        section_1_content: 'Basic scuba diving theory and physics\nProper use of scuba equipment\nFundamental diving skills and safety procedures\nUnderwater communication and buddy system\nShallow water exploration and reef appreciation\nEnvironmental awareness and marine conservation',
        section_2_title: 'Course structure',
        section_2_content: "The course includes classroom sessions, confined water training, and open water dives. You'll complete 2 open water dives in waters no deeper than 12 meters (40 feet), making it accessible for most people.",
        section_3_title: 'Why choose Scuba Diver?',
        section_3_content: 'Shorter commitment than full Open Water course\nPerfect introduction to scuba diving\nCan be upgraded to Open Water certification\nFun and relaxed learning environment\nExplore beautiful Koh Tao reefs',
      }}
      heroImage="/images/scubadiver-hero.png"
      level="Entry Level"
      bookingItemName="PADI Scuba Diver Course"
    />
  );
};

export default ScubaDiverEn;