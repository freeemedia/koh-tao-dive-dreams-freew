import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba"
      locale="en"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving (DSD)',
        hero_subtitle: 'Explore the thrill of breathing underwater with no certification required. This beginner program is the perfect first dive experience on Koh Tao.',
        course_overview: 'Discover Scuba Diving is designed for non-certified divers who want to safely experience real scuba diving with a professional instructor. You start with a simple briefing and essential skills in confined water, then continue to shallow open water for your first dive.',
        price_thb: '2500',
        price_usd: '72',
        price_eur: '66',
        duration: '1 day',
        section_1_title: 'How it works',
        section_1_content: 'Step 1: Briefing and skills in confined water\nStep 2: First open water dive with close supervision',
        section_2_title: 'What is included',
        section_2_content: 'Certified scuba dive professional\nUse of all scuba equipment\nMaximum 4 guests per instructor group\nOption to add extra dives',
        faq_1_question: 'What is Discover Scuba Diving (DSD)?',
        faq_1_answer: 'DSD is a beginner experience that allows non-certified divers to try scuba diving in a controlled and supervised environment before committing to a full course.',
        faq_2_question: 'Do I need a certification to join DSD?',
        faq_2_answer: 'No. DSD is specifically designed for first-time divers and beginners.',
        faq_3_question: 'What can I expect on the day?',
        faq_3_answer: 'You will receive a short orientation, safety briefing and basic skills coaching before going for your first open water dive with your instructor.',
        faq_4_question: 'What is the DSD Deluxe option?',
        faq_4_answer: 'Deluxe is an extended experience with extra dives and more underwater time, ideal if you want a deeper introduction before starting Open Water.',
      }}
      heroImage="/images/discover-scuba-dsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving"
      bookingType="dive"
    />
  );
};

export default DiscoverScubaEn;
