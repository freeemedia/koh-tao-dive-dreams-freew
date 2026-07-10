import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const DiscoverScubaDeluxeEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="discover-scuba-deluxe"
      locale="en"
      fallbackContent={{
        hero_title: 'Discover Scuba Diving Deluxe',
        hero_subtitle: 'A longer, more relaxed beginner scuba experience with extra underwater time and 3 guided dives.',
        course_overview: 'Discover Scuba Diving Deluxe is ideal if you want more than a short try dive. You begin with foundational skills in a controlled environment and then continue to multiple open water dives around Koh Tao with your instructor.',
        price_thb: '5000',
        price_usd: '144',
        price_eur: '132',
        duration: '1-2 days',
      }}
      heroImage="/images/deluxedsd.png"
      level="Beginner"
      bookingItemName="Discover Scuba Diving Deluxe"
      bookingType="dive"
      sections={[
        {
          title: 'How it works',
          content: [
            'Day 1: Pool/confined skills and first open water entry',
            'Day 2: Two guided boat dives around Koh Tao',
          ],
        },
        {
          title: 'What is included',
          content: [
            'Certified scuba dive professional',
            'Use of all scuba equipment',
            'Maximum 4 guests per instructor group',
            '3 total dives (shore + boat dives)',
          ],
        },
      ]}
      faqs={[
        {
          question: 'What is the Discover Scuba Diving Deluxe program?',
          answer: 'Deluxe is an extended beginner program that includes pool/confined skills plus 3 open water dives, giving you a more complete first scuba experience.',
        },
        {
          question: 'Do I need to be certified?',
          answer: 'No. It is designed for non-certified beginners.',
        },
        {
          question: 'Can I continue to Open Water after this?',
          answer: 'Yes. DSD Deluxe is an excellent way to decide if you want to continue with full Open Water certification.',
        },
        {
          question: 'Is this suitable for limited time stays?',
          answer: 'Yes. You can complete it in 1-2 days while still getting multiple dives and a more relaxed pace.',
        },
      ]}
    />
  );
};

export default DiscoverScubaDeluxeEn;
