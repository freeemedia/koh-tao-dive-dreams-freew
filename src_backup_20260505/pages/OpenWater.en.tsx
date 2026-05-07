import React from 'react';
import CoursePageTemplate from '@/components/CoursePageTemplate';

const OpenWaterEn: React.FC = () => {
  return (
    <CoursePageTemplate
      pageSlug="open-water"
      locale="en"
      fallbackContent={{
        hero_title: 'PADI Open Water Course',
        hero_subtitle: "The world's most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.",
        course_overview: "The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You'll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.\n\n",
        price_thb: '11500',
        price_usd: '320',
        price_eur: '290',
        duration: '3-4 days',
      }}
      heroImage="/images/openwater.png"
      images={['/images/downline.png', '/images/openwater.png', '/images/photo-1682686580849-3e7f67df4015.avif', '/images/photo-1647825194145-2d94e259c745.avif']}
      level="Beginner"
      bookingItemName="PADI Open Water Course"
      sections={[
        {
          title: "What you'll learn",
          content: [
            'Equipment assembly and use',
            'Buoyancy control and breathing techniques',
            'Underwater navigation basics',
            'Emergency procedures and surface recognition',
            'Dive planning and buddy communication',
            'Environmental awareness and marine life interaction',
          ],
        },
        {
          title: 'Course Structure',
          content: [
            'Duration: 3-4 days (flexible scheduling)',
            'Theory sessions (online or classroom)',
            'Confined water training (pool)',
            '4 open water dives',
            'Minimum age: 10 years (Junior Open Water for 10-14)',
          ],
        },
        {
          title: 'Inclusions',
          content: [
            'PADI course materials and certification',
            'All scuba equipment rental',
            'Pool and open water training',
            'Boat fees where applicable',
            'Tea, coffee and bottled water',
            'Professional instruction',
          ],
        },
      ]}
      faqs={[
        {
          question: 'Do I need prior experience?',
          answer: 'No experience necessary! The Open Water course is designed for complete beginners. You just need to be comfortable in water.',
        },
        {
          question: 'Can I complete the theory online before arrival?',
          answer: 'Yes! PADI eLearning allows you to complete the knowledge development portion online at your own pace before arriving.',
        },
        {
          question: 'What if I need more time?',
          answer: "No problem. We adapt to your learning pace. If you need extra pool time or want to repeat a skill, we're flexible.",
        },
        {
          question: 'Is the certification recognized worldwide?',
          answer: 'Yes, PADI is the world\'s leading scuba training organization with recognition at dive centers and resorts globally.',
        },
      ]}
    />
  );
};

export default OpenWaterEn;
